import React from 'react';
import { GitBranch, Target, Compass, PlayCircle } from 'lucide-react';

/**
 * AIStatePanel Component
 * Section: "AI STATE & SEARCH"
 * Displays formal state space representation:
 *   Current State: state(A, B, C)
 *   Current Action: move(From, To, Disk)
 *   Goal State: state([], [], [1..N])
 *   Progress: Current / Total
 */
const AIStatePanel = ({
  towers,
  disks,
  currentMoveIndex,
  totalMoves,
  currentAction
}) => {
  // Format tower contents: lists [disk1, disk2, ...]
  // We show top of tower first to match standard stack representation
  const formatTower = (diskArray) => {
    if (!diskArray || diskArray.length === 0) return '[]';
    // reversed so top of stack is displayed first
    const reversed = [...diskArray].reverse();
    return `[${reversed.join(', ')}]`;
  };

  // Generate Goal State representation for N disks
  const goalArray = Array.from({ length: disks }, (_, i) => i + 1);

  // Progress percentage
  const progressPercent = totalMoves > 0 ? Math.min(100, Math.round((currentMoveIndex / totalMoves) * 100)) : 0;

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f3f4f6' }}>
        <GitBranch size={18} color="#a855f7" />
        <span>AI STATE & SEARCH</span>
      </h3>

      {/* Current State */}
      <div style={{ marginBottom: '0.85rem' }}>
        <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
          Current State (A, B, C):
        </div>
        <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', padding: '0.65rem 0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
          <div><span style={{ color: '#58a6ff' }}>A:</span> {formatTower(towers.A)}</div>
          <div><span style={{ color: '#58a6ff' }}>B:</span> {formatTower(towers.B)}</div>
          <div><span style={{ color: '#58a6ff' }}>C:</span> {formatTower(towers.C)}</div>
        </div>
      </div>

      {/* Current Action */}
      <div style={{ marginBottom: '0.85rem' }}>
        <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
          Current Action:
        </div>
        <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.85rem', fontWeight: 600, color: '#e0e7ff' }}>
          {currentAction ? (
            <span>
              Move disk <strong style={{ color: '#38bdf8' }}>{currentAction.disk}</strong> from{' '}
              <strong style={{ color: '#f59e0b' }}>{currentAction.from}</strong> →{' '}
              <strong style={{ color: '#10b981' }}>{currentAction.to}</strong>
            </span>
          ) : (
            <span style={{ color: '#9ca3af' }}>Ready / Initial State</span>
          )}
        </div>
      </div>

      {/* Goal State */}
      <div style={{ marginBottom: '0.85rem' }}>
        <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
          Goal State:
        </div>
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '0.55rem 0.85rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: '#34d399' }}>
          state([], [], [{goalArray.join(', ')}])
        </div>
      </div>

      {/* Progress */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, marginBottom: '0.35rem' }}>
          <span>Search & Solution Progress:</span>
          <span style={{ color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
            {currentMoveIndex} / {totalMoves} ({progressPercent}%)
          </span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
    </div>
  );
};

export default AIStatePanel;
