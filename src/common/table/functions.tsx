import {
  convertSnakeCaseToPascal,
  formatQuantity,
} from '../../functions/stringManipulations';
import TableMenu from './TableMenu';
import { menuItemType } from './data';

export const formatTableValue = ({
  value,
  headerName,
  menuItems,
  data,
}: {
  value: string;
  headerName: string;
  menuItems?: menuItemType[];
  data: any;
}) => {
  // Boolean Check
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  // Capitalize Check
  if (['email', 'userName', 'content'].includes(headerName)) {
    // should not be capitalized
    return value ?? '-';
  }

  // Date check
  if (['created_at', 'used_at', 'expires_at', 'updated_at'].includes(headerName)) {
    return value ? new Date(value).toLocaleDateString('en-GB') : '-';
    // return new Date(value).toLocaleDateString('en-GB').split('/').join('-');
  }

  // URL
  if (['video_url'].includes(headerName)) {
    return value ? (
      <a href={value} target='_blank' rel='noreferrer' className='underline'>
        {value}
      </a>
    ) : (
      '-'
    );
  }

  // Array check
  if (Array.isArray(value)) {
    return value ? <span className='capitalize'>{value.join(', ')}</span> : '-';
  }

  // Object check
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return (
      <span className='capitalize'>
        {
          (value['fullname'] ||
            value['name'] ||
            value['userName'] ||
            value['firstName'] ||
            Object.values(value)[0]) as string
        }
      </span>
    );
  }

  // Snake case check
  if (typeof value === 'string' && value.includes('_')) {
    return value ? convertSnakeCaseToPascal(value) : '-';
  }

  // Status Check
  if (headerName === 'status') {
    let color = '';

    switch (value) {
      case 'open':
        color = 'green';
        break;
      case 'completed':
        color = 'green';
        break;
      case 'pending':
        color = 'orange';
        break;
      case 'closed':
        color = 'red';
        break;
      case 'cancelled':
        color = 'red';
        break;

      default:
        color = 'black';
        break;
    }
    return value ? (
      <span
        className='capitalize'
        style={{
          color,
        }}
      >
        {value}
      </span>
    ) : (
      '-'
    );
  }

  // Menu ID check
  if (headerName === 'tableAction') {
    return <TableMenu data={data} menuItems={menuItems} />;
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

  if (typeof value === 'number') {
    return formatQuantity(value);
  }

  // image check
  if (['badge'].includes(headerName)) {
    return value ? (
      <img
        src={value}
        alt=''
        className='w-[50px] h-[50px] rounded-full object-cover'
        width={100}
        height={100}
        loading='lazy'
      />
    ) : (
      <div className='w-[50px] h-[50px] rounded-full bg-gray-600' />
    );
  }

  return <span className='capitalize'>{value?.toString() || '-'}</span>;
};
