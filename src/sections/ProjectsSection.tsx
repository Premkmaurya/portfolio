import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

interface Project {
  number: string;
  category: string;
  name: string;
  col1Images: [string, string];
  col2Image: string;
}

const projects: Project[] = [
  {
    number: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    col1Images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    ],
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    col1Images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    ],
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    category: 'Client',
    name: 'Solaris Digital',
    col1Images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    ],
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

const totalCards = projects.length;

interface ProjectCardProps {
  project: Project;
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, progress }) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / totalCards, 1], [1, targetScale]);

  const borderRadius = 'clamp(24px, 4vw, 60px)';

  return (
    <div
      className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.div
        className="w-full border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6"
        style={{
          background: '#0C0C0C',
          borderRadius,
          scale,
          transformOrigin: 'top center',
          maxHeight: 'calc(85vh - 0px)',
          overflow: 'hidden',
        }}
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 120px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span
                className="text-[#D7E2EA] font-light uppercase tracking-wider opacity-60"
                style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)' }}
              >
                {project.category}
              </span>
              <span
                className="text-[#D7E2EA] font-medium uppercase tracking-wide"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2rem)' }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        {/* Image grid */}
        <div className="flex gap-3 flex-1 min-h-0">
          {/* Left column — 40% */}
          <div className="flex flex-col gap-3" style={{ width: '40%' }}>
            <img
              src={project.col1Images[0]}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full object-cover"
              style={{
                borderRadius,
                height: 'clamp(130px, 16vw, 230px)',
              }}
            />
            <img
              src={project.col1Images[1]}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full object-cover flex-1"
              style={{
                borderRadius,
                height: 'clamp(160px, 22vw, 340px)',
              }}
            />
          </div>

          {/* Right column — 60% */}
          <div style={{ width: '60%' }}>
            <img
              src={project.col2Image}
              alt={`${project.name} main`}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ borderRadius }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
      style={{ background: '#0C0C0C' }}
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      {/* Sticky stacking cards */}
      <div className="relative">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
