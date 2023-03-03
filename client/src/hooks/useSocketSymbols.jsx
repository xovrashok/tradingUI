import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const useSocketSymbols = (selectedSymbol) => {
  const [trade, setTrade] = useState({});
  const symbSocket = selectedSymbol ? selectedSymbol.label.replace(/[^a-z]/gi, '').toLowerCase() : 'btcusdt';
  const { lastMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbSocket}@kline_1s`, {
    shouldReconnect: (closeEvent) => false,
    reconnectAttempts: 0,
    reconnectInterval: 30,
    onReconnectStop: 2,
  });

  useEffect(() => {
    if (lastMessage) {
      const message = JSON.parse(lastMessage?.data);
      const time = message.E;
      const value = Number(message.k.l);

      const array = { time, value };

      setTrade(array);
    }
  }, [lastMessage]);

  return { trade };
};

export default useSocketSymbols;
