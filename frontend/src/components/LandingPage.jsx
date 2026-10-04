import React, { useState } from 'react';
import { Play, ArrowRight, HelpCircle, Info, X, Cpu } from 'lucide-react';

/**
 * LandingPage Component
 * Polished game intro screen for Tower of Hanoi.
 * Designed like a real modern puzzle game with glowing visuals,
 * large typography, animated disk showcase, and intuitive navigation.
 */
const LandingPage = ({ onPlayGame, onHowToPlay }) => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="game-intro-screen">
      {/* Background Ambient Glows */}
      <div className="glow-sphere glow-sphere-1" />
      <div className="glow-sphere glow-sphere-2" />

      {/* Main Title Group */}
      <div className="intro-title-group">
        <h1 className="game-logo-title">TOWER OF HANOI</h1>
        <div className="intro-subtitle-badge">
          <span className="pulsing-gem" />
          <span>AI PUZZLE CHALLENGE</span>
        </div>
      </div>

      {/* Game-Style Visual: 3 Towers Showcase with Animated Disks */}
      <div className="game-visual-showcase">
        {/* Tower A with Stack of Colorful Disks */}
        <div className="showcase-tower">
          <div className="showcase-rod" />
          <div className="showcase-disks-stack">
            <div className="showcase-disk s-disk-1 floating-disk">1</div>
            <div className="showcase-disk s-disk-2">2</div>
            <div className="showcase-disk s-disk-3">3</div>
            <div className="showcase-disk s-disk-4">4</div>
            <div className="showcase-disk s-disk-5">5</div>
          </div>
          <div className="showcase-base" />
          <span className="showcase-label">TOWER A</span>
        </div>

        {/* Tower B (Empty Peg) */}
        <div className="showcase-tower">
          <div className="showcase-rod" />
          <div className="showcase-disks-stack empty-stack" />
          <div className="showcase-base" />
          <span className="showcase-label">TOWER B</span>
        </div>

        {/* Tower C (Empty Peg / Goal) */}
        <div className="showcase-tower">
          <div className="showcase-rod" />
          <div className="showcase-disks-stack empty-stack" />
          <div className="showcase-base" />
          <span className="showcase-label">TOWER C</span>
        </div>
      </div>

      {/* Primary Call to Action */}
      <div className="intro-actions-area">
        <button className="btn-play-game" onClick={onPlayGame} title="Start Playing">
          <Play size={22} fill="currentColor" />
          <span>PLAY GAME</span>
          <ArrowRight size={22} />
        </button>

        {/* Secondary Options */}
        <div className="intro-secondary-buttons">
          <button
            className="btn-intro-secondary"
            onClick={onHowToPlay}
            title="Read Rules & Instructions"
          >
            <HelpCircle size={16} />
            <span>HOW TO PLAY</span>
          </button>

          <button
            className="btn-intro-secondary"
            onClick={() => setShowAbout(true)}
            title="About this Project"
          >
            <Info size={16} />
            <span>ABOUT</span>
          </button>
        </div>
      </div>

      {/* Subtle Footer Branding */}
      <div className="intro-footer-branding">
        <span>Powered by <strong className="engine-highlight">SWI-Prolog</strong></span>
      </div>

      {/* Simple About Modal */}
      {showAbout && (
        <div className="modal-backdrop" onClick={() => setShowAbout(false)}>
          <div className="about-modal-box glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="about-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={20} color="#38bdf8" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>About the Game</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowAbout(false)}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="about-modal-body">
              <p style={{ fontSize: '1.05rem', color: '#e2e8f0', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                An interactive Tower of Hanoi puzzle featuring Human Mode and an AI solver powered by SWI-Prolog.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                <div className="info-card" style={{ marginBottom: 0, padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Modes</div>
                  <strong style={{ color: '#818cf8', fontSize: '0.95rem' }}>Human & Prolog AI</strong>
                </div>
                <div className="info-card" style={{ marginBottom: 0, padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Engine</div>
                  <strong style={{ color: '#38bdf8', fontSize: '0.95rem' }}>SWI-Prolog (Native)</strong>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAbout(false)}
                  style={{ width: '100%', padding: '0.65rem' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
