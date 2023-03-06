import React, { useState } from 'react';

function Switcher(props) {
    const { setInterval } = props;
    const [selectedOption, setSelectedOption] = useState('1s');

  const oneSecClick = () => {
    setSelectedOption('1s');
    setInterval('1s');
  };

  const oneMinClick = () => {
    setSelectedOption('1m');
    setInterval('1m');
  };

  return (
    <div className="switcher">
      <div className={`switcher-item ${selectedOption === '1s' ? 'active' : ''}`} onClick={oneSecClick}>
        1s
      </div>
      <div className={`switcher-item ${selectedOption === '1m' ? 'active' : ''}`} onClick={oneMinClick}>
        1m
      </div>
    </div>
  );
}

export default Switcher;
