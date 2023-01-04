import { ORDER_TYPE } from '../../constants';

const OrderType = ({ type, onChange }) => {
  return (
    <div className="blocco">
      <div className="selection"> {type || 'type'} </div>
      <div className="option-type">
        <button className="button-opt" onClick={() => onChange(ORDER_TYPE.MARKET)}>
          market
        </button>
        <button className="button-opt" onClick={() => onChange(ORDER_TYPE.LIMIT)}>
          limit
        </button>
      </div>
    </div>
  );
};

export default OrderType;
