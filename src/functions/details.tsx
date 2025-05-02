import React from 'react';
import { convertSnakeCaseToPascal } from './stringManipulations';

/** Helpers **/
const isDateString = (s: string): boolean => !isNaN(Date.parse(s));
const formatDate = (s: string) =>
  new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(s));

const isUrl = (s: string): boolean => /^https?:\/\/\S+$/i.test(s);

/**
 * Renders any value: primitives, arrays, objects (recursive).
 */
function renderValue(value: unknown, depth = 0): React.ReactNode {
  // Primitives
  if (value == null) return <span className='text-gray-500'>-</span>;

  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'string') {
    // date?
    if (isDateString(value)) {
      return formatDate(value);
    }
    // url?
    if (isUrl(value)) {
      return (
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline break-all'
        >
          {value}
        </a>
      );
    }
    return value;
  }

  // Arrays
  if (Array.isArray(value)) {
    // avoid infinite flattening; flatten one level per recursion
    const items = depth < 3 ? value.flat() : value;
    return items.length ? (
      <div className='flex flex-col gap-5'>
        {items.map((v, i) => (
          <div key={i}>{renderValue(v, depth + 1)}</div>
        ))}
      </div>
    ) : (
      <span className='text-gray-500'>-</span>
    );
  }

  // Objects
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    return (
      <div className='flex flex-col gap-2 pb-2 border-b'>
        {Object.entries(obj).map(([k, v]) => (
          <div key={k} className='text-sm '>
            <span className='text-primary font-semibold'>
              {convertSnakeCaseToPascal(k)}
            </span>
            {': '}
            <span className='text-gray-800 '>{renderValue(v, depth + 1)}</span>
          </div>
        ))}
      </div>
    );
  }

  // Fallback
  return String(value);
}

/**
 * Public API
 */
export function formatDetailsValue(value: unknown): React.ReactNode {
  return <>{renderValue(value)}</>;
}
