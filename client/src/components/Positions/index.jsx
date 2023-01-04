import usePosition from '../../hooks/usePositions';
import useClosePosition from '../../hooks/useClosePosition';

const Positions = () => {
  const { data: positions, isLoading } = usePosition();
  const { closePosition } = useClosePosition();

  return (
    <div className="list-wrapper">
      {!isLoading
        ? positions.map((position, index) => {
            console.log(position, 'in arr');
            return (
              <div key={index} className="ordini">
                <p>Symbol: {position.symbol}</p>
                <p>Contract size: {position.contractSize}</p>
                <p>Entry price: {position.entryPrice}</p>
                <p>Entry contracts: {position.contracts}</p>
                <button
                  className="close-button"
                  onClick={() => closePosition(position.symbol, position.side, position.contracts)}
                >
                  X
                </button>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Positions;
