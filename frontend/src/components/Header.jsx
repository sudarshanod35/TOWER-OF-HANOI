import React from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';

/**
 * Header Component
 * Displays the main project title, subtitle, live SWI-Prolog connection badge,
 * and an optional "Main Menu" navigation button.
 */
const Header = ({ swiplStatus, onBackToMenu }) => {
  return (
    <header className="app-header">
      {onBackToMenu && (
        <div className="header-nav-left">
          <button className="btn-back-link" onClick={onBackToMenu} title="Return to Main Menu">
            <ArrowLeft size={16} />
            <span>Main Menu</span>
          </button>
        </div>
      )}

      <div className="title-badge">
        <span className="dot" style={{ background: swiplStatus?.swiplInstalled ? '#10b981' : '#f59e0b' }} />
        <span>AI PUZZLE CHALLENGE • LOGIC ENGINE</span>
      </div>

      <h1 className="app-title">TOWER OF HANOI</h1>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#818cf8', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
        AI PROBLEM SOLVER
      </h2>

      <div className="app-subtitle">
        <span>Powered by</span>
        <span className="engine-highlight">SWI-Prolog</span>
        <span>Reasoning Engine</span>
      </div>

      {/* SWI-Prolog System Diagnostic Banner if not detected */}
      {swiplStatus && !swiplStatus.swiplInstalled && (
        <div className="status-banner warning" style={{ maxWidth: '850px', margin: '1.25rem auto 0 auto', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <AlertCircle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '0.2rem' }}>
                SWI-Prolog Setup Notice:
              </strong>
              <span>
                SWI-Prolog (<code>swipl</code>) is not yet detected in your system PATH. Please run the installer at{' '}
                <code>C:\Users\sunil_4iewzg6\AppData\Local\Temp\WinGet\SWI-Prolog.SWI-Prolog.10.0.2\swipl-10.0.2-1.x64.exe</code>{' '}
                and check <em>"Add swipl to system PATH"</em>.
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
