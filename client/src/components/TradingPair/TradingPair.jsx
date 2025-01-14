import { useState, useEffect } from 'react';
import useSocket from '../../hooks/useSocket';
import useSymbols from '../../hooks/useSymbols';
import useSnackbar from '../../hooks/useSnackbar';

const TradingPair = ({ onChange, selectSymbol }) => {
  const { coins } = useSocket();
  const { data: symbols } = useSymbols();
  const { openErrorSnackbar } = useSnackbar();
  const [selectedCoins, setSelectedCoins] = useState(['', '']);

  useEffect(() => {
    setSelectedCoins((prevState) => [coins, prevState[0], prevState[1]]);
  }, [coins]);

  const isCoinExistInSymbols = (coin) =>
    !!symbols.find((symbol) => symbol.label.replace(/[^a-z0-9]/gi, '') === coin.replace(/[^a-z0-9]/gi, ''));

  const coinWithOthersQuoteCurr = (coin) => {
    const newCoin = coin.replace(/USDT/gi, 'BUSD');
    symbols.find((symbol) => symbol.label === newCoin);
  }

  

  return (
    <div className="blocco trading">
      {selectedCoins.map((coin, index) => {
        return (
          <button
            className="selection1"
            id="symbol"
            key={coin + index}
            onClick={() => {
              if (isCoinExistInSymbols(coin)) { 
                return selectSymbol({ label: coin, value: coin }); 
              } if (coinWithOthersQuoteCurr(coin)) { 
                const newCoin = coin.replace(/USDT/gi, 'BUSD'); 
                return selectSymbol({ label: newCoin, value: newCoin }); 
              } else { openErrorSnackbar('This coin does not exist in your symbol selection'); }
            }}
          >
            {coin}
          </button>
        );
      })}

      <input 
        className="input-amount"
        type="number" 
        onChange={(event) => onChange(event?.target?.value * 1000)} 
      />
    </div>
  );
};

export default TradingPair;
