import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMobile, useTablet, useDesktop } from '../../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const [visibleWords, setVisibleWords] = useState({})
    const [showSubtext, setShowSubtext] = useState(false)
    const heroRef = useRef(null)
    const contentRef = useRef(null)
    
    // Responsive hooks
    const isMobile = useMobile()
    const isTablet = useTablet()
    const isDesktop = useDesktop()
    
    const phrases = [
      {
        id: 0,
        words: [
          { text: 'Hey!', italic: false }
        ]
      },
      {
        id: 1,
        words: [
          { text: "I'm", italic: true },
          { text: 'Adi', italic: true },
          { text: '.', italic: false }
        ]
      },
      {
        id: 2,
        words: [
          { text: 'I', italic: false },
          { text: 'used', italic: false },
          { text: 'to', italic: false },
          { text: 'design', italic: false },
          { text: 'buildings', italic: true },
          { text: '.', italic: false }
        ]
      },
      {
        id: 3,
        words: [
          { text: 'Now', italic: false },
          { text: 'I', italic: false },
          { text: 'design', italic: false },
          { text: 'Experiences', italic: true },
          { text: '.', italic: false }
        ]
      }
    ]
  
    // Word animation effect
    useEffect(() => {
      const startDelay = 700
      const phrasesDelay = 600
      const wordDelay = 150
      
      phrases.forEach((phrase, phraseIndex) => {
        let phraseStartTime = startDelay + (phraseIndex * phrasesDelay)
        
        for (let i = 0; i < phraseIndex; i++) {
          phraseStartTime += phrases[i].words.length * wordDelay
        }
        
        phrase.words.forEach((word, wordIndex) => {
          setTimeout(() => {
            setVisibleWords(prev => ({
              ...prev,
              [`${phraseIndex}-${wordIndex}`]: true
            }))
          }, phraseStartTime + (wordIndex * wordDelay))
        })
      })
  
      const totalWords = phrases.reduce((total, phrase) => total + phrase.words.length, 0)
      const totalAnimationTime = startDelay + (phrases.length * phrasesDelay) + (totalWords * wordDelay)
      const subtextDelay = totalAnimationTime - 600
  
      setTimeout(() => {
        setShowSubtext(true)
      }, subtextDelay)
    }, [])

    // Hero pin at top and fade out text only
    useEffect(() => {
      let pinTrigger;
      let fadeTrigger;
      
      const initTimeout = setTimeout(() => {
        if (!heroRef.current || !contentRef.current) return
        
        // Pin the Hero section at the top
        pinTrigger = ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: '+=400vh',
          pin: true,
          pinSpacing: false,
          scroller: '#smooth-wrapper'
        })
        
        // Fade out only the content (text), not the background
        fadeTrigger = gsap.fromTo(contentRef.current, 
          {
            opacity: 1
          },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: '+=150vh',
              scrub: 1,
              scroller: '#smooth-wrapper'
            }
          }
        )
      }, 500)

      return () => {
        clearTimeout(initTimeout)
        if (pinTrigger) pinTrigger.kill()
        if (fadeTrigger) fadeTrigger.kill()
      }
    }, [])
  
    return (
      <section 
        ref={heroRef}
        id="hero" 
        className="relative z-0 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 bg-black"
      >
        <div ref={contentRef}>
        <div className="max-w-6xl mx-auto w-full text-center mb-6 sm:mb-8">
          <h1 
            className={`leading-tight ${
              isMobile ? 'text-[40px]' : 
              isTablet ? 'text-[56px]' : 
              'text-[96px]'
            }`}
            style={{fontFamily: 'Casta, serif'}}
          >
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['0-0'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Hey!{' '}
            </span>
            
            <span 
              className={`italic transition-all duration-300 text-primary ${
                visibleWords['1-0'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              I'm{' '}
            </span>
            <span 
              className={`italic transition-all duration-300 text-primary ${
                visibleWords['1-1'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Adi
            </span>
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['1-2'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              .
            </span>
            <br />
            
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['2-0'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              I{' '}
            </span>
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['2-1'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              used{' '}
            </span>
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['2-2'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              to{' '}
            </span>
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['2-3'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              design
            </span>
            <br />
            
            <span 
              className={`italic transition-all duration-300 text-primary ${
                visibleWords['2-4'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Buildings
            </span>
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['2-5'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              .{' '}
            </span>
            
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['3-0'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Now{' '}
            </span>
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['3-1'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              I{' '}
            </span>
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['3-2'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              design{' '}
            </span>
            
            <span 
              className={`italic transition-all duration-300 text-primary ${
                visibleWords['3-3'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Experiences
            </span>
            <span 
              className={`transition-all duration-300 text-foreground ${
                visibleWords['3-4'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              .
            </span>
          </h1>
        </div>
        
        <div className="max-w-4xl mx-auto w-full text-center px-4 mt-[7vh]">
          <p 
            className={`font-lato-light font-light leading-relaxed transition-all duration-1000 text-white ${
              isMobile ? 'text-[16px]' : 
              isTablet ? 'text-[18px]' : 
              'text-[24px]'
            } ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {isMobile ? (
              <>a combination that shaped how I understand space, structure, and the way people interact with their environment.</>
            ) : (
              <>a combination that shaped how I understand space, structure,<br />and the way people interact with their environment.</>
            )}
          </p>
        </div>
        </div>
      </section>
    )
  }
  
const Transition = () => {
  const sectionRef = useRef(null)
  
  // Responsive hooks
  const isMobile = useMobile()
  const isTablet = useTablet()
  
  // Sample card data - you can customize this
  const baseUrl = import.meta.env.BASE_URL
  const cardData = [
    { id: 1, gifSrc: `${baseUrl}images/cards/User Research.png`, header: 'User Research', text: 'Understanding user needs through interviews and testing' },
    { id: 2, gifSrc: `${baseUrl}images/cards/Visual Design.png`, header: 'Visual Design', text: 'Creating beautiful and functional interfaces' },
    { id: 3, gifSrc: `${baseUrl}images/cards/Wireframing.png`, header: 'Wireframing', text: 'Sketching layouts and user flows' },
    { id: 4, gifSrc: `${baseUrl}images/cards/Usability Testing.png`, header: 'Usability Testing', text: 'Validating designs with real users' },
    { id: 5, gifSrc: `${baseUrl}images/cards/Ideation.png`, header: 'Ideation', text: 'Brainstorming creative solutions' },
    { id: 6, gifSrc: `${baseUrl}images/cards/Data Analysis.png`, header: 'Data Analysis', text: 'Making informed design decisions' },
    { id: 7, gifSrc: `${baseUrl}images/cards/Collaboration.png`, header: 'Collaboration', text: 'Working with cross-functional teams' },
    { id: 8, gifSrc: `${baseUrl}images/cards/Strategy.png`, header: 'Strategy', text: 'Aligning design with business goals' },
    { id: 9, gifSrc: `${baseUrl}images/cards/Prototyping.png`, header: 'Prototyping', text: 'Building interactive mockups' },
    { id: 10, gifSrc: `${baseUrl}images/cards/Innovation.png`, header: 'Innovation', text: 'Pushing boundaries of design' },
    { id: 11, gifSrc: `${baseUrl}images/cards/Mobile First.png`, header: 'Mobile First', text: 'Designing for all screen sizes' },
    { id: 12, gifSrc: `${baseUrl}images/cards/Architecture.png`, header: 'Architecture', text: 'Structuring space and experience' },
    { id: 13, gifSrc: `${baseUrl}images/cards/Personas.png`, header: 'Personas', text: 'Creating user archetypes' },
    { id: 14, gifSrc: `${baseUrl}images/cards/Tools.png`, header: 'Tools', text: 'Mastering design software' },
    { id: 15, gifSrc: `${baseUrl}images/cards/Excellence.png`, header: 'Excellence', text: 'Striving for quality in every detail' },
    { id: 16, gifSrc: `${baseUrl}images/cards/Experience.png`, header: 'Experience', text: 'Crafting memorable interactions' },
    { id: 17, gifSrc: `${baseUrl}images/cards/Documentation.png`, header: 'Documentation', text: 'Clear design specifications' },
    { id: 18, gifSrc: `${baseUrl}images/cards/Learning.png`, header: 'Learning', text: 'Continuous growth and development' },
    { id: 19, gifSrc: `${baseUrl}images/cards/Accessibility.png`, header: 'Accessibility', text: 'Design for everyone' },
    { id: 20, gifSrc: `${baseUrl}images/cards/Performance.png`, header: 'Performance', text: 'Fast and efficient solutions' }
  ]

  useEffect(() => {
    if (!sectionRef.current) return
    
    let tl;
    let initTimeout;
    
    initTimeout = setTimeout(() => {
      // Set initial state - scoped to section
      const titles = sectionRef.current.querySelectorAll('.transition-titles')
      const marquee = sectionRef.current.querySelectorAll('.transition-marquee')
      
      if (titles.length) gsap.set(titles, { opacity: 0, y: 0 })
      if (marquee.length) gsap.set(marquee, { opacity: 0 })

      // Fade in animation
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
          scroller: '#smooth-wrapper'
        }
      })

      if (titles.length) {
        tl.to(titles, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        })
      }
      
      if (marquee.length) {
        tl.to(marquee, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.5')
      }

      // Add CSS-based infinite scroll animation
      // If user hasn't opted in for reduced motion, add the animation
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const scrollers = sectionRef.current.querySelectorAll(".scroller");
        
        scrollers.forEach((scroller) => {
          // Add data-animated="true" to enable animation
          scroller.setAttribute("data-animated", "true");

          // Make an array from the elements within `.scroller__inner`
          const scrollerInner = scroller.querySelector(".scroller__inner");
          if (!scrollerInner) return;
          
          const scrollerContent = Array.from(scrollerInner.children);

          // For each item in the array, clone it
          // add aria-hidden to it
          // add it into the `.scroller__inner`
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", "true");
            scrollerInner.appendChild(duplicatedItem);
          });
        });
      }
    }, 500)

    return () => {
      if (initTimeout) clearTimeout(initTimeout)
      if (tl) tl.kill()
      
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])


  const SkillCard = ({ avatar, gifSrc, header, text }) => (
    <div 
      className={`skill-card flex-shrink-0 backdrop-blur-2xl border-2 border-border shadow-lg rounded-2xl hover:shadow-2xl transition-shadow transition-all duration-300 bg-card/5 ${
        isMobile ? 'w-40 p-3' : 
        isTablet ? 'w-56 p-5' : 
        'w-64 p-6'
      }`}
    >
      {/* Avatar/Image on top */}
      <div className="flex justify-center mb-4">
        {gifSrc ? (
          <div className={`flex items-center justify-center ${
            isMobile ? 'w-[32px] h-[32px]' : 'w-[50px] h-[50px]'
          }`} style={{ minHeight: isMobile ? '32px' : '50px' }}>
            <img 
              src={gifSrc} 
              alt={header}
              style={{ 
                width: isMobile ? '32px' : '50px', 
                height: isMobile ? '32px' : '50px',
                objectFit: 'contain',
                opacity: 0.7
              }}
            />
          </div>
        ) : (
          <div className={isMobile ? 'text-3xl' : 'text-5xl'}>{avatar}</div>
        )}
      </div>
      
      {/* Header */}
      <h3 
        className={`font-lato-bold text-center text-primary ${
          isMobile ? 'text-base mb-2' : 'text-xl mb-4'
        }`}
      >{header}</h3>
      
      {/* Description text */}
      <p 
        className={`font-lato-light leading-relaxed text-center text-muted-foreground ${
          isMobile ? 'text-xs' : 'text-base'
        }`}
      >{text}</p>
    </div>
  )

  return (
    <section 
      ref={sectionRef}
      id="Transition" 
      className={`relative z-10 bg-card ${
        isMobile ? 'pt-24 pb-32' : 
        isTablet ? 'pt-32 pb-40' : 
        'pt-40 pb-50'
      }`}
    >

      {/* Marquee Cards Container */}
      <div className={`transition-marquee opacity-0 max-w-[1800px] mx-auto ${
        isMobile ? 'space-y-12 mt-16' : 'space-y-20 mt-24'
      }`}>
        {/* Top Row - Scrolling Left */}
        <div className="scroller" data-direction="left" data-speed="slow">
          <div className="scroller__inner">
            {cardData.slice(0, 10).map(card => (
              <SkillCard key={`top-${card.id}`} {...card} />
            ))}
          </div>
        </div>

        {/* Bottom Row - Scrolling Right */}
        <div className="scroller" data-direction="right" data-speed="slow">
          <div className="scroller__inner">
            {cardData.slice(10, 20).map(card => (
              <SkillCard key={`bottom-${card.id}`} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero, Transition }