import usePosition from '../../hooks/usePositions';
import useClosePosition from '../../hooks/useClosePosition';
import config from '../../config';

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
                <p>{position.side}</p>
                <p>{position.symbol}</p>
                <p>Size: {position.notional}</p>
                <p>EntryPrice: {position.entryPrice}</p>
                <div className='reduce-container'>
                  <button 
                    className="reduce-button"
                    onClick={() => closePosition(position.symbol, position.side, position.contracts, config.smallReduce)}
                  >
                    20
                  </button>
                  <button 
                    className="reduce-button"
                    onClick={() => closePosition(position.symbol, position.side, position.contracts, config.midReduce)}
                  >
                    33
                  </button>
                  <button 
                    className="reduce-button"
                    onClick={() => closePosition(position.symbol, position.side, position.contracts, config.bigReduce)}
                  >
                    50
                  </button>
                </div>
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
