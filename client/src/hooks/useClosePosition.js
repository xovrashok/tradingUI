import { usePostRequest } from './requests';
import { ORDER_SIDE, ORDER_SIDE_CLOSE } from '../constants';

const useClosePosition = () => {
  const { trigger, data, error } = usePostRequest('/position');

  const closePosition = (symbol, side, contracts, reduction = 1) => {
    const type = 'market';
    const sideClose = side === ORDER_SIDE.LONG ? ORDER_SIDE_CLOSE.SELL : ORDER_SIDE_CLOSE.BUY;

    trigger({
      symbol,
      side,
      contracts,
      type,
      sideClose,
      reduction
    });
  };

  return {
    data,
    error,
    trigger,
    closePosition,
  };
};

export default useClosePosition;
