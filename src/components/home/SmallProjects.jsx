import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Monitor } from 'lucide-react';
import { useMobile, useTablet } from '../../hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

const SmallProjects = () => {
  const containerRef = useRef(null);
  const isMobile = useMobile();
  const isTablet = useTablet();

  const baseUrl = import.meta.env.BASE_URL;
  const projects = [
    {
      id: 1,
      title: 'Chocolate Collection',
      description: 'This mini project explores a playful and visually rich interface for presenting different chocolate flavors. The design focuses on smooth micro - interactions and a delightful animation that enhances the sensory feel of chocolate. The goal was to create a simple yet immersive experience - where motion, color, and typography work together to evoke taste and texture in a digital space.',
      image: `${baseUrl}images/projects/smallProjects/1/1.png`,
      images: Array.from({ length: 6 }, (_, i) => `${baseUrl}images/projects/smallProjects/2/${i + 1}.jpg`),
      tools: 'figma',
    },
    {
      id: 2,
      title: 'Urban Movement Concept',
      subtitle: 'Under ground station, commerce, residence.',
      description: 'A city in motion. This project transforms everyday movement into an experience - where streets, open spaces, and the train flow together as one living system. The design celebrates rhythm, energy, and the seamless pulse of urban life.',
      image: `${baseUrl}images/projects/smallProjects/2/1.jpg`,
      images: Array.from({ length: 6 }, (_, i) => `${baseUrl}images/projects/smallProjects/2/${i + 1}.jpg`),
      tools: 'Rhino, Twinmotion, Photoshop, Autocad, AI',
    },
    {
      id: 3,
      title: 'Coastal Heritage Cities',
      description: 'Inspired by the rhythm of coastal life, this project re imagines a historic seaside city where tradition meets climate-conscious design. Natural light, wind, and shade shape the experience—creating inviting public spaces that breathe with their surroundings. Drawing from the textures of local stone and the patterns of old streets, the design blends heritage with sustainability, crafting a city that feels both timeless and alive.',
      image: `${baseUrl}images/projects/smallProjects/3/1.jpg`,
      images: Array.from({ length: 6 }, (_, i) => `${baseUrl}images/projects/smallProjects/3/${i + 1}.jpg`),
      tools: 'Rhino, Twinmotion, Photoshop, AI',
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;
      
      const cards = gsap.utils.toArray('.stacked-card', containerRef.current);
      if (!cards.length) return;

      const isMobileView = window.innerWidth <= 480;
      const isTabletView = window.innerWidth > 480 && window.innerWidth <= 768;

      // Initialize hidden state for all elements
      gsap.set(containerRef.current.querySelectorAll('.image-container'), { clipPath: 'inset(100% 0 0 0)' });
      gsap.set(containerRef.current.querySelectorAll('.card__text-item'), { opacity: 0, y: 30 });

      cards.forEach((card, i) => {
        const imageContainer = card.querySelector('.image-container');
        const multipleImages = card.querySelectorAll('.card__image-multiple');
        const textItems = card.querySelectorAll('.card__text-item');
        const hasMultipleImages = multipleImages.length > 0;

        // Apply stacking effect only on tablet and desktop
        if (!isMobileView) {
          const scaleValue = 1 - (cards.length - i - 1) * 0.05;
          const pinStart = isTabletView ? `top-=${i * 30} top+=120` : `top-=${i * 40} top+=150`;
          const pinEnd = isTabletView ? 'bottom-=100 bottom' : 'bottom bottom';

          gsap.to(card, {
            scale: scaleValue,
            scrollTrigger: {
              trigger: card,
              start: pinStart,
              end: pinEnd,
              endTrigger: containerRef.current,
              pin: true,
              pinSpacing: false,
              scrub: true,
            },
          });
        }

        // Reveal animations
        ScrollTrigger.create({
          trigger: card,
          start: isMobileView ? 'top bottom-=100' : 'top center+=100',
          once: true,
          onEnter: () => {
            // Reveal image container
            gsap.to(imageContainer, {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.5,
              ease: 'power3.out',
              onComplete: () => {
                // Start image crossfade cycle for multiple images
                if (hasMultipleImages) {
                  gsap.set(multipleImages, { opacity: 0 });
                  gsap.set(multipleImages[0], { opacity: 1 });

                  const timeline = gsap.timeline({ repeat: -1 });
                  multipleImages.forEach((img, idx) => {
                    const nextImg = multipleImages[(idx + 1) % multipleImages.length];
                    timeline.to([img, nextImg], {
                      opacity: (i) => i === 0 ? 0 : 1,
                      duration: 1.5,
                      ease: 'power2.inOut',
                    }, idx * 3);
                  });
                }
              }
            });

            // Reveal text with stagger
            gsap.to(textItems, {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
              delay: 0.3,
            });
          },
        });
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  // Helper function to get responsive image class
  const getImageClass = () => {
    if (isMobile) return 'h-[250px] order-1';
    if (isTablet) return 'md:w-1/2 h-[350px] md:h-full';
    return 'md:w-1/2 h-[50%] md:h-full';
  };

  // Helper function to get responsive text class
  const getTextClass = () => {
    if (isMobile) return 'p-6 h-auto order-2';
    if (isTablet) return 'md:w-1/2 p-8 h-auto';
    return 'md:w-1/2 h-[50%] md:h-full p-8 md:p-12';
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full min-h-screen bg-card z-10 ${
        isMobile ? 'py-16 px-4' : isTablet ? 'py-24 px-6' : 'py-32 px-4 sm:px-6 md:px-8'
      }`}
    >
      <div className="max-w-[170rem] mx-auto">
        <div className="cards-container relative">
          {projects.map((project, i) => {
            const imageLeft = i % 2 === 0;
            const textOrder = !isMobile && (imageLeft ? 'md:order-2' : 'md:order-1');
            const imageOrder = !isMobile && (imageLeft ? 'md:order-1' : 'md:order-2');
            
            return (
              <div
                key={project.id}
                className={`stacked-card ${isMobile ? 'mb-12' : 'mb-8'} last:mb-0`}
                style={{ zIndex: isMobile ? 1 : i + 1 }}
              >
                <div className={`card-inner w-full bg-card border-2 border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row ${
                  isMobile ? 'h-auto min-h-[500px]' : isTablet ? 'h-auto min-h-[600px]' : 'h-[40vh]'
                }`}>
                  {/* Image Section */}
                  <div className={`relative w-full overflow-hidden image-container flex items-center justify-center bg-card ${getImageClass()} ${imageOrder}`}>
                    {project.images?.length > 0 ? (
                      <>
                        {project.images.map((imgSrc, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={imgSrc}
                            alt={`${project.title} - ${imgIndex + 1}`}
                            className="card__image-multiple absolute w-[90%] h-[90%] object-cover rounded-2xl"
                            style={{ 
                              opacity: imgIndex === 0 ? 1 : 0,
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)'
                            }}
                          />
                        ))}
                        <div 
                          className="absolute w-[90%] h-[90%] bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none rounded-2xl" 
                          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} 
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="card__image w-[90%] h-[90%] object-cover rounded-2xl"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                        <div 
                          className="absolute w-[90%] h-[90%] bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none rounded-2xl" 
                          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} 
                        />
                      </>
                    )}
                  </div>

                  {/* Text Section */}
                  <div className={`w-full flex flex-col justify-center bg-card ${getTextClass()} ${textOrder}`}>
                    <h3 className={`card__text-item font-lato-bold mb-4 text-foreground ${
                      isMobile ? 'text-[24px]' : isTablet ? 'text-[26px]' : 'text-[28px]'
                    }`}>
                      {project.title}
                    </h3>
                    
                    {project.subtitle && (
                      <p className={`card__text-item font-lato-light font-light text-muted-foreground mb-3 ${
                        isMobile ? 'text-[16px]' : isTablet ? 'text-[18px]' : 'text-[20px] w-4/5 hidden md:block'
                      }`}>
                        {project.subtitle}
                      </p>
                    )}
                    
                    <p className={`card__text-item font-lato-light font-light text-muted-foreground mb-6 ${
                      isMobile ? 'text-[16px]' : isTablet ? 'text-[18px]' : 'text-[20px] w-4/5 hidden md:block'
                    }`}>
                      {project.description}
                    </p>
                    
                    <div className="card__text-item flex items-center gap-2">
                      <Monitor className={`text-foreground ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                      <span className={`text-foreground ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>
                        {project.tools}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Extra space for pinning effect on tablet/desktop */}
        <div className={isMobile ? 'h-0' : isTablet ? 'h-[30vh]' : 'h-[40vh]'} />
      </div>
    </section>
  );
};

export default SmallProjects;
