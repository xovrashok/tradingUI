import SymbolsDropdown from './SymbolsDropdown';

const Symbols = ({ onChange, selectedSymbol }) => {
  return (
    <div className="blocco">
      <div className="selection" id="symbol" name="symbol">
        {selectedSymbol ? selectedSymbol.label : 'symbol'}
      </div>
      <div className="basic">
        <SymbolsDropdown onChange={onChange} />
      </div>
    </div>
  );
};

export default Symbols;
