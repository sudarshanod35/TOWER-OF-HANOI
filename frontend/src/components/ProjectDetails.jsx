import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  GitBranch, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Copy, 
  Check, 
  Code, 
  Cpu, 
  CheckCircle2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

/**
 * ProjectDetails Component
 * Modal / Drawer that houses all deep technical, educational, and architectural content.
 * Keeps the main game UI clean, focused, and distraction-free.
 * 
 * Tabs:
 * 1. AI Concepts
 * 2. Prolog Engine
 * 3. State & Search
 * 4. Complexity Analysis
 * 5. Project Insights
 */
const ProjectDetails = ({
  isOpen,
  onClose,
  disks,
  towers,
  moves = [],
  currentAIMoveIndex = 0,
  totalMoves = 0,
  currentAction = null,
  prologQuery = '',
  rawCommand = '',
  swiplStatus = null
}) => {
  const [activeTab, setActiveTab] = useState('engine'); // 'concepts' | 'engine' | 'state' | 'complexity' | 'insights'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Format tower stack for State & Search tab
  const formatTower = (diskArray) => {
    if (!diskArray || diskArray.length === 0) return '[]';
    const reversed = [...diskArray].reverse();
    return `[${reversed.join(', ')}]`;
  };

  const goalArray = Array.from({ length: disks }, (_, i) => i + 1);
  const progressPercent = totalMoves > 0 ? Math.min(100, Math.round((currentAIMoveIndex / totalMoves) * 100)) : 0;
  const optimalFormula = Math.pow(2, disks) - 1;

  // Format moves for Prolog Engine tab
  const formattedPrologMoves = moves.length > 0
    ? '[\n  ' +
      moves
        .map((m) => `move(${m.from.toLowerCase()}, ${m.to.toLowerCase()}, ${m.disk})`)
        .join(',\n  ') +
      '\n]'
    : `[\n  % No moves generated yet. Click "ASK PROLOG AI" in the game.\n]`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedPrologMoves);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="dot" style={{ background: swiplStatus?.swiplInstalled ? '#10b981' : '#f59e0b', width: '8px', height: '8px', borderRadius: '50%' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Project Details & Technical Specifications</h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: '0.2rem' }}>
              Deep dive into SWI-Prolog logical reasoning, state-space formulation, and project architecture.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close Details">
            <X size={20} />
          </button>
        </div>

        {/* Modal Tabs Navigation */}
        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${activeTab === 'engine' ? 'active' : ''}`}
            onClick={() => setActiveTab('engine')}
          >
            <Terminal size={16} />
            <span>Prolog Engine</span>
          </button>

          <button
            className={`modal-tab-btn ${activeTab === 'state' ? 'active' : ''}`}
            onClick={() => setActiveTab('state')}
          >
            <GitBranch size={16} />
            <span>State & Search</span>
          </button>

          <button
            className={`modal-tab-btn ${activeTab === 'concepts' ? 'active' : ''}`}
            onClick={() => setActiveTab('concepts')}
          >
            <BookOpen size={16} />
            <span>AI Concepts</span>
          </button>

          <button
            className={`modal-tab-btn ${activeTab === 'complexity' ? 'active' : ''}`}
            onClick={() => setActiveTab('complexity')}
          >
            <Layers size={16} />
            <span>Complexity Analysis</span>
          </button>

          <button
            className={`modal-tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            <Sparkles size={16} />
            <span>Project Insights</span>
          </button>
        </div>

        {/* Modal Body / Tab Contents */}
        <div className="modal-body">
          {/* TAB 1: PROLOG ENGINE */}
          {activeTab === 'engine' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f3f4f6' }}>SWI-Prolog Deduction Engine</h3>
                  <p style={{ fontSize: '0.83rem', color: '#9ca3af' }}>
                    Authentic query evaluation executed by SWI-Prolog via child process execution:
                  </p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy Move Terms'}</span>
                </button>
              </div>

              {/* Terminal View */}
              <div className="prolog-box" style={{ maxHeight: '280px' }}>
                <div style={{ color: '#8b949e', marginBottom: '0.4rem', borderBottom: '1px solid #21262d', paddingBottom: '0.3rem' }}>
                  SWI-Prolog Engine (Version: {swiplStatus?.swiplVersion || '10.0.2 x64'})
                </div>
                <div>
                  <span className="query">?- </span>
                  <span style={{ color: '#f0883e' }}>solve_hanoi</span>({disks}, <span className="variable">Moves</span>).
                </div>
                <div style={{ marginTop: '0.4rem', color: '#7ee787' }}>
                  Moves = {formattedPrologMoves}
                </div>
                <div style={{ marginTop: '0.4rem', color: '#8b949e' }}>
                  true.
                </div>
              </div>

              {/* Execution Diagnostics */}
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
                <div className="info-card" style={{ marginBottom: 0 }}>
                  <h4 style={{ fontSize: '0.85rem' }}><Code size={14} /> Backend Process Execution</h4>
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#38bdf8', wordBreak: 'break-all' }}>
                    {rawCommand || `swipl -q -s backend/prolog/hanoi.pl -g "solve_and_print_json(${disks}), halt."`}
                  </code>
                </div>

                <div className="info-card" style={{ marginBottom: 0 }}>
                  <h4 style={{ fontSize: '0.85rem' }}><Cpu size={14} /> Solver Predicate Definition</h4>
                  <p style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#a5b4fc' }}>
                    solve_hanoi(N, Moves) :- hanoi(N, a, c, b, Moves).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STATE & SEARCH */}
          {activeTab === 'state' && (
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f3f4f6', marginBottom: '0.25rem' }}>
                Formal State Space Formulation
              </h3>
              <p style={{ fontSize: '0.83rem', color: '#9ca3af', marginBottom: '1rem' }}>
                Discrete mathematical snapshot of the world state and active transition operators:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                {/* Current State */}
                <div className="info-card" style={{ marginBottom: 0 }}>
                  <h4 style={{ fontSize: '0.88rem' }}>Current Environmental State</h4>
                  <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', padding: '0.65rem 0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
                    <div><span style={{ color: '#58a6ff' }}>Tower A:</span> {formatTower(towers.A)}</div>
                    <div><span style={{ color: '#58a6ff' }}>Tower B:</span> {formatTower(towers.B)}</div>
                    <div><span style={{ color: '#58a6ff' }}>Tower C:</span> {formatTower(towers.C)}</div>
                  </div>
                </div>

                {/* Current Action */}
                <div className="info-card" style={{ marginBottom: 0 }}>
                  <h4 style={{ fontSize: '0.88rem' }}>Current Action Operator</h4>
                  <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.88rem', fontWeight: 600, color: '#e0e7ff', marginTop: '0.4rem' }}>
                    {currentAction ? (
                      <span>
                        move(<strong style={{ color: '#f59e0b' }}>{currentAction.from.toLowerCase()}</strong>,{' '}
                        <strong style={{ color: '#10b981' }}>{currentAction.to.toLowerCase()}</strong>,{' '}
                        <strong style={{ color: '#38bdf8' }}>{currentAction.disk}</strong>)
                      </span>
                    ) : (
                      <span style={{ color: '#9ca3af' }}>No action active / Initial state</span>
                    )}
                  </div>
                </div>

                {/* Goal State */}
                <div className="info-card" style={{ marginBottom: 0 }}>
                  <h4 style={{ fontSize: '0.88rem' }}>Goal State Target</h4>
                  <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: '#34d399', marginTop: '0.4rem' }}>
                    state([], [], [{goalArray.join(', ')}])
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="info-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: '#9ca3af', fontWeight: 600, marginBottom: '0.35rem' }}>
                  <span>State Space Traversal Progress:</span>
                  <span style={{ color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                    {currentAIMoveIndex} / {totalMoves} ({progressPercent}%)
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI CONCEPTS */}
          {activeTab === 'concepts' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div className="info-card">
                <h4>What is the Problem?</h4>
                <p>
                  Tower of Hanoi is a formal <strong>state-space search and problem-solving</strong> benchmark in Artificial Intelligence. The agent starts in an initial environment state and systematically navigates toward a goal state using valid operators.
                </p>
              </div>

              <div className="info-card">
                <h4>State Representation</h4>
                <p>
                  Represented in Prolog as a compound term <code>state(A, B, C)</code> where each tower is an ordered list representing a stack of disks with the smallest disk on top.
                </p>
              </div>

              <div className="info-card">
                <h4>Initial & Goal States</h4>
                <p>
                  <strong>Initial:</strong> <code>state([1..N], [], [])</code><br />
                  <strong>Goal:</strong> <code>state([], [], [1..N])</code><br />
                  <strong>Goal Test:</strong> Verified when all N disks reside on Tower C in ascending order.
                </p>
              </div>

              <div className="info-card">
                <h4>Legal Actions / Operators</h4>
                <p>
                  Operator <code>move(From, To, Disk)</code> transitions the environment state:
                </p>
                <ul>
                  <li>Only the topmost disk can be moved at a time.</li>
                  <li>No larger disk can ever be placed on top of a smaller disk.</li>
                </ul>
              </div>

              <div className="info-card">
                <h4>Problem Decomposition (Divide & Conquer)</h4>
                <p>
                  To transfer N disks from Source (A) to Goal (C) using Aux (B):
                </p>
                <ul>
                  <li>Recursively move (N-1) disks from A → B.</li>
                  <li>Move largest disk N from A → C.</li>
                  <li>Recursively move (N-1) disks from B → C.</li>
                </ul>
              </div>

              <div className="info-card">
                <h4>Declarative Logic Programming</h4>
                <p>
                  Rather than specifying procedural iteration, Prolog uses <strong>Horn clauses</strong>, <strong>first-order logic</strong>, and <strong>unification</strong> to deduce the mathematically optimal move sequence automatically.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: COMPLEXITY ANALYSIS */}
          {activeTab === 'complexity' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="info-card">
                  <h4>Optimal Number of Moves</h4>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)', margin: '0.4rem 0' }}>
                    2<sup>N</sup> - 1
                  </div>
                  <p>
                    For <strong>{disks}</strong> disks, the optimal solution requires exactly{' '}
                    <strong style={{ color: '#38bdf8' }}>{optimalFormula}</strong> moves.
                  </p>
                </div>

                <div className="info-card">
                  <h4>Time Complexity</h4>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-mono)', margin: '0.4rem 0' }}>
                    O(2<sup>N</sup>)
                  </div>
                  <p>
                    Recurrence relation: <code>T(N) = 2T(N-1) + 1</code>. Every additional disk doubles required operations.
                  </p>
                </div>

                <div className="info-card">
                  <h4>Recursive Space Complexity</h4>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#a855f7', fontFamily: 'var(--font-mono)', margin: '0.4rem 0' }}>
                    O(N)
                  </div>
                  <p>
                    The maximum call stack depth of the Prolog inference engine equals the number of disks <code>N</code>.
                  </p>
                </div>
              </div>

              <div className="info-card">
                <h4>Theoretical Growth Table (Disks 3 to 10)</h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', marginTop: '0.5rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', color: '#9ca3af' }}>
                        <th style={{ padding: '0.5rem' }}>Disks (N)</th>
                        <th style={{ padding: '0.5rem' }}>Optimal Moves (2<sup>N</sup> - 1)</th>
                        <th style={{ padding: '0.5rem' }}>Prolog Verification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <tr
                          key={n}
                          style={{
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                            background: n === disks ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                            fontWeight: n === disks ? 700 : 400
                          }}
                        >
                          <td style={{ padding: '0.5rem' }}>{n} {n === disks ? '★ Current' : ''}</td>
                          <td style={{ padding: '0.5rem', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
                            {Math.pow(2, n) - 1} moves
                          </td>
                          <td style={{ padding: '0.5rem', color: '#10b981' }}>
                            ?- solve_hanoi({n}, Moves)
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROJECT INSIGHTS */}
          {activeTab === 'insights' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div className="info-card">
                <h4>Project Architecture</h4>
                <p>
                  A decoupled full-stack architecture:
                </p>
                <ul>
                  <li><strong>Presentation Layer:</strong> React 18 + Vite for interactive visualization and animations.</li>
                  <li><strong>Service Layer:</strong> Node.js + Express backend orchestrating process execution and API routing.</li>
                  <li><strong>AI Engine:</strong> Native SWI-Prolog executing deductive reasoning over Horn clauses.</li>
                </ul>
              </div>

              <div className="info-card">
                <h4>AI Approach: Symbolic vs Machine Learning</h4>
                <p>
                  This project uses <strong>Classical / Symbolic AI (GOFAI)</strong> rather than machine learning. It relies on mathematical logic, exact constraints, state-space exploration, and formal proof verification to generate provably optimal solutions.
                </p>
              </div>

              <div className="info-card">
                <h4>Why SWI-Prolog?</h4>
                <p>
                  Prolog provides built-in pattern unification and SLD resolution. Problems that can be defined recursively map directly to Prolog predicates without requiring procedural loops or manual stack tracking.
                </p>
              </div>

              <div className="info-card">
                <h4>Optimal Solution Guarantee</h4>
                <p>
                  By mathematical induction on <code>T(N) = 2T(N-1) + 1</code>, it is proven that no valid solution can solve Tower of Hanoi in fewer than <code>2^N - 1</code> moves. SWI-Prolog outputs this minimal sequence.
                </p>
              </div>

              <div className="info-card">
                <h4>Technical Implementation</h4>
                <p>
                  Communication between Node.js and SWI-Prolog is achieved using <code>child_process.exec()</code> to run <code>swipl</code> with JSON-serialized output, providing seamless integration between logic programming and modern web technologies.
                </p>
              </div>

              <div className="info-card">
                <h4>State Representation</h4>
                <p>
                  Each peg is modeled as an ordered list of integers. Valid transitions are constrained by Prolog guards ensuring that smaller disk values can only be placed on larger disk values or empty pegs.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
