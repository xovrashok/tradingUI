const config = {
  // TODO: Use from environment variable
  apiEndpoint: 'http://localhost:8000',
  wsUri: 'wss://www.madnews.io/ws',
  defaultAmount: 'amount',
  smallReduce: 0.2,
  midReduce: 0.33,
  bigReduce: 0.5,
  swr: {
    revalidateOnFocus: false,
  },
  binFutureLinkPRD: 'https://binance.com/en/futures/',
  binSpotLinkPRD: 'https://www.binance.com/en/trade/',
  binLinkTest: 'https://testnet.binancefuture.com/en/futures/',
};

export default config;