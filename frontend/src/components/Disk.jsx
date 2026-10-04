import React from 'react';

/**
 * Disk Component
 * Renders an individual colored disk with width proportional to its size.
 *
 * @param {number} disk - The disk number (1 = smallest, N = largest)
 * @param {number} maxDisks - Total number of disks in the puzzle
 * @param {boolean} isSelected - Whether this disk is currently lifted/selected
 */
const Disk = ({ disk, maxDisks, isSelected = false }) => {
  // Calculate width dynamically between 28% and 92% of the tower column width
  const minWidthPercent = 28;
  const maxWidthPercent = 94;
  const widthStep = (maxWidthPercent - minWidthPercent) / Math.max(maxDisks - 1, 1);
  const calculatedWidth = `${minWidthPercent + (disk - 1) * widthStep}%`;

  return (
    <div
      className={`disk-element disk-${disk} ${isSelected ? 'selected-disk' : ''}`}
      style={{
        width: calculatedWidth,
        maxWidth: '280px'
      }}
      title={`Disk ${disk}`}
    >
      <span>{disk}</span>
    </div>
  );
};

export default Disk;
