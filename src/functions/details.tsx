import React from 'react';

export function formatDetailsValue<T>(value: T): React.ReactNode {
  if (typeof value === 'string') {
    // Check if it's a valid date string
    if (!isNaN(Date.parse(value))) {
      return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
      }).format(new Date(value));
    }

    // Check if it's a URL
    if (/^https?:\/\/\S+$/i.test(value)) {
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

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (value === null || value === undefined) {
    return '-';
  }

  // Fallback for objects or arrays
  return JSON.stringify(value);
}
