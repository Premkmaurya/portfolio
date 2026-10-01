import React from 'react'

const Work = () => {


  return (
    <section className="w-screen h-screen ml-6 flex flex-row">
      <div className="h-full w-[55%] flex py-10 items-end justify-center">
        <div className="relative w-[65%] h-[50%] border border-[#272323]">
        </div>
      </div>
      <div className="h-full w-[45%] px-5 py-14">
        <p className="font-['Segoe UI'] font-normal text-[0.775rem] ">FEATURED WORK</p>
        <div className="h-[90%] mt-4 w-full font-[--pp-editorial-old-ultrabold]">
          <div className='h-1/4 w-full border-b border-[#1111114b] text-[4rem]'>VEGE MONEY</div>
          <div className='h-1/4 w-full border-b border-[#1111114b] text-[4rem]'>VEGE MONEY</div>
          <div className='h-1/4 w-full border-b border-[#1111114b] text-[4rem]'>VEGE MONEY</div>
          <div className='h-1/4 w-full text-[4rem]'>VEGE MONEY</div>
        </div>
        <div className="h-[10%] w-full flex items-center justify-end"> 
          <button className="text-[#111111] py-2 px-4 hover:bg-[#333333]">View Project</button>
        </div>
      </div>
    </section>
  )
}

export default Work