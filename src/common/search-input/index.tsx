import { SearchNormal1 } from 'iconsax-react';

const SearchInput = ({
  onChange,
  value,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  return (
    <div className='flex gap-3 items-center p-3 rounded-lg border border-[#E4E4E4] bg-white w-full'>
      <SearchNormal1 color='#959595' />
      <input
        type='search'
        className='w-full !outline-none !border-none'
        value={value}
        placeholder={placeholder ?? 'Search'}
        onChange={(e) => onChange(e.target.value)}
        name='no-autofill-search' // uncommon name
        autoComplete='new-password'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
      />
    </div>
  );
};

export default SearchInput;
