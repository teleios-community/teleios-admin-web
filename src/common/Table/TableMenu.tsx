import { Ref, useRef } from 'react';
import MenuIcon from '../../assets/icons/menu.svg';
import Popup from 'reactjs-popup';
import { menuItemType } from './types';
import { PopupActions } from 'reactjs-popup/dist/types';

function TableMenu({ data, menuItems }: { data: any; menuItems?: menuItemType[] }) {
  const menuRef: Ref<PopupActions> | null = useRef(null);

  return (
    <div className='w-full flex justify-center'>
      <Popup
        ref={menuRef}
        trigger={
          <button
            key={data?._id}
            className='flex items-center justify-center hover:bg-gray-200 duration-500 rounded-full w-7 h-7'
          >
            <img src={MenuIcon} alt='Menu' />
          </button>
        }
        closeOnDocumentClick
        offsetX={10}
        offsetY={5}
        position='bottom right'
        contentStyle={{
          padding: 0,
          borderRadius: 3,
          boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.1)',
          border: '1px solid #F2F2F2',
        }}
        arrow={false}
        closeOnEscape
      >
        <ul className='flex flex-col w-full'>
          {menuItems?.map(
            (item) =>
              item.permission && (
                <li
                  className='px-3 py-2 text-sm hover:bg-gray-700 text-[#4F4F4F] hover:!text-white cursor-pointer duration-200'
                  style={item.style}
                  onClick={() => {
                    item.onClick(data);
                    menuRef.current && menuRef.current.close();
                  }}
                  key={item.label}
                >
                  {item.label}
                </li>
              )
          )}
        </ul>
      </Popup>
    </div>
  );
}

export default TableMenu;
