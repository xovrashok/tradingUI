import { useState } from 'react';
import { SWRConfig } from 'swr';

import config from './config';
import Symbols from './components/Symbols';
import OrderType from './components/OrderType';
import Amount from './components/Amount';
import Positions from './components/Positions';
import CreateOrder from './components/CreateOrder';
import './App.css';
import TradingPair from './components/TradingPair/TradingPair';

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  // market or limit
  const [orderType, setOrderType] = useState(null);
  // order amount
  const [amount, setAmount] = useState(null);
  // idk what's this at the moment
  // const [selectedParams, setSelectedParams] = useState({});

  return (
    <SWRConfig value={config.swr}>
      <div className="App">
        <h1 className="app-title"> MENU </h1>

        <div className="contenitore">
          <Symbols onChange={setSelectedSymbol} selectedSymbol={selectedSymbol} />
          <TradingPair onChange={setAmount} selectSymbol={setSelectedSymbol}/>
          <Amount amount={amount} onChange={setAmount} />
          <OrderType type={orderType} onChange={setOrderType} />
        </div>

        <CreateOrder selectedSymbol={selectedSymbol} orderType={orderType} amount={amount} />

        <Positions />
      </div>
    </SWRConfig>
  );
};

export default App;
