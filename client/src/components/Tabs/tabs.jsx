import './tabs.css';
import Positions from '../Positions';
import Bags from '../Bags';
import { useState } from 'react';

const Tabs = () => {
  const [showPositions, setShowPositions] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showBags, setShowBags] = useState(false);

  const handlePositionsClick = () => {
    setShowPositions(!showPositions);
    setShowOrders(false);
    setShowBags(false);
  };

  const handleOrdersClick = () => {
    setShowPositions(false);
    setShowOrders(!showOrders);
    setShowBags(false);
  };

  const handleBagsClick = () => {
    setShowPositions(false);
    setShowOrders(false);
    setShowBags(!showBags);
  };

  return (
    <div className="tab">
      <button onClick={handlePositionsClick}>Positions</button>
      <button onClick={handleOrdersClick}>Orders</button>
      <button onClick={handleBagsClick}>Bags</button>
      {showPositions && (
        <div className="content">
          <Positions />
        </div>
      )}
      {showOrders && (
        <div className="content">
          <Positions />
        </div>
      )}
      {showBags && (
        <div className="content">
          <Bags />
        </div>
      )}
    </div>
  );
};

export default Tabs;
