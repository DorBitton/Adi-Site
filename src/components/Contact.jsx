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
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
        <div ref={textRef} className="space-y-4 md:space-y-6">
          <h2 className="contact-line text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-casta text-[#F5F0E7] leading-tight">
            Let's create
          </h2>
          <h2 className="contact-line text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-casta text-[#F5F0E7] leading-tight">
            great things
          </h2>
          <h2 className="contact-line text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-casta text-[#F5F0E7] leading-tight">
            together
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Contact;

