import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const containerRef = useRef(null);
  const headerBarRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Animate header bar
      gsap.from(headerBarRef.current, {
        width: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      });

      // Animate text paragraphs
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

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[50vh] bg-card py-20 mt-[-40vh]"
    >
      {/* Top Brown Header Bar */}
      <div
        ref={headerBarRef}
        className="h-[1.5%] min-h-[2px] bg-foreground opacity-30 w-full"
      />

      {/* About Me Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-16 md:py-24">
        <div ref={textRef} className="space-y-6 md:space-y-8">
          <p className="text-white md:text-lg leading-relaxed text-gray-900 font-lato">
            I've always felt that design isn't just something we create — it's something that surrounds us, shaping how we live, feel, and connect.{' '}
            <strong className="font-lato-bold">For me, design is where art and science meet:</strong> a balance between emotion and logic, creativity and structure.
          </p>
          
          <p className="text-white md:text-lg leading-relaxed text-gray-900 font-lato">
            I'm drawn to the visual side of design and the challenge of solving problems in ways that feel effortless and human. Storytelling plays a big role in my process —{' '}
            <strong className="font-lato-bold">I love finding ways to guide people through an experience that feels clear, engaging, and meaningful.</strong>
          </p>
          
          <p className="text-white md:text-lg leading-relaxed text-gray-900 font-lato">
            Empathy is at the heart of everything I do.{' '}
            <strong className="font-lato-bold">I care about how people feel when they use something I've designed</strong> — whether it makes them smile, saves them time, or simply feels right.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

