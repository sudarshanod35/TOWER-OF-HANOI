import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import GameBoard from './components/GameBoard';
import Statistics from './components/Statistics';
import ProjectDetails from './components/ProjectDetails';
import LandingPage from './components/LandingPage';
import MainMenu from './components/MainMenu';
import HowToPlay from './components/HowToPlay';
import ProjectInfo from './components/ProjectInfo';
import { Info } from 'lucide-react';

/**
 * Main Application Component
 * Manages view routing (landing, menu, game, how-to-play, project-info),
 * game state, user interactions, SWI-Prolog API queries,
 * and AI animation playback.
 */
function App() {
  // Navigation View State: 'landing' | 'menu' | 'game' | 'how-to-play' | 'project-info'
  const [view, setView] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validViews = ['landing', 'menu', 'game', 'how-to-play', 'project-info'];
    return validViews.includes(hash) ? hash : 'landing';
  });

  const navigateTo = (newView) => {
    setView(newView);
    window.location.hash = `#/${newView === 'landing' ? '' : newView}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Synchronize browser history / back-forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validViews = ['landing', 'menu', 'game', 'how-to-play', 'project-info'];
      if (validViews.includes(hash)) {
        setView(hash);
      } else if (!hash) {
        setView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Game Configuration & State
  const [disks, setDisks] = useState(3);
  const [mode, setMode] = useState('human'); // 'human' | 'ai'
  
  // Towers state: disks stored from bottom to top [N, ..., 1]
  const [towers, setTowers] = useState({
    A: [3, 2, 1],
    B: [],
    C: []
  });

  const [selectedTower, setSelectedTower] = useState(null); // 'A' | 'B' | 'C' | null
  const [moveCount, setMoveCount] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // AI Execution State
  const [isSolving, setIsSolving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [aiMoves, setAiMoves] = useState([]);
  const [currentAIMoveIndex, setCurrentAIMoveIndex] = useState(0);
  const [currentMoveDetail, setCurrentMoveDetail] = useState(null);
  const [speed, setSpeed] = useState(600); // ms per move
  const speedRef = useRef(speed);

  // Synchronize speedRef in real-time for animation timer
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const [prologQuery, setPrologQuery] = useState('?- solve_hanoi(3, Moves).');
  const [rawCommand, setRawCommand] = useState('');
  const [swiplStatus, setSwiplStatus] = useState(null);

  // Project Details Drawer / Modal State
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Animation timer reference
  const animationTimerRef = useRef(null);

  // Optimal moves formula: 2^N - 1
  const optimalMoves = Math.pow(2, disks) - 1;

  // Initialize or reset towers when disk count changes
  const resetPuzzle = (diskCount = disks) => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }

    const initialStack = Array.from({ length: diskCount }, (_, i) => diskCount - i);
    setTowers({
      A: initialStack,
      B: [],
      C: []
    });
    setSelectedTower(null);
    setMoveCount(0);
    setIsSolved(false);
    setErrorMessage('');
    setIsSolving(false);
    setIsPaused(false);
    setAiMoves([]);
    setCurrentAIMoveIndex(0);
    setCurrentMoveDetail(null);
    setPrologQuery(`?- solve_hanoi(${diskCount}, Moves).`);
  };

  // Check SWI-Prolog backend status on mount
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => setSwiplStatus(data))
      .catch((err) => {
        console.warn('Backend server not yet reachable at /api/status:', err.message);
      });
  }, []);

  // Update puzzle when disk count changes
  useEffect(() => {
    resetPuzzle(disks);
  }, [disks]);

  // Handle Mode Change
  const handleModeChange = (newMode) => {
    setMode(newMode);
    resetPuzzle(disks);
  };

  // Human Mode: Tower Click Interaction
  const handleTowerClick = (towerId) => {
    if (mode !== 'human' || isSolved) return;

    setErrorMessage('');

    // Case 1: No tower is currently selected
    if (!selectedTower) {
      if (towers[towerId].length === 0) {
        showTemporaryError('Cannot select an empty tower!');
        return;
      }
      setSelectedTower(towerId);
      return;
    }

    // Case 2: Clicked the same tower again -> cancel selection
    if (selectedTower === towerId) {
      setSelectedTower(null);
      return;
    }

    // Case 3: Destination tower chosen -> validate and execute move
    const sourceTower = [...towers[selectedTower]];
    const destTower = [...towers[towerId]];

    const diskToMove = sourceTower[sourceTower.length - 1];
    const topOfDest = destTower.length > 0 ? destTower[destTower.length - 1] : null;

    // RULE ENFORCEMENT: A larger disk cannot be placed on a smaller disk
    if (topOfDest !== null && diskToMove > topOfDest) {
      showTemporaryError(
        `Invalid Move! Cannot place Disk ${diskToMove} onto smaller Disk ${topOfDest}.`
      );
      setSelectedTower(null);
      return;
    }

    // Execute valid move
    sourceTower.pop();
    destTower.push(diskToMove);

    const newTowers = {
      ...towers,
      [selectedTower]: sourceTower,
      [towerId]: destTower
    };

    setTowers(newTowers);
    setMoveCount((prev) => prev + 1);
    setSelectedTower(null);

    // GOAL TEST: Check whether all disks have reached Tower C
    if (destTower.length === disks && towerId === 'C') {
      setIsSolved(true);
    }
  };

  const showTemporaryError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage((curr) => (curr === msg ? '' : curr));
    }, 2800);
  };

  // Prolog AI Mode: Fetch solution from Node.js Express -> SWI-Prolog
  const handleAskPrologAI = async () => {
    resetPuzzle(disks);
    setIsSolving(true);
    setIsPaused(false);
    setErrorMessage('');

    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disks })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsSolving(false);
        showTemporaryError(
          data.error || 'Failed to obtain solution from SWI-Prolog engine.'
        );
        return;
      }

      // Successfully received move sequence from Prolog
      setAiMoves(data.moves);
      setPrologQuery(data.prologQuery || `?- solve_hanoi(${disks}, Moves).`);
      setRawCommand(data.rawCommand || '');
      setCurrentAIMoveIndex(0);

      // Start sequential animation
      playAIMove(0, data.moves, {
        A: Array.from({ length: disks }, (_, i) => disks - i),
        B: [],
        C: []
      });
    } catch (err) {
      setIsSolving(false);
      showTemporaryError(`API Connection error: ${err.message}. Ensure backend is running.`);
    }
  };

  // Recursive animation step
  const playAIMove = (index, movesList, currentBoard) => {
    if (index >= movesList.length) {
      setIsSolving(false);
      setIsSolved(true);
      setCurrentMoveDetail(null);
      return;
    }

    const move = movesList[index];
    setCurrentMoveDetail(move);
    setCurrentAIMoveIndex(index + 1);

    // Apply the move to the board
    const newBoard = {
      A: [...currentBoard.A],
      B: [...currentBoard.B],
      C: [...currentBoard.C]
    };

    const movingDisk = newBoard[move.from].pop();
    newBoard[move.to].push(movingDisk);

    setTowers(newBoard);
    setMoveCount(index + 1);

    // Schedule next move using current speedRef value (dynamically updated in real-time)
    animationTimerRef.current = setTimeout(() => {
      playAIMove(index + 1, movesList, newBoard);
    }, speedRef.current);
  };

  // Toggle Start / Pause for AI
  const handleStartPause = () => {
    if (isPaused) {
      // Resume
      setIsPaused(false);
      setIsSolving(true);
      playAIMove(currentAIMoveIndex, aiMoves, towers);
    } else {
      // Pause
      setIsPaused(true);
      setIsSolving(false);
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
        animationTimerRef.current = null;
      }
    }
  };

  // Compute status label
  const getGameStatus = () => {
    if (isSolved) return { label: 'Solved (Goal Reached)', color: '#10b981' };
    if (isSolving) return { label: 'Prolog AI Solving...', color: '#38bdf8' };
    if (isPaused) return { label: 'Paused', color: '#f59e0b' };
    if (moveCount > 0) return { label: 'In Progress', color: '#818cf8' };
    return { label: 'Initial State (Ready)', color: '#9ca3af' };
  };

  // RENDER BASED ON CURRENT VIEW ROUTE
  if (view === 'landing') {
    return (
      <LandingPage
        onPlayGame={() => navigateTo('menu')}
        onHowToPlay={() => navigateTo('how-to-play')}
      />
    );
  }

  if (view === 'menu') {
    return <MainMenu onNavigate={navigateTo} />;
  }

  if (view === 'how-to-play') {
    return (
      <HowToPlay
        onBack={() => navigateTo('menu')}
        onStartGame={() => navigateTo('game')}
      />
    );
  }

  if (view === 'project-info') {
    return (
      <ProjectInfo
        onBack={() => navigateTo('menu')}
        onStartGame={() => navigateTo('game')}
      />
    );
  }

  // DEFAULT VIEW: 'game' (The complete Tower of Hanoi game)
  return (
    <div
      className="app-container"
      style={{ '--disk-transition': `${Math.min(Math.round(speed * 0.45), 300)}ms` }}
    >
      {/* Header with Back to Menu button */}
      <Header
        swiplStatus={swiplStatus}
        onBackToMenu={() => navigateTo('menu')}
      />

      {/* Mode & Game Controls */}
      <Controls
        mode={mode}
        setMode={handleModeChange}
        disks={disks}
        setDisks={setDisks}
        onAskPrologAI={handleAskPrologAI}
        isSolving={isSolving}
        isPaused={isPaused}
        hasMoves={aiMoves.length > 0}
        onStartPause={handleStartPause}
        onReset={() => resetPuzzle(disks)}
        speed={speed}
        setSpeed={setSpeed}
        disabled={isSolving && !isPaused}
      />

      {/* Main Game Board */}
      <GameBoard
        towers={towers}
        maxDisks={disks}
        selectedTower={selectedTower}
        onTowerClick={handleTowerClick}
        mode={mode}
        currentAIMove={currentAIMoveIndex}
        totalAIMoves={aiMoves.length || optimalMoves}
        currentMoveDetail={currentMoveDetail}
        isSolved={isSolved}
        moveCount={moveCount}
        optimalMoves={optimalMoves}
        errorMessage={errorMessage}
        isSolving={isSolving}
      />

      {/* Compact Game Statistics HUD */}
      <Statistics
        disks={disks}
        moveCount={moveCount}
        optimalMoves={optimalMoves}
        mode={mode}
        gameStatus={getGameStatus()}
        aiEngineName="SWI-Prolog"
      />

      {/* Project Details Modal Trigger */}
      <div className="details-footer-bar">
        <button
          className="details-trigger-btn"
          onClick={() => setIsDetailsOpen(true)}
          title="Open technical details, Prolog query engine, state search, and project insights"
        >
          <Info size={18} color="#818cf8" />
          <span>Project Details</span>
          <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
            • Prolog Engine, State Space & Insights
          </span>
        </button>
      </div>

      {/* Technical Project Details Modal */}
      <ProjectDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        disks={disks}
        towers={towers}
        moves={aiMoves}
        currentAIMoveIndex={currentAIMoveIndex}
        totalMoves={aiMoves.length || optimalMoves}
        currentAction={currentMoveDetail}
        prologQuery={prologQuery}
        rawCommand={rawCommand}
        swiplStatus={swiplStatus}
      />
    </div>
  );
}

export default App;
