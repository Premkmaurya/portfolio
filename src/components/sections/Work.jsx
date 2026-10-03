import React from 'react'
import { FiExternalLink } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";

const headings = ['VEGE MONEY', 'VEGE MONEY', 'VEGE MONEY', 'VEGE MONEY']

const Work = () => {


  return (
    <section className="w-screen h-screen ml-6 flex flex-row">
      <div className="h-full w-[55%] flex py-10 items-end justify-center">
        <div className="relative w-[65%] h-[50%] border border-[#27232370]">
        </div>
      </div>
      <div className="h-full w-[45%] px-5 py-14">
        <p className="font-['Segoe UI'] font-normal text-[0.775rem] ">FEATURED WORK</p>
        <div className="h-[80%] mt-4 w-full font-[--pp-editorial-old-ultrabold]">

          {headings.map((heading, index) => (
            <div
              key={index}
              className={`group relative h-1/4 w-full overflow-hidden cursor-pointer ${index != headings.length - 1 ? 'border-b border-[#1111114b]' : ''} text-[4rem]`}
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
              <FiExternalLink
                className="
                  opacity-0 absolute right-10 top-[30%]
                  translate-x-1/2
                  h-10 w-10
                  transition-all duration-500
                  ease-[cubic-bezier(.22,1,.36,1)]
                  group-hover:opacity-100 group-hover:translate-x-0"
              />
              {/* Animated underline */}
              {index === headings.length - 1 ? null : (
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
                />)}
            </div>
          ))}
        </div>
        <div className="h-[20%] w-full flex items-center justify-end gap-4 px-10">
          <button className="project-btn">
            {/* Button text */}
            <span className="relative z-10 text-[1.3rem] flex items-center gap-4 font-['Segoe UI']">
              View Project
              <FaArrowRightLong className="w-5 h-5" />
              <span className="project-btn-line" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Work