import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({
  totalResults,
  page,
  setPage,
  defaultTotalPages,
}: {
  totalResults?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  defaultTotalPages?: number;
}) {
  const defaultLimit = 10;

  const totalPages: number =
    defaultTotalPages || Math.ceil((totalResults || 0) / defaultLimit);
  if (!totalResults && !defaultTotalPages) return null;

  return (
    <>
      <ReactPaginate
        breakLabel='...'
        containerClassName='flex items-center w-full justify-center flex-wrap mt-10'
        breakClassName='text-[#919191] text-sm font-medium flex justify-center w-10 h-10 items-center '
        pageClassName='text-sm font-medium flex justify-center w-10 h-10 items-center text-[#919191]'
        activeClassName='!text-[#242424] bg-[#F2F2F2] rounded-[8px]'
        nextLabel={
          <button
            className='disabled:pointer-events-none disabled:opacity-40 bg-white hover:bg-primary text-[#242424] hover:text-white duration-300 transition-colors px-[14px] py-2 rounded-lg border border-[#D3D3D3] shadow  flex items-center gap-2 text-sm font-medium'
            // onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
          >
            Next
            <ArrowRight2 size={20} />
          </button>
        }
        nextClassName='ml-auto'
        previousClassName='mr-auto'
        onPageChange={(e) => {
          setPage(e.selected + 1);
        }}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={
          <button
            className='disabled:pointer-events-none disabled:opacity-40 bg-white hover:bg-primary text-[#242424] hover:text-white duration-300 transition-colors px-[14px] py-2 rounded-lg border border-[#D3D3D3] shadow flex items-center gap-2 text-sm font-medium'
            // onClick={() => setPage(page - 1)}
            disabled={page <= 1}
          >
            <ArrowLeft2 size={20} />
            Previous
          </button>
        }
        renderOnZeroPageCount={null}
      />
    </>
  );
}
