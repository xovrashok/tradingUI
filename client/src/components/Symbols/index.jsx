import SymbolsDropdown from './SymbolsDropdown';
import config from '../../config';

const Symbols = ({ onChange, selectedSymbol }) => {
  //change to config.binLinkPRD for production link
  const getLinkToBinance = selectedSymbol ? config.binLinkTest + selectedSymbol.label.replace(/[^a-z]/gi, '') : '';
  return (
    <div className="blocco symbols">
      <div className="selection-wrapper">
        <div className="selection symbol-btn" id="symbol" name="symbol">
          {selectedSymbol ? selectedSymbol.label : 'symbol'}
        </div>
        <a
          role="button"
          style={!selectedSymbol ? { pointerEvents: 'none' } : null}
          href={getLinkToBinance}
          target="_blank"
          className={`bin-link ${!selectedSymbol ? 'is-disable' : ''}`}
        >
          <img width={30} height={30} src="https://cdn.pixabay.com/photo/2021/04/30/16/47/bnb-6219388_640.png" alt="" />
        </a>
      </div>
      <div className="basic">
        <SymbolsDropdown onChange={onChange} selected={selectedSymbol} />
      </div>
    </div>
  );
};

export default Symbols;
