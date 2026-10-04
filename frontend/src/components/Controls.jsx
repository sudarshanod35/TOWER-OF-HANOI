import React from 'react';
import { Play, Pause, RotateCcw, Cpu, User, FastForward, Sliders } from 'lucide-react';

/**
 * Controls Component
 * Provides mode switching, disk selection (3-10),
 * AI query execution ("ASK PROLOG AI"), animation playback controls (Play/Pause/Reset),
 * and animation speed adjustment.
 */
const Controls = ({
  mode,
  setMode,
  disks,
  setDisks,
  onAskPrologAI,
  isSolving,
  isPaused,
  hasMoves,
  onStartPause,
  onReset,
  speed,
  setSpeed,
  disabled
}) => {
  const diskOptions = [3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
      {/* Mode Switcher */}
      <div className="mode-switcher">
        <button
          className={`mode-btn ${mode === 'human' ? 'active' : ''}`}
          onClick={() => setMode('human')}
          disabled={disabled}
        >
          <User size={18} />
          <span>HUMAN MODE</span>
        </button>

        <button
          className={`mode-btn ${mode === 'ai' ? 'active' : ''}`}
          onClick={() => setMode('ai')}
          disabled={disabled}
        >
          <Cpu size={18} />
          <span>PROLOG AI MODE</span>
        </button>
      </div>

      <div className="controls-panel">
        {/* Disk Count Selector (3 to 10) */}
        <div className="disk-selector">
          <label htmlFor="disk-select">Number of Disks:</label>
          <div className="disk-buttons">
            {diskOptions.map((num) => (
              <button
                key={num}
                className={`disk-btn ${disks === num ? 'active' : ''}`}
                onClick={() => setDisks(num)}
                disabled={disabled}
                title={`Select ${num} disks (${Math.pow(2, num) - 1} optimal moves)`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {mode === 'ai' ? (
            <>
              {/* ASK PROLOG AI Button */}
              {!hasMoves ? (
                <button
                  className="btn btn-primary"
                  onClick={onAskPrologAI}
                  disabled={isSolving}
                >
                  <Cpu size={18} />
                  <span>{isSolving ? 'Prolog AI is solving...' : 'ASK PROLOG AI'}</span>
                </button>
              ) : (
                /* Play / Pause Toggle */
                <button
                  className={`btn ${isPaused ? 'btn-success' : 'btn-secondary'}`}
                  onClick={onStartPause}
                >
                  {isPaused ? <Play size={18} /> : <Pause size={18} />}
                  <span>{isPaused ? 'Resume AI' : 'Pause'}</span>
                </button>
              )}

              {/* Reset Button */}
              <button
                className="btn btn-secondary"
                onClick={onReset}
                disabled={isSolving && !isPaused}
                title="Reset puzzle to initial state"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>

              {/* Speed Control */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: '0.5rem' }}>
                <Sliders size={16} color="#9ca3af" />
                <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Speed:</span>
                <select
                  id="speed-select"
                  aria-label="Animation Speed"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  style={{
                    background: '#1f2937',
                    color: '#f3f4f6',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  <option value={1200}>0.5x (Slow)</option>
                  <option value={600}>1x (Normal)</option>
                  <option value={300}>2x (Fast)</option>
                  <option value={150}>4x (Turbo)</option>
                </select>
              </div>
            </>
          ) : (
            /* Human Mode Controls */
            <button
              className="btn btn-secondary"
              onClick={onReset}
              title="Reset disks to Tower A"
            >
              <RotateCcw size={16} />
              <span>Reset Game</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;
