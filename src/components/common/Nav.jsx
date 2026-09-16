import React from 'react'

export const Nav = () => {
  return (
    <>
      <div className="h-screen w-16 shrink-0 fixed top-0 left-0 z-100">
        <div className='flex h-full w-full flex-col border-r border-[#58534f] bg-transparent'>
          <div className='flex flex-col gap-[5px] border border-[#58534f] p-4'>
              <div className='w-7 h-[1px] rounded-2xl bg-amber-50'></div>
              <div className='w-7 h-[1px] rounded-2xl bg-amber-50'></div>
              <div className='w-7 h-[1px] rounded-2xl bg-amber-50'></div>
          </div>
          <div className='flex min-h-0 flex-1 flex-col text-sm text-[#F3EEE8]'>
            <div className='flex min-h-0 flex-1 items-center justify-center'>
              <span className='-rotate-90 whitespace-nowrap'>Folio — Edition</span>
            </div>
            <div className='flex min-h-0 flex-1 items-center justify-center'>
              <span className='-rotate-90 whitespace-nowrap'>PREM MAURYA</span>
            </div>
            <div className='flex min-h-0 flex-1 items-center justify-center'>
              <span className='-rotate-90 whitespace-nowrap text-xs'>© 2026</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
