import React from 'react';

function TableHeader({
  tableHeaders,
  headerStyle,
}: {
  tableHeaders: string[];
  headerStyle?: React.CSSProperties;
}) {
  return (
    <thead className='font-semibold text-[13px] text-[#6D6D6D] capitalize bg-white rounded-t-xl border-[#919191]'>
      <tr>
        {tableHeaders.map((header, index) =>
          header !== 'tableAction' ? (
            <th
              className='px-6 py-4 align-middle'
              scope='col'
              key={header}
              style={{
                textAlign: index === 0 ? 'left' : 'center',
                ...headerStyle,
              }}
            >
              {/* Convert camel cased header to words */}
              {header
                ?.replace(/([a-z])([A-Z])/g, '$1 $2')
                ?.replace(/_/g, ' ')
                ?.toLowerCase()}
            </th>
          ) : (
            <th
              className='px-3 py-3 align-middle'
              scope='col'
              key={header}
              style={{
                textAlign: index === 0 ? 'left' : 'center',
              }}
            >
              Action
            </th>
          )
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
