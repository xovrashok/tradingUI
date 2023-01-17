import { useState, useEffect } from 'react';
import useSocket from '../../hooks/useSocket';
import config from '../../config';
import useSymbols from '../../hooks/useSymbols';
import useSnackbar from '../../hooks/useSnackbar';

const TradingPair = ({ onChange, selectSymbol }) => {
  const { coins } = useSocket();
  const { data: symbols } = useSymbols();
  const { openErrorSnackbar } = useSnackbar();
  const [selectedCoins, setSelectedCoins] = useState(['', '']);

  useEffect(() => {
    setSelectedCoins((prevState) => [coins, prevState[0]]);
  }, [coins]);

  const isCoinExistInSymbols = (coin) =>
    !!symbols.find((symbol) => symbol.label.replace(/[^a-z]/gi, '') === coin.replace(/[^a-z]/gi, ''));

  const getLinkToBinance = (symbol) => config.binLinkTest + symbol.replace(/[^a-z]/gi, '');

  return (
    <div className="blocco trading">
      {selectedCoins.map((coin, index) => {
        return (
          <a
            role="button"
            className="selection"
            id="symbol"
            key={coin + index}
            onClick={() => {
              if (isCoinExistInSymbols(coin)) {
                window.open(getLinkToBinance(coin), '_blank');
                selectSymbol({ label: coin, value: coin });
              } else {
                //Some symbols exist in Binance but not exist in symbol array
                openErrorSnackbar('This coin does not exist in your symbol selection');
              }
            }}
          >
            {coin}
          </a>
        );
      })}

      <input type="number" onChange={(event) => onChange(event?.target?.value * 1000)} />
    </div>
  );
};

export default TradingPair;
