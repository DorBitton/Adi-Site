import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMobile, useTablet, useDesktop } from '../../hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  // Responsive hooks
  const isMobile = useMobile();
  const isTablet = useTablet();
  const isDesktop = useDesktop();

  useGSAP(
    () => {
      if (!containerRef.current || !textRef.current) return;

      // Animate text lines
      const lines = textRef.current.querySelectorAll('.contact-line');
      gsap.from(lines, {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`relative w-full min-h-[60vh] bg-background flex items-center justify-center ${
        isMobile ? 'py-12' : 
        isTablet ? 'py-16' : 
        'py-20 md:py-32'
      }`}
    >
      <div id="contact" className={`w-full ${
        isMobile ? 'px-4' : 
        isTablet ? 'px-6' : 
        'px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20'
      }`}>
        <div className={`mx-auto max-w-6xl flex items-start justify-between gap-12 ${
          isMobile ? 'flex-col ml-0' : 
          isTablet ? 'flex-col ml-0 lg:gap-16' : 
          'flex-col lg:flex-row lg:items-center lg:gap-20 ml-[10%]'
        }`}>
          {/* Left side - Big Casta text */}
          <div ref={textRef} className={isMobile ? 'space-y-1' : isTablet ? 'space-y-2' : 'space-y-2 sm:space-y-3 flex-1'}>
            <h2
              className={`contact-line italic text-[#F5F0E7] leading-none tracking-tight ${
                isMobile ? 'text-[48px]' : 
                isTablet ? 'text-[56px]' : 
                'text-[56px] sm:text-[64px] md:text-[72px] lg:text-[80px]'
              }`}
              style={{ fontFamily: 'Casta, serif' }}
            >
              Let's create
            </h2>
            <h2
              className={`contact-line italic text-[#F5F0E7] leading-none tracking-tight ${
                isMobile ? 'text-[48px]' : 
                isTablet ? 'text-[56px]' : 
                'text-[56px] sm:text-[64px] md:text-[72px] lg:text-[80px]'
              }`}
              style={{ fontFamily: 'Casta, serif' }}
            >
              great things
            </h2>
            <h2
              className={`contact-line italic text-[#F5F0E7] leading-none tracking-tight ${
                isMobile ? 'text-[48px]' : 
                isTablet ? 'text-[56px]' : 
                'text-[56px] sm:text-[64px] md:text-[72px] lg:text-[80px]'
              }`}
              style={{ fontFamily: 'Casta, serif' }}
            >
              together
            </h2>
          </div>

          {/* Right side - Contact Info */}
          <div className={isMobile ? 'w-full' : isTablet ? 'w-full' : 'w-full lg:w-[320px] xl:w-[360px]'}>
            {/* Inner glass panel */}
            <div className={`flex flex-col gap-5 text-[#F5F0E7] rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.45)] ${
              isMobile ? 'p-5' : 'p-6 sm:p-7'
            }`}>
              <div className={`font-lato-light font-light text-[#F5F0E7]/45 mb-1 ${
                isMobile ? 'text-[18px]' : 'text-[20px]'
              }`}>
                Contact
              </div>
              <div className="space-y-4">
                <div>
                  <div className={`font-lato-light font-light ${
                    isMobile ? 'text-[18px]' : 'text-[20px]'
                  }`}>
                    Adi Gur
                  </div>
                </div>

                <div>
                  <div className={`font-lato-light font-light text-[#F5F0E7]/45 mb-1.5 ${
                    isMobile ? 'text-[18px]' : 'text-[20px]'
                  }`}>
                    Email
                  </div>
                  <a
                    href="mailto:adigur94@gmail.com"
                    className={`inline-flex items-center gap-2 font-lato-light font-light ${
                      isMobile ? 'text-[18px]' : 'text-[20px]'
                    }`}
                  >
                    <span>adigur94@gmail.com</span>
                  </a>
                </div>

                <div>
                  <div className={`font-lato-light font-light text-[#F5F0E7]/45 mb-1.5 ${
                    isMobile ? 'text-[18px]' : 'text-[20px]'
                  }`}>
                    Phone
                  </div>
                  <a
                    href="tel:+40756266862"
                    className={`inline-flex items-center gap-2 font-lato-light font-light ${
                      isMobile ? 'text-[18px]' : 'text-[20px]'
                    }`}
                  >
                    <span>+40756266862</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

