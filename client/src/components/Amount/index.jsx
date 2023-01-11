import { useMemo } from 'react';

const Amount = ({ amount, onChange }) => {
  const formattedAmount = useMemo(() => amount / 1000 + '.000$', [amount]);

  return (
    <div className="blocco">
      <div className="selection"> {formattedAmount || 'amount'} </div>

      <div className="option-amount">
        <button className="button-opt" onClick={() => onChange(25000)}>
          25000
        </button>
        <button className="button-opt" onClick={() => onChange(35000)}>
          35000
        </button>
      </div>
      <div className="option-amount">
        <button className="button-opt" onClick={() => onChange(50000)}>
          50000
        </button>
        <button className="button-opt" onClick={() => onChange(90000)}>
          90000
        </button>
      </div>
    </div>
  );
};

export default Amount;
