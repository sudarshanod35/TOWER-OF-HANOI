import React from 'react';
import { Activity, Cpu } from 'lucide-react';

/**
 * Statistics Component
 * Displays live stats including disks, current moves, optimal moves,
 * remaining moves, game mode, AI engine, and game status.
 */
const Statistics = ({
  disks,
  moveCount,
  optimalMoves,
  mode,
  gameStatus,
  aiEngineName = 'SWI-Prolog'
}) => {
  const remainingMoves = Math.max(0, optimalMoves - moveCount);

  return (
    <div className="glass-panel" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#f3f4f6', letterSpacing: '0.04em' }}>
          <Activity size={16} color="#6366f1" />
          <span>GAME METRICS</span>
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
          <span style={{ color: '#9ca3af' }}>Status:</span>
          <strong style={{ color: gameStatus.color }}>{gameStatus.label}</strong>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stat-item">
          <div className="stat-label">Disks</div>
          <div className="stat-value" style={{ color: '#818cf8' }}>{disks}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Current Moves</div>
          <div className="stat-value">{moveCount}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Optimal Moves</div>
          <div className="stat-value" style={{ color: '#10b981' }}>{optimalMoves}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Remaining</div>
          <div className="stat-value" style={{ color: remainingMoves === 0 ? '#10b981' : '#f59e0b' }}>
            {remainingMoves}
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Mode</div>
          <div className="stat-value" style={{ fontSize: '1rem', color: mode === 'ai' ? '#38bdf8' : '#e2e8f0' }}>
            {mode === 'ai' ? 'Prolog AI' : 'Human'}
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-label">AI Engine</div>
          <div className="stat-value" style={{ fontSize: '0.92rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Cpu size={14} />
            <span>{aiEngineName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
