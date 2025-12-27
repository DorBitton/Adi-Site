import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMobile, useTablet } from '../../hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const containerRef = useRef(null);
  const headerBarRef = useRef(null);
  const textRef = useRef(null);
  
  const isMobile = useMobile();
  const isTablet = useTablet();

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Animate header bar width on scroll
      gsap.from(headerBarRef.current, {
        width: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      });

      // Animate text paragraphs with stagger
      const paragraphs = textRef.current?.querySelectorAll('p');
      if (paragraphs) {
        gsap.from(paragraphs, {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  const getTextSize = () => {
    if (isMobile) return 'text-[16px]';
    if (isTablet) return 'text-[18px]';
    return 'text-[20px]';
  };

  const paragraphClass = `${getTextSize()} text-white leading-relaxed text-center font-lato-light font-light`;

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-card flex flex-col z-10 ${
        isMobile ? 'min-h-[40vh] mt-0 pt-12' : 
        isTablet ? 'min-h-[45vh] mt-[-10vh]' : 
        'min-h-[50vh] mt-[-30vh]'
      }`}
    >
      {/* Header Bar */}
      <div 
        id="about"
        ref={headerBarRef}
        className="h-[1.5%] min-h-[2px] bg-foreground opacity-30 w-full flex-shrink-0"
      />

      {/* Content */}
      <div className={`flex-1 flex items-center justify-center ${
        isMobile ? 'pt-8 pb-8' : isTablet ? 'pt-12 pb-12' : 'pt-16 pb-16'
      }`}>
        <div className={`max-w-5xl mx-auto w-full ${
          isMobile ? 'px-4' : isTablet ? 'px-6' : 'px-6 sm:px-8 md:px-12'
        }`}>
          <div 
            ref={textRef} 
            className={isMobile ? 'space-y-4' : isTablet ? 'space-y-5' : 'space-y-6 md:space-y-8'}
          >
            <p className={paragraphClass}>
              I've always felt that design isn't just something we create - it's something that surrounds us, shaping how we live, feel, and connect.{' '}
              <strong className="font-lato-bold font-bold">
                For me, design is where art and science meet:
              </strong>{' '}
              a balance between emotion and logic, creativity and structure.
            </p>
            
            <p className={paragraphClass}>
              I'm drawn to the visual side of design and the challenge of solving problems in ways that feel effortless and human. Storytelling plays a big role in my process -{' '}
              <strong className="font-lato-bold font-bold">
                I love finding ways to guide people through an experience that feels clear, engaging, and meaningful.
              </strong>
            </p>
            
            <p className={paragraphClass}>
              Empathy is at the heart of everything I do.{' '}
              <strong className="font-lato-bold font-bold">
                I care about how people feel when they use something I've designed
              </strong>{' '}
              - whether it makes them smile, saves them time, or simply feels right.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
