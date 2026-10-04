import React from 'react';
import Disk from './Disk';

/**
 * Tower Component
 * Represents a single peg in the Tower of Hanoi game.
 *
 * @param {string} id - 'A', 'B', or 'C'
 * @param {string} label - Full name e.g. "Tower A"
 * @param {string} role - Role e.g. "Source", "Auxiliary", "Destination"
 * @param {Array<number>} disks - Disks currently on this tower, bottom to top (e.g. [3, 2, 1])
 * @param {number} maxDisks - Total number of disks in the game
 * @param {boolean} isSelected - Whether this tower is selected as source in human mode
 * @param {boolean} isSourceHighlight - Whether AI is currently moving a disk FROM this tower
 * @param {boolean} isTargetHighlight - Whether AI is currently moving a disk TO this tower
 * @param {function} onClick - Click handler for tower interaction
 * @param {boolean} disabled - Whether interactions are disabled
 */
const Tower = ({
  id,
  label,
  role,
  disks = [],
  maxDisks,
  isSelected,
  isSourceHighlight,
  isTargetHighlight,
  onClick,
  disabled
}) => {
  let stateClass = '';
  if (isSelected) stateClass = 'selected';
  else if (isSourceHighlight) stateClass = 'highlight-source';
  else if (isTargetHighlight) stateClass = 'highlight-target';

  return (
    <div
      className={`tower-column ${stateClass}`}
      onClick={!disabled ? onClick : undefined}
      title={`${label} (${role}) - ${disks.length} disks`}
    >
      <div className="tower-peg-area">
        {/* Vertical Peg */}
        <div className="tower-rod" />

        {/* Stack of Disks (rendered from bottom to top) */}
        {disks.map((diskNumber, index) => {
          const isTopDisk = index === disks.length - 1;
          return (
            <Disk
              key={`${id}-disk-${diskNumber}`}
              disk={diskNumber}
              maxDisks={maxDisks}
              isSelected={isSelected && isTopDisk}
            />
          );
        })}
      </div>

      {/* Wooden Base of the Tower */}
      <div className="tower-base" />

      {/* Label and Semantic Role */}
      <div className="tower-label">
        <span>{label}</span>
        <span className="tower-tag">{role}</span>
      </div>
    </div>
  );
};

export default Tower;
