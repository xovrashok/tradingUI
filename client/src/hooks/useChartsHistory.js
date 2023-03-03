import { useAllGraphsRequest } from './requests';

const useChartHistory = (props) => {
  const { selectedSymbol } = props;
  const symFetch = selectedSymbol ? selectedSymbol.label.replace(/[^a-z]/gi, '') : 'BTCUSDT';
  const urlParams = `symbol=${symFetch}&interval=1s`;
  const { data, error, isLoading, mutate } = useAllGraphsRequest(urlParams);

  return {
    chartData: data,
    error,
    chartIsLoading: isLoading,
    mutate,
  };
};

export default useChartHistory;
