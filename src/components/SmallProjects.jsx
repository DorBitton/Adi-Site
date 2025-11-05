import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmallProjects = () => {
  const sliderRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const progressRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlideRef = useRef(0); // Track current slide without closure issues

  // Your project data
  const projects = [
    {
      title: 'Project One',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
      description: 'Web Development'
    },
    {
      title: 'Project Two',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
      description: 'UI/UX Design'
    },
    {
      title: 'Project Three',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
      description: 'Brand Identity'
    }
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    const imagesContainer = imagesContainerRef.current;
    const progressBar = progressRef.current;

    // Initialize with first image
    animateNewSlide(0, imagesContainer);

    // Calculate total scroll distance
    const pinDistance = window.innerHeight * projects.length;

    // Create ScrollTrigger
    ScrollTrigger.create({
      trigger: slider,
      start: 'top top',
      end: `+=${pinDistance}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        // Animate progress bar
        gsap.to(progressBar, {
          scaleY: self.progress,
          duration: 0.1,
          ease: 'none'
        });

        // Calculate current slide
        const currentIndex = Math.floor(self.progress * projects.length);
        const boundedIndex = Math.min(currentIndex, projects.length - 1);

        // Update slide if changed (use ref to avoid stale closure)
        if (boundedIndex !== currentSlideRef.current && boundedIndex >= 0) {
          currentSlideRef.current = boundedIndex;
          setActiveSlide(boundedIndex);
          animateNewSlide(boundedIndex, imagesContainer);
        }
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate new slide image
  const animateNewSlide = (index, container) => {
    const newImage = document.createElement('img');
    newImage.src = projects[index].image;
    newImage.alt = projects[index].title;
    newImage.className = 'absolute inset-0 w-full h-full object-cover';

    // Set initial state
    gsap.set(newImage, {
      opacity: 0,
      scale: 1.1
    });

    container.appendChild(newImage);

    // Animate in
    gsap.to(newImage, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out'
    });

    // Cleanup old images
    const images = container.querySelectorAll('img');
    if (images.length > 3) {
      images[0].remove();
    }
  };

  return (
    <div className="w-full">
      {/* Slider Section */}
      <section ref={sliderRef} className="relative h-screen overflow-hidden">
        {/* Background Images */}
        <div ref={imagesContainerRef} className="absolute inset-0">
          {/* Dark overlay */}
          <div className="absolute inset-0 z-10 bg-foreground/40" />
        </div>

        {/* Project Title */}
        <div className="absolute inset-0 flex items-center justify-start z-20 px-12 md:px-24">
          <div className="max-w-2xl">
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight text-background"
            >
              {projects[activeSlide].title}
            </h2>
            <p 
              className="text-xl md:text-2xl mt-4 font-mono uppercase tracking-wider text-muted-foreground"
            >
              {projects[activeSlide].description}
            </p>
          </div>
        </div>

        {/* Side Indicator */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex items-center gap-6 z-20">
          {/* Slide Numbers */}
          <div className="flex flex-col gap-6">
            {projects.map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* Marker Line */}
                <div
                  className="h-[2px] origin-left transition-all duration-300 bg-background"
                  style={{
                    width: activeSlide === index ? '40px' : '0px',
                    opacity: activeSlide === index ? 1 : 0.3
                  }}
                />
                {/* Index Number */}
                <span
                  className="font-mono text-sm transition-opacity duration-300 text-background"
                  style={{
                    opacity: activeSlide === index ? 1 : 0.3
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="relative w-[2px] h-48 bg-background/30">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-full h-full origin-top bg-chart-2"
              style={{ 
                scaleY: 0
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmallProjects;