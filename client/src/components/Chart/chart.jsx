import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import useChartHistory from '../../hooks/useChartsHistory';
import useSocketSymbols from '../../hooks/useSocketSymbols';
import Switcher from '../Switcher';

const ChartComponent = (props) => {
  const {
    colors: {
      background = { type: 'solid', color: 'transparent' },
      lineColor = '#29f1ff',
      textColor = 'grey',
      areaTopColor = '#29f1ff',
      areaBottomColor = 'rgba(7, 7, 7, 0.08)',
    } = {},
    selectedSymbol,
  } = props;
  const chartContainerRef = useRef();
  const [interval, setInterval] = useState('1s');
  const { chartData } = useChartHistory(selectedSymbol, interval);
  const { trade } = useSocketSymbols(selectedSymbol, interval);
  const [results, setResults] = useState([]);
  const [chartInstance, setChartInstance] = useState({});
  const [chartInitialize, setChartInitialize] = useState({});

  useEffect(() => {
    if (!trade?.time) {
      return;
    }
    chartInstance.update(trade);
    setResults((prevState) => {
      prevState[prevState.length - 1] = trade;
      return [...prevState];
    });
  }, [trade]);

  const newChartData = () => {
    return chartData.map((cart) => ({ time: cart[0] / 1000 + 3600, value: Number(cart[1]) }));
  };

  useEffect(() => {
    if (!chartData || !chartData[0]) {
      return;
    }

    const formattedChartData = newChartData();
    setResults((prevState) => [...prevState, ...chartData]);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background,
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

    setChartInitialize(chart);

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      lineWidth: 1,
    });
    setChartInstance(newSeries);

    newSeries.setData(formattedChartData);
    newSeries.applyOptions({
      priceFormat: {
        precision: formattedChartData[0].value > 1 ? 2 : 8,
        minMove: formattedChartData[0].value > 1 ? 0.01 : 0.00000001,
      },
    });
    chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [chartData]);

  return (
    <>
      <div>
        <Switcher interval={interval || '1s'} setInterval={setInterval} />
        <div ref={chartContainerRef} />
      </div>
    </>
  );
};

export default ChartComponent;
