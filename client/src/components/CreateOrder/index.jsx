import useOrders from '../../hooks/useOrders';
import usePosition from '../../hooks/usePositions';

const CreateOrder = ({ selectedSymbol, orderType, amount }) => {
  const { createLongOrder, createShortOrder } = useOrders();
  const { refetch } = usePosition();

  // Event handles
  const handleLongClick = () => createLongOrder(selectedSymbol, orderType, amount);
  const handleShortClick = () => createShortOrder(selectedSymbol, orderType, amount);

  return (
    <>
      <div className="buttons">
        <button className="long" onClick={handleLongClick}>
          Long
        </button>
        <button className="short" onClick={handleShortClick}>
          Short
        </button>
      </div>
      <button className="refetch-button" onClick={() => refetch()}>
        Refresh
      </button>
    </>
  );
};

export default CreateOrder;
