import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, ShieldCheck } from 'lucide-react';

/**
 * PrologPanel Component
 * Displays the "PROLOG ENGINE" panel required for college project demonstration.
 * Shows the exact SWI-Prolog query, generated solution list, and execution details.
 */
const PrologPanel = ({
  disks,
  moves = [],
  prologQuery,
  rawCommand,
  engineStatus
}) => {
  const [copied, setCopied] = useState(false);

  // Format moves into authentic Prolog list representation: [move(a,c,1), move(a,b,2), ...]
  const formattedPrologMoves = moves.length > 0
    ? '[\n  ' +
      moves
        .map(
          (m) =>
            `move(${m.from.toLowerCase()}, ${m.to.toLowerCase()}, ${m.disk})`
        )
        .join(',\n  ') +
      '\n]'
    : `[\n  % Click "ASK PROLOG AI" to query SWI-Prolog\n]`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedPrologMoves);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f3f4f6' }}>
          <Terminal size={18} color="#38bdf8" />
          <span>PROLOG ENGINE</span>
        </h3>
        <button
          onClick={copyToClipboard}
          className="btn-secondary"
          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          title="Copy Prolog Move List"
        >
          {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy Terms'}</span>
        </button>
      </div>

      <p style={{ fontSize: '0.83rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
        Live query executed against the SWI-Prolog inference engine:
      </p>

      {/* SWI-Prolog Interactive Terminal Box */}
      <div className="prolog-box">
        <div style={{ color: '#8b949e', marginBottom: '0.4rem', borderBottom: '1px solid #21262d', paddingBottom: '0.3rem' }}>
          Welcome to SWI-Prolog (threaded, 64 bits)
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

      {/* Raw Shell Command Executed by Node Backend */}
      <div style={{ marginTop: '0.85rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>
          <Code size={14} />
          <span>Backend Process Execution:</span>
        </div>
        <code style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8', wordBreak: 'break-all' }}>
          {rawCommand || `swipl -q -s backend/prolog/hanoi.pl -g "solve_and_print_json(${disks}), halt."`}
        </code>
      </div>
    </div>
  );
};

export default PrologPanel;
