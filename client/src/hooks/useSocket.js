import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import config from '../config';

const useSocket = () => {
  const [coins, setCoins] = useState('');

  const { lastMessage } = useWebSocket(config.wsUri);

  useEffect(() => {
    if (lastMessage) {
      const message = JSON.parse(lastMessage?.data);
      const title = message?.actions ? message?.actions[1]?.title : '';

      if (title.length > 0) {
        setCoins(title);
      }
    }
  }, [lastMessage]);

  return { coins };
};

export default useSocket;
