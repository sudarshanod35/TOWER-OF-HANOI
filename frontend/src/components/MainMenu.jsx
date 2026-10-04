import React from 'react';
import { Play, HelpCircle, Info, ArrowLeft, Cpu, ChevronRight } from 'lucide-react';

/**
 * MainMenu Component
 * Displays the central hub options:
 * 1. START GAME
 * 2. HOW TO PLAY
 * 3. PROJECT INFORMATION
 */
const MainMenu = ({ onNavigate }) => {
  return (
    <div className="menu-container">
      {/* Back to Intro */}
      <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        <button
          className="btn-back-link"
          onClick={() => onNavigate('landing')}
          title="Return to Intro Landing Page"
        >
          <ArrowLeft size={16} />
          <span>Back to Welcome Page</span>
        </button>
      </div>

      {/* Menu Header */}
      <div className="app-header" style={{ marginBottom: '2rem' }}>
        <div className="title-badge">
          <span className="dot" style={{ background: '#10b981' }} />
          <span>MAIN NAVIGATION</span>
        </div>
        <h1 className="app-title" style={{ fontSize: '2.1rem' }}>TOWER OF HANOI</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Select an option below to begin playing or explore project details.
        </p>
      </div>

      {/* Main Menu Cards Grid */}
      <div className="main-menu-grid">
        {/* Option 1: START GAME */}
        <div
          className="menu-card primary-card"
          onClick={() => onNavigate('game')}
          title="Launch Tower of Hanoi Simulator"
        >
          <div className="menu-card-icon" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>
            <Play size={28} />
          </div>
          <div className="menu-card-content">
            <h3>START GAME</h3>
            <p>
              Play in manual Human Mode with move validation, or trigger the SWI-Prolog AI Engine to compute and animate the optimal solution.
            </p>
          </div>
          <ChevronRight size={22} className="menu-card-arrow" />
        </div>

        {/* Option 2: HOW TO PLAY */}
        <div
          className="menu-card"
          onClick={() => onNavigate('how-to-play')}
          title="View Rules and Gameplay Instructions"
        >
          <div className="menu-card-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
            <HelpCircle size={28} />
          </div>
          <div className="menu-card-content">
            <h3>HOW TO PLAY</h3>
            <p>
              Learn the mathematical rules of the puzzle, valid disk movements, and how both Human Mode and Prolog AI Mode work.
            </p>
          </div>
          <ChevronRight size={22} className="menu-card-arrow" />
        </div>

        {/* Option 3: PROJECT INFORMATION */}
        <div
          className="menu-card"
          onClick={() => onNavigate('project-info')}
          title="View Technical Specifications and AI Approach"
        >
          <div className="menu-card-icon" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8' }}>
            <Info size={28} />
          </div>
          <div className="menu-card-content">
            <h3>PROJECT INFORMATION</h3>
            <p>
              Overview of system architecture, technology stack (React, Node.js, SWI-Prolog), and declarative logic programming principles.
            </p>
          </div>
          <ChevronRight size={22} className="menu-card-arrow" />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
