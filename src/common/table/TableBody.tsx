import React from 'react';
import { menuItemType, rowType } from './data';
import { formatTableValue } from './functions';

function TableBody({
  data,
  tableHeaders,
  menuItems,
  bodyStyle,
}: {
  data: any[];
  tableHeaders: string[];
  menuItems?: menuItemType[];
  bodyStyle?: React.CSSProperties;
}) {
  const tableRows: rowType = React.useMemo(
    () =>
      data?.map((data: any) => ({
        row: tableHeaders.map((header) => ({
          value: data[header],
          headerName: header,
        })),
      })),
    [data, tableHeaders]
  );

  return (
    <tbody className='[&>*:last-child]:border-none text-[#667085] '>
      {tableRows.map(({ row }, mainIndex) => (
        <tr
          key={mainIndex}
          className={
            mainIndex % 2 === 0
              ? 'bg-[#FAFAFA] px-6 py-10  hover:bg-[#F4F5F6] '
              : 'bg-white px-6 py-10  hover:bg-[#F4F5F6]'
          }
        >
          {row.map((item, index) => (
            <td
              className='px-6 py-6 text-sm align-middle'
              key={index}
              style={{ textAlign: index === 0 ? 'left' : 'center', ...bodyStyle }}
            >
              <div className='line-clamp-2'>
                {formatTableValue({
                  value: item.value,
                  headerName: item.headerName,
                  menuItems,
                  data: data[mainIndex],
                })}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
