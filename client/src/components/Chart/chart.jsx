import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import useChartHistory from '../../hooks/useChartsHistory';
import useSocketSymbols from '../../hooks/useSocketSymbols';

const ChartComponent = (props) => {
  const {
    colors: {
      backgroundColor = 'transparent',
      lineColor = '#29f1ff',
      textColor = 'grey',
      areaTopColor = '#29f1ff',
      areaBottomColor = 'rgba(7, 7, 7, 0.08)',
    } = {},
    selectedSymbol,
  } = props;
  const chartContainerRef = useRef();
  const { chartData } = useChartHistory(selectedSymbol);
  const { trade } = useSocketSymbols(selectedSymbol);
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
    return chartData.map((cart) => {
      return {
        time: Number(cart[0]),
        value: Number(cart[1]),
      };
    });
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
        precision: 8,
        minMove: 0.00000001,
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
        <div ref={chartContainerRef} />
      </div>
    </>
  );
};

export default ChartComponent;
