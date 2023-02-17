import { useState } from 'react';
import { SWRConfig } from 'swr';

import config from './config';
import Symbols from './components/Symbols';
import OrderType from './components/OrderType';
import Amount from './components/Amount';
import Bags from './components/Bags';
import Positions from './components/Positions';
import ReLoader from './components/ReLoader';
import CreateOrder from './components/CreateOrder';
import TradingPair from './components/TradingPair/TradingPair';

import './App.css';

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [amount, setAmount] = useState(null);

  return (
    <SWRConfig value={config.swr}>
      <div className="App">
        <h1 className="app-title"> MENU </h1>

        <div className="contenitore-top">
          <Symbols onChange={setSelectedSymbol} selectedSymbol={selectedSymbol} />
          <TradingPair onChange={setAmount} selectSymbol={setSelectedSymbol}/>
        </div>
        <div className="contenitore">
          <Amount amount={amount} onChange={setAmount} />
          <OrderType type={orderType} onChange={setOrderType} />
        </div>

        <CreateOrder selectedSymbol={selectedSymbol} orderType={orderType} amount={amount} />

        <ReLoader />
        <Positions />
        <Bags />
      </div>
    </SWRConfig>
  );
};

export default App;
