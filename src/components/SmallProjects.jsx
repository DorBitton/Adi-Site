import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Monitor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SmallProjects = () => {
  const containerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Chocolate Collection',
      description:
        'This mini project explores a playful and visually rich interface for presenting different chocolate flavors. The design focuses on smooth micro-interactions and a delightful animation that enhances the sensory feel of chocolate. The goal was to create a simple yet immersive experience—where motion, color, and typography work together to evoke taste and texture in a digital space.',
      image: '/images/projects/1.png',
      tools: 'figma',
    },
    {
      id: 2,
      title: 'Urban Movement Concept',
      subtitle: 'Under ground station, commerce, residence.',
      description:
        'A city in motion. This project transforms everyday movement into an experience—where streets, open spaces, and the train flow together as one living system. The design celebrates rhythm, energy, and the seamless pulse of urban life.',
      image: '/images/projects/2.png',
      tools: 'Rhino, Twinmotion, Photoshop, Autocad, AI',
    },
    {
      id: 3,
      title: 'Coastal Heritage Cities',
      description:
        'Inspired by the rhythm of coastal life, this project re imagines a historic seaside city where tradition meets climate-conscious design. Natural light, wind, and shade shape the experience—creating inviting public spaces that breathe with their surroundings. Drawing from the textures of local stone and the patterns of old streets, the design blends heritage with sustainability, crafting a city that feels both timeless and alive.',
      image: '/images/projects/3.png',
      tools: 'Rhino, Twinmotion, Photoshop, AI',
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
      className="relative w-full min-h-screen py-32 px-4 sm:px-6 md:px-8 bg-card"
    >
      <div className="max-w-7xl mx-auto">
        <div className="cards-container relative">
          {projects.map((project, i) => {
            // Alternate layout: even index (0, 2) = image left, odd index (1) = image right
            const imageLeft = i % 2 === 0;
            const textOrder = imageLeft ? 'md:order-2' : 'md:order-1';
            const imageOrder = imageLeft ? 'md:order-1' : 'md:order-2';
            
            return (
              <div
                key={project.id}
                className="stacked-card mb-8 last:mb-0"
                style={{ zIndex: i + 1 }}
              >
                <div className="card-inner w-full h-[35vh] bg-card border-2 border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className={`relative w-full md:w-1/2 h-[50%] md:h-full overflow-hidden order-1 ${imageOrder}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="card__image w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Text Section */}
                  <div className={`w-full md:w-1/2 h-[50%] md:h-full p-8 md:p-12 flex flex-col justify-center bg-card order-2 ${textOrder}`}>
                    <h3 className="card__text-item text-3xl md:text-5xl font-bold mb-4 text-foreground">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="card__text-item text-base md:text-lg text-muted-foreground mb-2">
                        {project.subtitle}
                      </p>
                    )}
                    <p className="card__text-item text-base md:text-lg text-muted-foreground mb-6 w-full md:w-4/5 hidden md:block">
                      {project.description}
                    </p>
                    <div className="card__text-item flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-foreground" />
                      <span className="text-sm md:text-base text-foreground">{project.tools}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Extra space after cards so last card has room to scroll */}
        <div className="h-screen" />
      </div>
    </section>
  );
};

export default SmallProjects;