import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SmallProjects = () => {
  const containerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Project One',
      description:
        'A beautiful web application showcasing modern design principles and smooth user experiences.',
      image: '/images/projects/1.png',
      tags: ['React', 'GSAP', 'Design'],
    },
    {
      id: 2,
      title: 'Project Two',
      description:
        'An innovative mobile-first experience with smooth animations and intuitive interactions.',
      image: '/images/projects/2.png',
      tags: ['Next.js', 'TypeScript', 'UI/UX'],
    },
    {
      id: 3,
      title: 'Project Three',
      description:
        'A creative portfolio piece demonstrating advanced techniques and cutting-edge design.',
      image: '/images/projects/3.png',
      tags: ['Vue', 'Animation', 'Creative'],
    },
  ];

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.stacked-card');
      
      if (!cards.length) return;

      // Set initial states
      gsap.set('.card__image', { clipPath: 'inset(100% 0 0 0)' });
      gsap.set('.card__text-item', { opacity: 0, y: 30 });

      cards.forEach((card, i) => {
        const image = card.querySelector('.card__image');
        const textItems = card.querySelectorAll('.card__text-item');

        // Calculate scale based on card position (cards behind get smaller)
        const scaleValue = 1 - (cards.length - i - 1) * 0.05;

        // Pin and scale animation
        gsap.to(card, {
          scale: scaleValue,
          scrollTrigger: {
            trigger: card,
            start: `top-=${i * 40} top+=150`,
            end: 'bottom bottom',
            endTrigger: containerRef.current,
            pin: true,
            pinSpacing: false,
            scrub: true,
            markers: false, // Set to true to debug
          },
        });

        // Image and text reveal (happens once)
        ScrollTrigger.create({
          trigger: card,
          start: 'top center+=100',
          once: true,
          onEnter: () => {
            // Image reveal
            gsap.to(image, {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.5,
              ease: 'power3.out',
            });

            // Text reveal with stagger
            gsap.to(textItems, {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
              delay: 0.3, // Start slightly after image begins
            });
          },
        });
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-32 px-4 sm:px-6 md:px-8 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 text-foreground">
          Featured Work
        </h2>
        
        <div className="cards-container relative">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="stacked-card mb-8 last:mb-0"
              style={{ zIndex: i + 1 }}
            >
              <div className="card-inner w-full h-[75vh] bg-card border-2 border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Text Section - Left on desktop */}
                <div className="w-full md:w-1/2 h-[40%] md:h-full p-8 md:p-12 flex flex-col justify-center bg-card order-2 md:order-1">
                  <h3 className="card__text-item text-3xl md:text-5xl font-bold mb-4 text-foreground">
                    {project.title}
                  </h3>
                  <p className="card__text-item text-base md:text-lg text-muted-foreground mb-6 w-full md:w-4/5 hidden md:block">
                    {project.description}
                  </p>
                  <div className="card__text-item flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Section - Right on desktop */}
                <div className="relative w-full md:w-1/2 h-[60%] md:h-full overflow-hidden order-1 md:order-2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="card__image w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Extra space after cards so last card has room to scroll */}
        <div className="h-screen" />
      </div>
    </section>
  );
};

export default SmallProjects;