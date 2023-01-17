import usePosition from '../../hooks/usePositions';
import useClosePosition from '../../hooks/useClosePosition';
import config from '../../config';

const Positions = () => {
  const { data: positions, isLoading, refetch } = usePosition();
  const { closePosition } = useClosePosition();

  return (
    <>
      <button 
        className="refetch-button" 
        onClick={() => refetch()}
      >
        &#8634;
      </button>
      <div className="list-wrapper">
      {!isLoading ? (
        <>
          <div className="ordini">
            <div>Side</div>
            <div>Symbol</div>
            <div>Size</div>
            <div>Entry Price</div>
            <div>Reduce</div>
            <div>Close</div>
          </div>
          {positions.map((position, index) => {
            console.log(position, 'in arr');
            return (
              <div key={index} className="container">
                <div>
                  {position.side === 'long' ? <div className="green-circle" /> : <div className="red-circle" />}
                </div>
                <p>{position.symbol}</p>
                <p>{position.notional.toFixed(2)}</p>
                <p>{position.entryPrice.toFixed(2)}</p>
                <div className="reduce-container">
                  <button
                    className="reduce-button"
                    onClick={() =>
                      closePosition(position.symbol, position.side, position.contracts, config.smallReduce)
                    }
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
          })}
        </>
      ) : null}
    </div>
    </>
  );
};

export default Positions;
