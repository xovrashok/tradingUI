import React, { useState, useEffect } from 'react';


const useSocket = () => {
 const [coins, setCoins] = useState([]);

  let wsUri = "wss://www.madnews.io/ws";
  let websocket = new WebSocket(wsUri);
  let coinArr = ['', ''];

  

  function runWebSocket() {
    websocket.onopen = function(evt) {onOpen(evt)};
    websocket.onclose = function(evt) {onClose(evt)};
    websocket.onmessage = function(evt) {onMessage(evt)};
    websocket.onerror = function(evt) {onError(evt)};
  }

  function onOpen(evt) {
    console.log("CONNECTED");
  }

  function onClose(evt) {
    console.log("Websocket DISCONNECTED");
    runWebSocket();
  }

  function onMessage(evt) { 
    const message = JSON.parse(evt.data);
    if (message.actions && message.actions[1]['title'] !== undefined) {
      console.log(message.actions[1]['title']);
      coinArr.unshift(message.actions[1]['title']);
      coinArr.pop();
      console.log(coinArr);
      setCoins(coinArr);
    }
  }

  function onError(evt) {
    console.log('error' + evt.data);
  }

  useEffect(() => {
    runWebSocket();
  }, [])
    


  return (
    <div>
      {coins}
    </div>
  );
}

export default useSocket;
