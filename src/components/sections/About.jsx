import React from 'react'

const portraitUrl =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80'

const About = () => {
  return (
    <section className="relative h-screen w-screen overflow-hidden bg-[#faf9f6] text-[#1f1d1b]">
      <div className="flex h-full w-full">
        <aside className="relative flex w-[84px] shrink-0 flex-col items-center border-r border-[#201f1d]/35 bg-[#faf9f6]">
          <div className="mt-4 flex h-10 w-full items-center justify-center">
            <button type="button" aria-label="Menu" className="flex h-8 w-8 items-center justify-center">
              <span className="flex flex-col gap-[0.28rem]">
                <span className="block h-[2px] w-6 bg-[#1f1d1b]" />
                <span className="block h-[2px] w-6 bg-[#1f1d1b]" />
                <span className="block h-[2px] w-6 bg-[#1f1d1b]" />
              </span>
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-between py-7">
            <div
              className="font-[--pp-editorial-old-ultrabold] text-[0.72rem] uppercase tracking-[0.24em] text-[#1f1d1b]"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              FOLIO — EDITION
            </div>

            <div
              className="font-[--pp-editorial-old-ultrabold] text-[0.72rem] uppercase tracking-[0.22em] text-[#1f1d1b]"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              KHIANH NGUYEN
            </div>
          </div>
        </aside>

        <div className="grid flex-1 grid-cols-[1.04fr_1.36fr_0.9fr] gap-0">
          <div className="flex flex-col justify-between pl-8 pr-6 pt-7 pb-8">
            <div className="pt-3">
              <h1 className="font-[--pp-editorial-old-ultrabold] text-[clamp(3.4rem,4.5vw,6.9rem)] leading-[0.82] tracking-[-0.07em] text-[#1f1d1b]">
                CHAPTER I
              </h1>
            </div>

            <div className="flex items-center gap-4 pb-4 pl-1 text-[#1f1d1b]">
              <span className="inline-block h-px w-8 bg-[#1f1d1b]/75" />
              <span className="font-[--pp-editorial-old-ultrabold] text-[0.72rem] uppercase tracking-[0.28em]">
                Beyond design
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between px-4 pt-7 pb-8">
            <div className="pt-2 text-center">
              <div className="font-[--pp-editorial-old-ultrabold] text-[0.72rem] uppercase tracking-[0.35em] text-[#1f1d1b]/75">
                QUICK INTRO
              </div>
            </div>

            <div className="pt-2">
              <h2 className="max-w-[620px] font-[--pp-editorial-old-ultrabold] text-[clamp(2.2rem,2.8vw,4.4rem)] leading-[0.96] tracking-[-0.065em] text-[#1f1d1b]">
                Hi, I&apos;m Khanh
                <span className="block">— a designer</span>
                <span className="block">with 10+ years</span>
                <span className="block">of experience</span>
                <span className="block">in digital</span>
                <span className="block">products,</span>
                <span className="block">websites, and</span>
                <span className="block">visual systems,</span>
                <span className="block">creating clear</span>
                <span className="block">and thoughtful</span>
                <span className="block">experiences.</span>
              </h2>
            </div>

            <div className="flex items-center gap-3 pt-2 text-[#1f1d1b]">
              <span className="inline-block h-px w-12 bg-[#1f1d1b]/75" />
              <span className="font-[--pp-editorial-old-ultrabold] text-[0.72rem] uppercase tracking-[0.28em]">
                Beyond design
              </span>
            </div>

            <p className="max-w-[295px] pt-3 text-[1.08rem] leading-[1.5] tracking-[-0.04em] text-[#1f1d1b]">
              Beyond design: football, watches,
              aquariums, and martial arts.
            </p>
          </div>

          <div className="flex flex-col justify-end px-6 pb-8 pt-8">
            <div className="w-full max-w-[430px] self-end overflow-hidden bg-[#dcd8d2]">
              <img
                src={portraitUrl}
                alt="Portrait"
                className="h-[520px] w-full object-cover grayscale"
              />
            </div>

            <div className="mt-7 flex w-full max-w-[430px] items-center justify-between gap-3 border border-[#1f1d1b]/10 bg-[#f1eee9] px-4 py-3 shadow-[0_0_0_1px_rgba(31,29,27,0.03)]">
              <div className="flex flex-col text-[0.58rem] uppercase tracking-[0.28em] text-[#1f1d1b]/80 montserrat font-medium">
                <span>WORK</span>
                <span>FOR LOVE</span>
              </div>

              <div className="flex items-center gap-2 text-[#1f1d1b]">
                <span className="font-[--pp-editorial-old-ultrabold] text-[2.2rem] leading-none tracking-[-0.04em]">
                  More about me
                </span>
                <span className="text-[2rem] leading-none">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About