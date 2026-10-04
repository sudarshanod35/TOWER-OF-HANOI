import React from 'react';
import Tower from './Tower';
import { ArrowRight, Trophy, AlertTriangle, CheckCircle2 } from 'lucide-react';

/**
 * GameBoard Component
 * Contains the 3 Towers, handles board-level visual alerts,
 * and displays active move notifications and victory summaries.
 */
const GameBoard = ({
  towers,
  maxDisks,
  selectedTower,
  onTowerClick,
  mode,
  currentAIMove,
  totalAIMoves,
  currentMoveDetail,
  isSolved,
  moveCount,
  optimalMoves,
  errorMessage,
  isSolving
}) => {
  const extraMoves = Math.max(0, moveCount - optimalMoves);
  const efficiency = moveCount > 0 ? Math.round((optimalMoves / moveCount) * 100) : 100;

  return (
    <div className="glass-panel board-container">
      {/* Toast Alert for Illegal Move / Notification */}
      {errorMessage && (
        <div className="toast-alert">
          <AlertTriangle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* AI Move Progress & Action Indicator Banner */}
      {mode === 'ai' && currentMoveDetail && (
        <div className="ai-action-box">
          <div>
            <div className="ai-step-title">
              AI MOVE {currentAIMove} / {totalAIMoves}
            </div>
            <div className="ai-step-action">
              <span>Move Disk {currentMoveDetail.disk}:</span>
              <span>{currentMoveDetail.from}</span>
              <ArrowRight size={18} />
              <span>{currentMoveDetail.to}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
              {currentAIMove === totalAIMoves ? 'Final Move' : 'Executing Prolog Plan'}
            </span>
          </div>
        </div>
      )}

      {/* The 3 Towers */}
      <div className="towers-wrapper">
        <Tower
          id="A"
          label="Tower A"
          role="Source"
          disks={towers.A}
          maxDisks={maxDisks}
          isSelected={selectedTower === 'A'}
          isSourceHighlight={currentMoveDetail?.from === 'A'}
          isTargetHighlight={currentMoveDetail?.to === 'A'}
          onClick={() => onTowerClick('A')}
          disabled={mode === 'ai' && isSolving}
        />

        <Tower
          id="B"
          label="Tower B"
          role="Auxiliary"
          disks={towers.B}
          maxDisks={maxDisks}
          isSelected={selectedTower === 'B'}
          isSourceHighlight={currentMoveDetail?.from === 'B'}
          isTargetHighlight={currentMoveDetail?.to === 'B'}
          onClick={() => onTowerClick('B')}
          disabled={mode === 'ai' && isSolving}
        />

        <Tower
          id="C"
          label="Tower C"
          role="Goal / Destination"
          disks={towers.C}
          maxDisks={maxDisks}
          isSelected={selectedTower === 'C'}
          isSourceHighlight={currentMoveDetail?.from === 'C'}
          isTargetHighlight={currentMoveDetail?.to === 'C'}
          onClick={() => onTowerClick('C')}
          disabled={mode === 'ai' && isSolving}
        />
      </div>

      {/* Victory / Solved Banner */}
      {isSolved && (
        <div className="win-banner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Trophy size={28} color="#10b981" />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              {mode === 'ai' ? 'Prolog AI Solved the Puzzle!' : 'Puzzle Completed Successfully!'}
            </h3>
          </div>

          {mode === 'human' ? (
            <div>
              <p style={{ color: '#cbd5e1', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                Performance Comparison: Human vs Prolog AI
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div className="stat-item" style={{ minWidth: '110px' }}>
                  <div className="stat-label">Player Moves</div>
                  <div className="stat-value" style={{ color: '#f59e0b' }}>{moveCount}</div>
                </div>
                <div className="stat-item" style={{ minWidth: '110px' }}>
                  <div className="stat-label">Optimal Moves</div>
                  <div className="stat-value" style={{ color: '#10b981' }}>{optimalMoves}</div>
                </div>
                <div className="stat-item" style={{ minWidth: '110px' }}>
                  <div className="stat-label">Extra Moves</div>
                  <div className="stat-value">{extraMoves}</div>
                </div>
                <div className="stat-item" style={{ minWidth: '110px' }}>
                  <div className="stat-label">Efficiency</div>
                  <div className="stat-value" style={{ color: efficiency >= 100 ? '#10b981' : '#38bdf8' }}>
                    {efficiency}%
                  </div>
                </div>
              </div>
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                💡 Prolog AI always achieves 100% efficiency in exactly {optimalMoves} moves.
              </p>
            </div>
          ) : (
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
              SWI-Prolog generated and executed the optimal solution in exactly{' '}
              <strong style={{ color: '#10b981' }}>{optimalMoves}</strong> moves (2<sup>{maxDisks}</sup> - 1).
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
