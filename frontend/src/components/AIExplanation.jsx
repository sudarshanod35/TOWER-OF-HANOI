import React, { useState } from 'react';
import { BookOpen, HelpCircle, Layers, Cpu, CheckCircle2 } from 'lucide-react';

/**
 * AIExplanation Component
 * Explains Artificial Intelligence concepts, formal state-space formulation,
 * recursive problem decomposition, logic programming concepts in Prolog,
 * complexity analysis, and college viva questions.
 */
const AIExplanation = ({ disks }) => {
  const [activeTab, setActiveTab] = useState('concepts');

  const optimalFormula = Math.pow(2, disks) - 1;

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
      {/* Navigation Tabs */}
      <div className="doc-tabs">
        <button
          className={`doc-tab ${activeTab === 'concepts' ? 'active' : ''}`}
          onClick={() => setActiveTab('concepts')}
        >
          <BookOpen size={16} style={{ display: 'inline', marginRight: '6px' }} />
          AI Concepts & State Space
        </button>
        <button
          className={`doc-tab ${activeTab === 'complexity' ? 'active' : ''}`}
          onClick={() => setActiveTab('complexity')}
        >
          <Layers size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Complexity Analysis
        </button>
        <button
          className={`doc-tab ${activeTab === 'viva' ? 'active' : ''}`}
          onClick={() => setActiveTab('viva')}
        >
          <HelpCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Viva Preparation
        </button>
      </div>

      {/* Tab 1: AI Concepts */}
      {activeTab === 'concepts' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div className="info-card">
            <h4>What is the Problem?</h4>
            <p>
              Tower of Hanoi is a classic <strong>state-space search and problem-solving</strong> benchmark in Artificial Intelligence. The agent begins at an initial world state and must reach a designated goal state by executing a sequence of valid legal operators.
            </p>
          </div>

          <div className="info-card">
            <h4>State Representation</h4>
            <p>
              The world state is represented formally as <code>state(A, B, C)</code>:
            </p>
            <ul>
              <li><strong>Tower A:</strong> List of disks currently on peg A</li>
              <li><strong>Tower B:</strong> List of disks currently on peg B</li>
              <li><strong>Tower C:</strong> List of disks currently on peg C</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>Initial State</h4>
            <p>
              All <code>N</code> disks are stacked in decreasing order of diameter on Tower A (source):
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8', marginTop: '4px' }}>
              state([1, 2, ..., N], [], [])
            </p>
          </div>

          <div className="info-card">
            <h4>Goal State & Goal Test</h4>
            <p>
              All <code>N</code> disks must be transferred to Tower C (destination) in identical order:
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', color: '#34d399', marginTop: '4px' }}>
              state([], [], [1, 2, ..., N])
            </p>
            <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>
              <strong>Goal Test:</strong> Succeeds when length(C) = N and both A and B are empty.
            </p>
          </div>

          <div className="info-card">
            <h4>Legal Actions / Operators</h4>
            <p>
              Operator <code>move(From, To, Disk)</code> transitions the environment subject to rules:
            </p>
            <ul>
              <li>Only 1 disk (the topmost disk) may be removed at a time.</li>
              <li>A larger disk cannot be placed on top of a smaller disk.</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>Problem Decomposition (Divide & Conquer)</h4>
            <p>
              To transfer <code>N</code> disks from Source (A) to Goal (C) using Aux (B):
            </p>
            <ul>
              <li><strong>Subproblem 1:</strong> Recursively move (N-1) disks from A → B.</li>
              <li><strong>Base Action:</strong> Move the single largest disk N from A → C.</li>
              <li><strong>Subproblem 2:</strong> Recursively move (N-1) disks from B → C.</li>
            </ul>
          </div>

          <div className="info-card" style={{ gridColumn: '1 / -1' }}>
            <h4>Logic Programming in Prolog</h4>
            <p>
              Unlike imperative languages that dictate <em>how</em> to compute through loops and mutable variables, Prolog uses <strong>declarative logic programming</strong>. The programmer states facts and recursive inference rules (Horn clauses). SWI-Prolog automatically performs <strong>unification</strong>, <strong>pattern matching</strong>, and <strong>logical deduction</strong> to infer the optimal sequence of moves.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Complexity Analysis */}
      {activeTab === 'complexity' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="info-card">
              <h4>Optimal Number of Moves</h4>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)', margin: '0.5rem 0' }}>
                2<sup>N</sup> - 1
              </div>
              <p>
                For <strong>{disks}</strong> disks, the mathematically minimal solution requires exactly{' '}
                <strong style={{ color: '#38bdf8' }}>{optimalFormula}</strong> moves.
              </p>
            </div>

            <div className="info-card">
              <h4>Time Complexity</h4>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-mono)', margin: '0.5rem 0' }}>
                O(2<sup>N</sup>)
              </div>
              <p>
                Recurrence relation: <code>T(N) = 2T(N-1) + 1</code>. Every additional disk doubles the required state transitions.
              </p>
            </div>

            <div className="info-card">
              <h4>Recursive Space Complexity</h4>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#a855f7', fontFamily: 'var(--font-mono)', margin: '0.5rem 0' }}>
                O(N)
              </div>
              <p>
                The maximum call stack depth of the Prolog inference engine equals the number of disks <code>N</code>.
              </p>
            </div>
          </div>

          <div className="info-card">
            <h4>Exponential Growth Table</h4>
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

      {/* Tab 3: Viva Preparation */}
      {activeTab === 'viva' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          <div className="info-card">
            <h4>Q1: Why use Prolog instead of an imperative loop?</h4>
            <p>
              Prolog is a declarative logic programming language based on first-order predicate calculus. We specify <em>what</em> the problem rules and relationships are, rather than writing iterative steps. Prolog’s inference engine handles recursion and backtracking automatically.
            </p>
          </div>

          <div className="info-card">
            <h4>Q2: How does the backend communicate with Prolog?</h4>
            <p>
              When the user clicks "ASK PROLOG AI", the Node.js Express backend spawns SWI-Prolog as an external sub-process (<code>swipl</code>) loading <code>hanoi.pl</code>. Prolog computes the proof/solution, serializes the moves to stdout as JSON, and Express delivers them to React for animation.
            </p>
          </div>

          <div className="info-card">
            <h4>Q3: How is the state represented in Prolog?</h4>
            <p>
              As a compound term <code>state(A, B, C)</code> where each tower is an ordered list of disk integers. The head of each list represents the topmost disk available for movement.
            </p>
          </div>

          <div className="info-card">
            <h4>Q4: Why is the solution mathematically optimal?</h4>
            <p>
              By mathematical induction on <code>T(N) = 2T(N-1) + 1</code>, it is proven that no valid solution can solve Tower of Hanoi in fewer than <code>2^N - 1</code> moves. The recursive Prolog decomposition produces exactly this minimal sequence.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIExplanation;
