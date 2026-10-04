import React from 'react';
import { ArrowLeft, Play, Cpu, Layers, GitBranch, Code, ShieldCheck } from 'lucide-react';

/**
 * ProjectInfo Component
 * Displays clean, professional project specifications, architecture,
 * and AI approach.
 */
const ProjectInfo = ({ onBack, onStartGame }) => {
  return (
    <div className="menu-container">
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button className="btn-back-link" onClick={onBack} title="Return to Main Menu">
          <ArrowLeft size={16} />
          <span>Back to Main Menu</span>
        </button>

        <button className="btn btn-primary" onClick={onStartGame} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <Play size={16} />
          <span>Launch Game</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div className="title-badge" style={{ marginBottom: '0.5rem' }}>
          <span className="dot" style={{ background: '#38bdf8' }} />
          <span>TECHNICAL SPECIFICATIONS</span>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
          Tower of Hanoi – AI Problem Solver Using Prolog
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
          A full-stack Artificial Intelligence application integrating symbolic logic programming with a modern web interface.
        </p>

        {/* Specification Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Tech Stack */}
          <div className="info-card" style={{ marginBottom: 0 }}>
            <h4 style={{ color: '#38bdf8' }}>
              <Code size={18} />
              Technology Stack
            </h4>
            <ul>
              <li><strong>Frontend:</strong> React 18, Vite, Modern CSS3 with glassmorphic themes</li>
              <li><strong>Backend:</strong> Node.js, Express.js REST API with CORS support</li>
              <li><strong>AI Engine:</strong> Native SWI-Prolog (64-bit runtime execution)</li>
              <li><strong>Inter-process Communication:</strong> Child process execution with JSON stdout serialization</li>
            </ul>
          </div>

          {/* AI Approach */}
          <div className="info-card" style={{ marginBottom: 0 }}>
            <h4 style={{ color: '#818cf8' }}>
              <GitBranch size={18} />
              AI Approach & Reasoning
            </h4>
            <p>
              Unlike procedural loops or empirical machine learning, this system uses <strong>Symbolic Artificial Intelligence</strong> and <strong>declarative logic programming</strong>.
            </p>
            <p style={{ marginTop: '0.4rem' }}>
              The problem is formulated as a formal state-space with Horn clauses. SWI-Prolog performs resolution and unification over recursive problem decompositions.
            </p>
          </div>

          {/* State Representation */}
          <div className="info-card" style={{ marginBottom: 0 }}>
            <h4 style={{ color: '#10b981' }}>
              <Layers size={18} />
              State Representation
            </h4>
            <p>
              The world state is modeled in Prolog as:
            </p>
            <code style={{ display: 'block', background: '#0d1117', padding: '0.5rem', borderRadius: '6px', color: '#58a6ff', margin: '0.4rem 0', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              state(TowerA, TowerB, TowerC)
            </code>
            <p>
              Initial state: <code>state([1..N], [], [])</code><br />
              Goal state: <code>state([], [], [1..N])</code>
            </p>
          </div>

          {/* Complexity Analysis */}
          <div className="info-card" style={{ marginBottom: 0 }}>
            <h4 style={{ color: '#f59e0b' }}>
              <Cpu size={18} />
              Complexity Guarantees
            </h4>
            <ul>
              <li><strong>Optimal Moves:</strong> 2<sup>N</sup> - 1 moves (mathematically minimal)</li>
              <li><strong>Time Complexity:</strong> O(2<sup>N</sup>) recurrence T(N) = 2T(N-1) + 1</li>
              <li><strong>Space Complexity:</strong> O(N) linear recursive call stack depth</li>
            </ul>
          </div>
        </div>

        {/* Architecture Flow */}
        <div className="info-card" style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ color: '#ffffff' }}>
            <ShieldCheck size={18} color="#10b981" />
            End-to-End System Flow
          </h4>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.8' }}>
            React Frontend (Vite) ➔ HTTP POST /api/solve ➔ Express Backend ➔ SWI-Prolog Engine (hanoi.pl) ➔ JSON Move Sequence Output ➔ Express API Response ➔ React Step-by-Step Animation
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Menu</span>
          </button>
          <button className="btn btn-primary" onClick={onStartGame}>
            <Play size={16} />
            <span>Start Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
