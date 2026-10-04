import React from 'react';
import { ArrowLeft, Play, ShieldAlert, CheckCircle2, Cpu, User, Target } from 'lucide-react';

/**
 * HowToPlay Component
 * Provides clean, illustrated game rules and instructions.
 */
const HowToPlay = ({ onBack, onStartGame }) => {
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
          <span>Start Playing</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
          How to Play Tower of Hanoi
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
          The objective is simple, but the puzzle requires strict adherence to mathematical invariant rules.
        </p>

        {/* 3 Core Invariant Rules */}
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          The Fundamental Rules
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          <div className="info-card" style={{ marginBottom: 0 }}>
            <h4 style={{ color: '#818cf8' }}>
              <span className="rule-number">1</span>
              Single Disk Movement
            </h4>
            <p>
              Only <strong>one disk</strong> can be moved at a time, and only the <strong>topmost disk</strong> of any tower may be transferred.
            </p>
          </div>

          <div className="info-card" style={{ marginBottom: 0 }}>
            <h4 style={{ color: '#f59e0b' }}>
              <span className="rule-number">2</span>
              Size Hierarchy Constraint
            </h4>
            <p>
              A <strong>larger disk can never be placed on top of a smaller disk</strong>. The game engine instantly detects and rejects any illegal attempts.
            </p>
          </div>

          <div className="info-card" style={{ marginBottom: 0 }}>
            <h4 style={{ color: '#10b981' }}>
              <span className="rule-number">3</span>
              Goal Destination
            </h4>
            <p>
              All disks stacked on <strong>Tower A (Source)</strong> must be successfully transferred to <strong>Tower C (Goal)</strong> in identical descending order.
            </p>
          </div>
        </div>

        {/* Dual Mode Explanation */}
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Game Modes Explained
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="info-card" style={{ marginBottom: 0, borderLeft: '4px solid #818cf8' }}>
            <h4 style={{ color: '#ffffff' }}>
              <User size={18} color="#818cf8" />
              Human Mode
            </h4>
            <p>
              Click a tower to select its topmost disk, then click a destination tower to move it. Tracks your move count and compares your efficiency against the theoretical optimal benchmark:
            </p>
            <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-mono)', color: '#818cf8', fontSize: '0.85rem' }}>
              Efficiency = (Optimal Moves / Player Moves) × 100%
            </div>
          </div>

          <div className="info-card" style={{ marginBottom: 0, borderLeft: '4px solid #10b981' }}>
            <h4 style={{ color: '#ffffff' }}>
              <Cpu size={18} color="#10b981" />
              Prolog AI Mode
            </h4>
            <p>
              Sends your selected disk count to the <strong>SWI-Prolog reasoning engine</strong>. Prolog calculates the provably optimal solution sequence and animates every move with real-time speed control, pause, and resume.
            </p>
            <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-mono)', color: '#10b981', fontSize: '0.85rem' }}>
              Optimal Moves Formula = 2<sup>N</sup> - 1
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Menu</span>
          </button>
          <button className="btn btn-primary" onClick={onStartGame}>
            <Play size={16} />
            <span>Launch Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
