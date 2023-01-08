const config = {
  // TODO: Use from environment variable
  apiEndpoint: 'http://localhost:8000',
  defaultAmount: '1000',
  smallReduce: 0.2,
  midReduce: 0.33,
  bigReduce: 0.5,
  swr: {
    revalidateOnFocus: false,
  },
};

export default config;
