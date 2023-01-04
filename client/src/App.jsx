import { useState } from 'react';
import { SWRConfig } from 'swr';

import config from './config';
import Symbols from './components/Symbols';
import OrderType from './components/OrderType';
import Amount from './components/Amount';
import OrderParams from './components/OrderParams';
import Positions from './components/Positions';
import CreateOrder from './components/CreateOrder';
import './App.css';

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  // market or limit
  const [orderType, setOrderType] = useState(null);
  // order amount
  const [amount, setAmount] = useState(config.defaultAmount);
  // idk what's this at the moment
  // const [selectedParams, setSelectedParams] = useState({});

  return (
    <SWRConfig value={config.swr}>
      <div className="App">
        <h1 className="app-title"> MENU </h1>

        <div className="contenitore">
          <Symbols onChange={setSelectedSymbol} selectedSymbol={selectedSymbol} />
          <OrderType type={orderType} onChange={setOrderType} />
          <Amount amount={amount} onChange={setAmount} />
          <OrderParams />
        </div>

        <CreateOrder selectedSymbol={selectedSymbol} orderType={orderType} amount={amount} />

        <Positions />
      </div>
    </SWRConfig>
  );
};

export default App;
