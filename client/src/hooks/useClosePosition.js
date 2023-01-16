import { usePostRequest } from './requests';
import { ORDER_SIDE, ORDER_SIDE_CLOSE } from '../constants';
import useSnackbar from './useSnackbar';
import usePositions from './usePositions';

const useClosePosition = () => {
  const { trigger, data, error } = usePostRequest('/position');
  const { openSnackbar, openErrorSnackbar } = useSnackbar();
  const { refetch: refetchPositions } = usePositions();

  const closePosition = async (symbol, side, contracts, reduction = 1) => {
    try {
      const type = 'market';
      const sideClose = side === ORDER_SIDE.LONG ? ORDER_SIDE_CLOSE.SELL : ORDER_SIDE_CLOSE.BUY;

      trigger({
        symbol,
        side,
        contracts,
        type,
        sideClose,
        reduction,
      });

      openSnackbar('Order has been closed successfully..');
      await refetchPositions();
    } catch (error) {
      openErrorSnackbar(`Error: ${error.message}`);
    }
  };

  return {
    data,
    error,
    trigger,
    closePosition,
  };
};

export default useClosePosition;
