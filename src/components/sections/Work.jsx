import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const headings = ['VEGE MONEY', 'VEGE MONEY', 'VEGE MONEY']

const Work = () => {


  return (
    <section className="w-screen h-screen ml-6 flex flex-row">
      <div className="h-full w-[55%] flex py-10 items-end justify-center">
        <div className="relative w-[65%] h-[50%] border border-[#272323]">
        </div>
      </div>
      <div className="h-full w-[45%] px-5 py-14">
        <p className="font-['Segoe UI'] font-normal text-[0.775rem] ">FEATURED WORK</p>
        <div className="h-[80%] mt-4 w-full font-[--pp-editorial-old-ultrabold]">

          {headings.map((heading, index) => (
            <div
              key={index}
              className="group relative h-1/4 w-full overflow-hidden border-b border-[#1111114b] text-[4rem]"
            >
              {/* Original text */}
              <div>
                <span
                  className="
                    relative z-0 block
                    transition-transform duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:-translate-y-full
                  "
                >
                  {heading}
                </span>

                {/* Hover text */}
                <span
                  className="
                    absolute left-0 top-full z-0 block
                    transition-transform duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:-translate-y-full
                  "
                >
                  {heading}
                </span>
              </div>

              <FontAwesomeIcon icon={byPrefixAndName.fas['arrow-up-right-from-square']} />

              {/* Animated underline */}
              <span
                className="
                    absolute bottom-0 left-0 z-10
                    h-[1px] w-full
                    origin-left scale-x-0
                    bg-[#111]
                    transition-transform duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:scale-x-100
                  "
              />
            </div>
          ))}

          <div className="group relative h-1/4 w-full overflow-hidden  text-[4rem]">
            {/* Original text */}
            <span
              className="
                    block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:-translate-y-full
                  "
            >
              {headings[headings.length - 1]}
            </span>

            {/* Hover text */}
            <span
              className="
                    absolute left-0 top-full block
                    transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:-translate-y-full
                  "
            >
              {headings[headings.length - 1]}
            </span>

          </div>
        </div>
        <div className="h-[20%] w-full flex items-center justify-end">
          <button className="text-[#111111] py-2 px-4 hover:bg-[#333333]">View Project</button>
        </div>
      </div>
    </section>
  )
}

export default Work