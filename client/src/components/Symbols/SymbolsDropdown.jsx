import Select from 'react-select';

import useSymbols from '../../hooks/useSymbols';

const SymbolsDropdown = ({ onChange }) => {
  const { data: symbols } = useSymbols();

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      onChange={onChange}
      options={symbols}
      name="color"
      isSearchable="true"
    />
  );
};

export default SymbolsDropdown;
