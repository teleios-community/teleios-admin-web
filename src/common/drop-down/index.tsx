import Select, { GroupBase, Props, StylesConfig } from 'react-select';

type SelectProps = {
  label?: string;
  required?: boolean;
  error?: string;
  containerWidth?: string;
  containerStyle?: React.CSSProperties;
  name: string;
  placeholder?: string;
  className?: string;
  isMulti?: boolean;
  formik?: any;
  showError?: boolean;
  useFormik?: boolean;
  onChange?: (e: any) => void;
};

const Dropdown = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  containerStyle = {},
  label,
  name,
  placeholder = 'Select Value',
  className = '',
  formik,
  error,
  isMulti,
  useFormik = true,
  onChange,
  showError,
  ...props
}: Props<Option, IsMulti, Group> & SelectProps) => {
  const selectStyles: StylesConfig<Option, IsMulti, Group> = {
    control: (base) => {
      return {
        ...base,
        borderRadius: 8,
        width: '100%',
        color: '#1D2B31',
        minHeight: 48,
        paddingLeft: 3,
        fontSize: 16,
        ...containerStyle,
      };
    },

    container: (base) => ({
      ...base,
      fontFamily: 'var(--font-primary)',
      '& input': {
        font: 'inherit',
      },
    }),

    indicatorSeparator: () => ({
      display: 'none',
    }),

    placeholder: (provided) => ({
      ...provided,
      color: '#667085',
      fontWeight: 400,
    }),
  };
  return (
    <div className={'w-full flex flex-col gap-[5px] !text-left ' + className}>
      {useFormik ? (
        <>
          {label && (
            <label
              htmlFor={name}
              className={`text-[#344054] font-medium flex text-sm gap-[2px] items-center ${
                formik.touched[name] && formik.errors[name] ? 'errorText' : ''
              }`}
            >
              {label}
              {props.required && <span>*</span>}
            </label>
          )}
          <Select
            onChange={(e: any) => {
              formik.setFieldValue(name, e ? (isMulti ? e : e.value) : undefined);
            }}
            onBlur={() => {
              formik.setFieldTouched(name, true);
            }}
            id={name}
            styles={selectStyles}
            placeholder={placeholder}
            escapeClearsValue
            isMulti={isMulti}
            backspaceRemovesValue
            noOptionsMessage={() => 'No option found at the moment'}
            {...props}
          />
          {formik.touched[name] && formik.errors[name] && (
            <div className='error'>{formik.errors[name]}</div>
          )}
        </>
      ) : (
        <>
          <label
            htmlFor={name}
            className={`dark:text-white ${showError ? 'errorText' : ''}`}
          >
            {label}
          </label>

          <Select
            onChange={onChange}
            id={name}
            styles={selectStyles}
            isClearable
            placeholder={placeholder}
            escapeClearsValue
            backspaceRemovesValue
            noOptionsMessage={() => 'No option found at the moment'}
            isMulti={isMulti}
            {...props}
          />
          {showError && <div className='error'>{error}</div>}
        </>
      )}
    </div>
  );
};

export default Dropdown;
