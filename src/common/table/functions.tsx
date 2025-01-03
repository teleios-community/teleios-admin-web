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
    return value;
  }

  // Data check
  if (['created_at', 'used_at', 'expires_at'].includes(headerName)) {
    return new Date(value).toLocaleDateString('en-GB');
    // return new Date(value).toLocaleDateString('en-GB').split('/').join('-');
  }

  // Array check
  if (Array.isArray(value)) {
    return <span className='capitalize'>{value.join(', ')}</span>;
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
    return (
      <span
        className='capitalize'
        style={{
          color,
        }}
      >
        {value}
      </span>
    );
  }

  // Menu ID check
  if (headerName === 'tableAction') {
    return <TableMenu data={data} menuItems={menuItems} />;
  }

  // image check
  if (['badge'].includes(headerName)) {
    return (
      <img
        src={value}
        alt=''
        className='w-[50px] h-[50px] rounded-full object-cover'
        width={100}
        height={100}
        loading='lazy'
      />
    );
  }

  return <span className='capitalize'>{value?.toString() || '-'}</span>;
};
