import React from 'react';
import FadeIn from '../components/FadeIn';

interface Service {
  number: string;
  name: string;
  description: string;
}

const services: Service[] = [
  {
    number: '01',
    name: 'Frontend Development',
    description:
      'Building responsive, modern, and interactive user interfaces using HTML, CSS, JavaScript, React, Next.js, and Tailwind CSS.',
  },
  {
    number: '02',
    name: 'Full Stack Web Apps',
    description:
      'Developing scalable web applications with frontend and backend integration, authentication, APIs, and database connectivity.',
  },
  {
    number: '03',
    name: 'API Integration',
    description:
      'Integrating REST APIs and dynamic data fetching to create fast, real-time, and interactive web experiences.',
  },
  {
    number: '04',
    name: 'Responsive Web Design',
    description:
      'Designing clean, mobile-friendly, and conversion-focused websites with modern layouts and smooth user experience.',
  },
  {
    number: '05',
    name: 'Custom Website Development',
    description:
      'Creating custom business websites, portfolio websites, and startup-ready web solutions tailored to client needs.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      {/* Service list */}
      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : undefined,
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              {/* Number */}
              <span
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                aria-hidden="true"
              >
                {service.number}
              </span>

              {/* Name + description */}
              <div className="flex flex-col justify-center pt-2 sm:pt-3 md:pt-4">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
