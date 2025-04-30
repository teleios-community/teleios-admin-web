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
    <div className='flex gap-3 items-center p-3 rounded-lg border border-[#E4E4E4] bg-white'>
      <SearchNormal1 color='#959595' />
      <input
        type='url'
        className='w-full !outline-none !border-none'
        value={value}
        placeholder={placeholder ?? 'Search'}
        name='search-input'
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
