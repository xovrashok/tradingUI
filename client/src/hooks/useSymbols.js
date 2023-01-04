import { useGetRequest } from './requests';

const useSymbols = () => {
  const { data, error, isLoading } = useGetRequest('/markets');

  return {
    data,
    error,
    isLoading,
  };
};

export default useSymbols;
