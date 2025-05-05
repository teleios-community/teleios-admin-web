import { FormikProps } from 'formik';
import { Eye, EyeSlash } from 'iconsax-react';
import { useState } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  formik?: FormikProps<any>;
  name: string;
  className?: string;
  hint?: string;
  useFormik?: boolean;
  showError?: boolean;
  error?: string;
  label?: string;
}

function LabelInput({
  formik,
  name,
  className = '',
  hint,
  useFormik = true,
  showError = false,
  error,
  label,
  ...rest
}: Props) {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordReveal = () => {
    const element = document.getElementById(name) as HTMLInputElement | null;
    if (element) {
      if (element.type === 'password') {
        element.type = 'text';
        setPasswordShown(true);
      } else {
        element.type = 'password';
        setPasswordShown(false);
      }
    }
  };

  return (
    <div className={'inputContainer ' + className}>
      {useFormik ? (
        <>
          {label && (
            <label
              htmlFor={name}
              className={`${
                formik?.touched?.[name] && formik?.errors?.[name] ? 'errorText' : ''
              }`}
            >
              {label}
              {rest.required && <span>*</span>}
            </label>
          )}
          <div className='relative'>
            <input
              id={name}
              name={name}
              value={formik?.values?.[name] ?? ''}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              className={
                formik?.touched?.[name] && formik?.errors?.[name] ? 'inputError' : ''
              }
              {...rest}
            />
            {rest.type === 'password' && (
              <div
                className='absolute bottom-3 right-3 cursor-pointer'
                onClick={togglePasswordReveal}
              >
                {passwordShown ? (
                  <EyeSlash size={22} color='#191A2F' />
                ) : (
                  <Eye size={22} color='#191A2F' />
                )}
              </div>
            )}
          </div>
          {hint && <div className='text-sm text-[#667085]'>{hint}</div>}

          {formik?.touched?.[name] && formik?.errors?.[name] && (
            <div className='error'>{String(formik.errors[name])}</div>
          )}
        </>
      ) : (
        <>
          {label && (
            <label htmlFor={name} className={`${showError ? 'errorText' : ''}`}>
              {label}
              {rest.required && <span>*</span>}
            </label>
          )}
          <div className='relative'>
            <input id={name} name={name} {...rest} />

            {rest.type === 'password' && (
              <div
                className='absolute bottom-3 right-3 cursor-pointer'
                onClick={togglePasswordReveal}
              >
                {passwordShown ? (
                  <EyeSlash size={22} color='#191A2F' />
                ) : (
                  <Eye size={22} color='#191A2F' />
                )}
              </div>
            )}
          </div>
          {hint && <div className='text-sm text-[#667085]'>{hint}</div>}

          {showError && <div className='error'>{error}</div>}
        </>
      )}
    </div>
  );
}

export default LabelInput;
