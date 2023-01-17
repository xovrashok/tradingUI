import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import config from '../config';

const useSocket = () => {
  const [coins, setCoins] = useState('');

  const { lastMessage } = useWebSocket(config.wsUri, {
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 100,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (lastMessage) {
      const message = JSON.parse(lastMessage?.data);
      const title = message?.actions ? message?.actions[1]?.title : '';

      if (title && title?.length > 0) {
        const newTitle = title.replace(/\/.*/, '/USDT');
        setCoins(newTitle);
      }
    }
  }, [lastMessage]);

  return { coins };
};

export default useSocket;
