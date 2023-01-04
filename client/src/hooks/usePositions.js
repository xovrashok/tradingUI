import { useGetRequest } from './requests';

const usePositions = () => {
  const { data, error, isLoading, mutate } = useGetRequest('/position', {
    refreshInterval: 3000,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
    refetch() {
      return mutate();
    },
  };
};

export default usePositions;
