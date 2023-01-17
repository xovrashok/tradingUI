import SymbolsDropdown from './SymbolsDropdown';
import config from '../../config';

const Symbols = ({ onChange, selectedSymbol }) => {
  //change to config.binLinkPRD for production link
  const getLinkToBinance = selectedSymbol ? config.binLinkPRD + selectedSymbol.label.replace(/[^a-z]/gi, '') : '';
  return (
    <div className="blocco symbols">
      <div className="selection-wrapper">
        <div className="selectionSy" id="symbol" name="symbol">
          {selectedSymbol ? selectedSymbol.label : 'symbol'}
        </div>
        <a
          role="button"
          style={!selectedSymbol ? { pointerEvents: 'none' } : null}
          href={getLinkToBinance}
          target="_blank"
          className={`bin-link ${!selectedSymbol ? 'is-disable' : ''}`}
          rel="noreferrer"
        >
          <img 
            className='bin-logo'
            width={24} 
            height={24} 
            src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" 
            alt="" 
          />
        </a>
      </div>
      <div className="basic">
        <SymbolsDropdown onChange={onChange} selected={selectedSymbol} />
      </div>
    </div>
  );
};

export default Symbols;
