import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const ChartComponent = (props) => {
	const {
		colors: {
			backgroundColor = 'transparent',
			lineColor = '#29f1ff',
			textColor = 'grey',
			areaTopColor = '#29f1ff',
			areaBottomColor = 'rgba(7, 7, 7, 0.08)',
		} = {},
	} = props;

	const { selectedSymbol } = props;
	const symbSocket = selectedSymbol ? selectedSymbol.label.replace(/[^a-z]/gi, '').toLowerCase() : 'btcusdt';
	const symFetch = selectedSymbol ? selectedSymbol.label.replace(/[^a-z]/gi, '') : 'BTCUSDT';
	const { lastMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbSocket}@kline_1s`);

	const [ data, setData ] = useState([]);
	const [ next, setNext ] = useState({});

	const chartContainerRef = useRef();


	useEffect(() => {
		fetch(`https://api.binance.com/api/v1/klines?symbol=${symFetch}&interval=1m`)
		.then((response) =>response.json())
    .then(function (response) {
    	let tickArr = [];

    	for (let i= 200; i < 500; i++) {
				let tickers = { time: '', value:'' };
      	tickers.time = (response[i][0] / 1000) + 3600 ;
				tickers.value = response[i][4];
      	tickArr.push(tickers)
    	}
			return tickArr; 
  	})
		.then((tickArr) => setData(tickArr));
	}, [selectedSymbol]);
	

	useEffect(() => {
    if (lastMessage) {
      const messageObject = JSON.parse(lastMessage?.data);
			let tickers = { time: '', value:'' };
			tickers.time = (messageObject.E / 1000) + 3600;
			tickers.value = Number(messageObject.k.l);
      setNext(tickers)
    }  
  }, [lastMessage]);
	
	
	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					backgroundColor,
					textColor,
					lineColor,
				},
				grid: {
        	vertLines: {
            visible: false,
        	},
        	horzLines: {
            color: 'rgba(42, 46, 57, 0.5)',
        	},
    		},
				rightPriceScale: {
        	borderVisible: false,
    		},
    		timeScale: {
        	borderVisible: false,
					timeVisible: true,
					secondsVisible: true,
					rightBarStaysOnScroll: true,
    		},
				width: chartContainerRef.current.clientWidth,
				height: 350,
			});

			chart.timeScale().fitContent();

			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor, lineWidth: 1 });
			//const newSeries = chart.addCandlestickSeries({ upColor: '#29f1ff', downColor: 'white', borderVisible: false, wickUpColor: '#29f1ff', wickDownColor: '#808080' });
			newSeries.setData(data);
		  //newSeries.update(next);
		
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, next, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};


export default ChartComponent;

