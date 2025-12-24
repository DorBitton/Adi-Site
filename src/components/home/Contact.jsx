import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

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
      className="relative w-full min-h-[60vh] bg-background flex items-center justify-center py-20 md:py-32"
    >
      <div id="contact" className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-6xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20 ml-[10%]">
          {/* Left side - Big Casta text */}
          <div ref={textRef} className="space-y-2 sm:space-y-3 flex-1">
            <h2
              className="contact-line text-[56px] sm:text-[64px] md:text-[72px] lg:text-[80px] italic text-[#F5F0E7] leading-none tracking-tight"
              style={{ fontFamily: 'Casta, serif' }}
            >
              Let's create
            </h2>
            <h2
              className="contact-line text-[56px] sm:text-[64px] md:text-[72px] lg:text-[80px] italic text-[#F5F0E7] leading-none tracking-tight"
              style={{ fontFamily: 'Casta, serif' }}
            >
              great things
            </h2>
            <h2
              className="contact-line text-[56px] sm:text-[64px] md:text-[72px] lg:text-[80px] italic text-[#F5F0E7] leading-none tracking-tight"
              style={{ fontFamily: 'Casta, serif' }}
            >
              together
            </h2>
          </div>

          {/* Right side - Contact Info */}
          <div className="w-full lg:w-[320px] xl:w-[360px]">
            {/* Inner glass panel */}
            <div className="flex flex-col gap-5 text-[#F5F0E7] rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_0_30px_rgba(0,0,0,0.45)]">
              <div className="text-[20px] font-lato-light font-light text-[#F5F0E7]/45 mb-1">
                Contact
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-[20px] font-lato-light font-light">
                    Adi Gur
                  </div>
                </div>

                <div>
                  <div className="text-[20px] font-lato-light font-light text-[#F5F0E7]/45 mb-1.5">
                    Email
                  </div>
                  <a
                    href="mailto:adigur94@gmail.com"
                    className="inline-flex items-center gap-2 text-[20px] font-lato-light font-light"
                  >
                    <span>adigur94@gmail.com</span>
                  </a>
                </div>

                <div>
                  <div className="text-[20px] font-lato-light font-light text-[#F5F0E7]/45 mb-1.5">
                    Phone
                  </div>
                  <a
                    href="tel:+40756266862"
                    className="inline-flex items-center gap-2 text-[20px] font-lato-light font-light"
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

