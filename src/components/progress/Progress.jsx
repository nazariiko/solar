import React from 'react';

const Progress = ({ percent }) => {
  return (
    <div className='progress'>
      <div className='progress-filled' style={{ width: `${percent}%` }}>
        {percent}%
      </div>
    </div>
  );
};

export default Progress;