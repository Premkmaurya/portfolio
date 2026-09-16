import React from 'react'

export const Loader = () => {
  return (
    <div className="w-screen h-screen bg-red-400 text-[#F3EEE8] font-[--pp-editorial-old-ultrabold]">
      <div className="w-full h-1/2 bg-blue-500">
        <div className="flex items-center justify-start h-full px-20">
          <span className="ml-18 text-[10rem]">2026</span>
        </div>
      </div>
      <div className="w-full h-1/2 px-2 py-10 bg-green-500">
        <div className="flex items-end justify-end h-full">
          <span className="mr-18 text-[1.4rem] font-normal capitalize tracking-tighter whitespace-nowrap">A journey through years of design
          </span>
        </div>
      </div>
    </div>
  )
}
