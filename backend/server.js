/**
 * ============================================================================
 * TOWER OF HANOI – AI PROBLEM SOLVER USING PROLOG
 * Backend: Node.js + Express
 * ============================================================================
 * This Express server acts as a bridge between the React frontend and the
 * native SWI-Prolog reasoning engine.
 * 
 * Flow:
 *   React Frontend (POST /api/solve { disks: N })
 *       │
 *       ▼
 *   Express Backend (executes child process)
 *       │
 *       ▼
 *   SWI-Prolog Engine (swipl -q -s prolog/hanoi.pl -g "solve_and_print_json(N), halt.")
 *       │
 *       ▼
 *   Prolog generates logical move sequence (JSON stdout)
 *       │
 *       ▼
 *   Express Backend parses Prolog stdout and responds with structured JSON
 *       │
 *       ▼
 *   React Frontend receives moves and animates state transitions
 * ============================================================================
 */

const express = require('express');
const cors = require('cors');
const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Graceful JSON parse error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload' });
  }
  next();
});

// Path to the Prolog solver program
const PROLOG_FILE_PATH = path.join(__dirname, 'prolog', 'hanoi.pl');

/**
 * Locate the SWI-Prolog binary (swipl)
 * Checks system PATH first, then standard Windows installation locations.
 */
function findSwiplBinary() {
  // Check if 'swipl' is available in system PATH
  try {
    const versionOutput = execSync('swipl --version', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    if (versionOutput && versionOutput.includes('SWI-Prolog')) {
      return { path: 'swipl', version: versionOutput.trim() };
    }
  } catch (err) {
    // Not in PATH, check known Windows directories
  }

  const standardPaths = [
    'C:\\Program Files\\swipl\\bin\\swipl.exe',
    'C:\\Program Files (x86)\\swipl\\bin\\swipl.exe',
    'C:\\swipl\\bin\\swipl.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'swipl', 'bin', 'swipl.exe')
  ];

  for (const p of standardPaths) {
    if (fs.existsSync(p)) {
      try {
        const ver = execSync(`"${p}" --version`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
        return { path: p, version: ver.trim() };
      } catch (e) {
        return { path: p, version: 'SWI-Prolog (version query failed)' };
      }
    }
  }

  return null;
}

/**
 * GET /api/status
 * Diagnostic endpoint to check if SWI-Prolog is installed and reachable.
 */
app.get('/api/status', (req, res) => {
  const swiplInfo = findSwiplBinary();
  const prologFileExists = fs.existsSync(PROLOG_FILE_PATH);

  res.json({
    status: 'online',
    swiplInstalled: !!swiplInfo,
    swiplPath: swiplInfo ? swiplInfo.path : null,
    swiplVersion: swiplInfo ? swiplInfo.version : null,
    prologFileExists,
    prologFilePath: PROLOG_FILE_PATH,
    instructions: !swiplInfo
      ? 'SWI-Prolog is not currently detected in your system PATH or standard folders. Please install SWI-Prolog from https://www.swi-prolog.org/download/stable'
      : 'SWI-Prolog is ready to solve queries!'
  });
});

/**
 * POST /api/solve
 * Solves the Tower of Hanoi problem for N disks using genuine SWI-Prolog.
 * 
 * Request body:
 *   { "disks": 3 }
 * 
 * Response:
 *   {
 *     "success": true,
 *     "disks": 3,
 *     "optimalMoves": 7,
 *     "moves": [
 *       { "from": "A", "to": "C", "disk": 1 },
 *       ...
 *     ],
 *     "engine": "SWI-Prolog",
 *     "prologQuery": "?- solve_hanoi(3, Moves).",
 *     "rawCommand": "swipl -q -s ... -g \"solve_and_print_json(3), halt.\""
 *   }
 */
app.post('/api/solve', (req, res) => {
  const disks = parseInt(req.body.disks, 10);

  // Input validation: College spec requires 3 to 10 disks
  if (isNaN(disks) || disks < 1 || disks > 15) {
    return res.status(400).json({
      success: false,
      error: 'Invalid disk count. Please provide a number between 1 and 15.'
    });
  }

  const swiplInfo = findSwiplBinary();

  // If SWI-Prolog is not installed, inform the user clearly
  if (!swiplInfo) {
    return res.status(503).json({
      success: false,
      swiplInstalled: false,
      error: 'SWI-Prolog (swipl) is not installed or not found in system PATH.',
      message: 'To run the genuine Prolog AI Engine, please install SWI-Prolog. See README.md for 1-minute setup instructions.',
      disks,
      optimalMoves: Math.pow(2, disks) - 1
    });
  }

  // Format file path with forward slashes for Prolog compatibility
  const normalizedPrologPath = PROLOG_FILE_PATH.replace(/\\/g, '/');
  
  // SWI-Prolog query command:
  // -q : quiet mode (suppresses welcome banner)
  // -s : load source file
  // -g : execute initial goal and halt
  const prologGoal = `solve_and_print_json(${disks}), halt.`;
  const command = `"${swiplInfo.path}" -q -s "${normalizedPrologPath}" -g "${prologGoal}"`;

  exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing SWI-Prolog:', error);
      console.error('stderr:', stderr);
      return res.status(500).json({
        success: false,
        error: 'SWI-Prolog process execution failed',
        details: stderr || error.message,
        command
      });
    }

    try {
      // Find the JSON substring in stdout (in case Prolog outputs any notices)
      const trimmed = stdout.trim();
      const jsonStart = trimmed.indexOf('{');
      const jsonEnd = trimmed.lastIndexOf('}');

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('No valid JSON string found in SWI-Prolog output');
      }

      const jsonStr = trimmed.substring(jsonStart, jsonEnd + 1);
      const solutionData = JSON.parse(jsonStr);

      return res.json({
        success: true,
        disks: solutionData.disks,
        optimalMoves: solutionData.optimalMoves,
        moves: solutionData.moves,
        engine: 'SWI-Prolog',
        swiplVersion: swiplInfo.version,
        prologQuery: `?- solve_hanoi(${disks}, Moves).`,
        rawCommand: command
      });
    } catch (parseError) {
      console.error('Failed to parse Prolog JSON output:', stdout);
      return res.status(500).json({
        success: false,
        error: 'Failed to parse Prolog solution',
        rawOutput: stdout,
        parseError: parseError.message
      });
    }
  });
});

// Serve frontend if built static files exist
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` TOWER OF HANOI – PROLOG AI ENGINE BACKEND`);
  console.log(` Server running at: http://localhost:${PORT}`);
  const swipl = findSwiplBinary();
  if (swipl) {
    console.log(` [OK] SWI-Prolog detected: ${swipl.version}`);
    console.log(` Path: ${swipl.path}`);
  } else {
    console.log(` [WARN] SWI-Prolog not found in PATH or standard folders.`);
    console.log(` Please install SWI-Prolog to enable the AI engine.`);
  }
  console.log(`====================================================`);
});
