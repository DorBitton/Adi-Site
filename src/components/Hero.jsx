import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const [visibleWords, setVisibleWords] = useState({})
    const [showSubtext, setShowSubtext] = useState(false)
    const heroRef = useRef(null)
    const contentRef = useRef(null)
    
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
      const subtextDelay = totalAnimationTime + 400
  
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
        className="relative z-0 min-h-screen bg-[#93472D] flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24"
      >
        <div ref={contentRef}>
        <div className="max-w-6xl mx-auto w-full text-center mb-6 sm:mb-8">
          <h1 
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight"
            style={{fontFamily: 'Casta, serif'}}
          >
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['0-0'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Hey!{' '}
            </span>
            
            <span 
              className={`italic text-[#F7EFE2] transition-all duration-300 ${
                visibleWords['1-0'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              I'm{' '}
            </span>
            <span 
              className={`italic text-[#F7EFE2] transition-all duration-300 ${
                visibleWords['1-1'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Adi
            </span>
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['1-2'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              .
            </span>
            <br />
            
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['2-0'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              I{' '}
            </span>
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['2-1'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              used{' '}
            </span>
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['2-2'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              to{' '}
            </span>
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['2-3'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              design
            </span>
            <br />
            
            <span 
              className={`italic text-[#F7EFE2] transition-all duration-300 ${
                visibleWords['2-4'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Buildings
            </span>
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['2-5'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              .{' '}
            </span>
            
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['3-0'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Now{' '}
            </span>
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['3-1'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              I{' '}
            </span>
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['3-2'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              design{' '}
            </span>
            
            <span 
              className={`italic text-[#F7EFE2] transition-all duration-300 ${
                visibleWords['3-3'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Experiences
            </span>
            <span 
              className={`text-black transition-all duration-300 ${
                visibleWords['3-4'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              .
            </span>
          </h1>
        </div>
        
        <div className="max-w-4xl mx-auto w-full text-center px-4 ">
          <p className={`text-[#F7EFE2] font-lato-light text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed transition-all duration-1000 ${
            showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            a combination that shaped how I understand space, structure, and the way people interact with their environment.
          </p>
        </div>
        </div>
      </section>
    )
  }
  
const Transition = () => {
  const sectionRef = useRef(null)
  const topRowRef = useRef(null)
  const bottomRowRef = useRef(null)
  
  // Sample card data - you can customize this
  const cardData = [
    { id: 1, avatar: '👨‍💻', header: 'User Research', text: 'Understanding user needs through interviews and testing' },
    { id: 2, avatar: '🎨', header: 'Visual Design', text: 'Creating beautiful and functional interfaces' },
    { id: 3, avatar: '📐', header: 'Wireframing', text: 'Sketching layouts and user flows' },
    { id: 4, avatar: '🔍', header: 'Usability Testing', text: 'Validating designs with real users' },
    { id: 5, avatar: '💡', header: 'Ideation', text: 'Brainstorming creative solutions' },
    { id: 6, avatar: '📊', header: 'Data Analysis', text: 'Making informed design decisions' },
    { id: 7, avatar: '🤝', header: 'Collaboration', text: 'Working with cross-functional teams' },
    { id: 8, avatar: '🎯', header: 'Strategy', text: 'Aligning design with business goals' },
    { id: 9, avatar: '🚀', header: 'Prototyping', text: 'Building interactive mockups' },
    { id: 10, avatar: '✨', header: 'Innovation', text: 'Pushing boundaries of design' },
    { id: 11, avatar: '📱', header: 'Mobile First', text: 'Designing for all screen sizes' },
    { id: 12, avatar: '🏗️', header: 'Architecture', text: 'Structuring space and experience' },
    { id: 13, avatar: '🎭', header: 'Personas', text: 'Creating user archetypes' },
    { id: 14, avatar: '🔧', header: 'Tools', text: 'Mastering design software' },
    { id: 15, avatar: '🌟', header: 'Excellence', text: 'Striving for quality in every detail' },
    { id: 16, avatar: '🎪', header: 'Experience', text: 'Crafting memorable interactions' },
    { id: 17, avatar: '📝', header: 'Documentation', text: 'Clear design specifications' },
    { id: 18, avatar: '🎓', header: 'Learning', text: 'Continuous growth and development' },
    { id: 19, avatar: '🌈', header: 'Accessibility', text: 'Design for everyone' },
    { id: 20, avatar: '⚡', header: 'Performance', text: 'Fast and efficient solutions' }
  ]

  useEffect(() => {
    let tl;
    let marqueeTop;
    let marqueeBottom;
    let initTimeout;
    
    initTimeout = setTimeout(() => {
      // Set initial state
      gsap.set('.transition-titles', { opacity: 0, y: 0 })
      gsap.set('.transition-marquee', { opacity: 0 })

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

      tl.to('.transition-titles', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      })
      .to('.transition-marquee', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5')

      // Infinite marquee animations (slower speed)
      if (topRowRef.current) {
        const topRowWidth = topRowRef.current.scrollWidth / 2
        marqueeTop = gsap.to('.marquee-top', {
          x: -topRowWidth,
          duration: 80,
          ease: 'none',
          repeat: -1
        })
      }

      if (bottomRowRef.current) {
        const bottomRowWidth = bottomRowRef.current.scrollWidth / 2
        marqueeBottom = gsap.fromTo('.marquee-bottom',
          { x: -bottomRowWidth },
          {
            x: 0,
            duration: 80,
            ease: 'none',
            repeat: -1
          }
        )
      }
    }, 500)

    return () => {
      if (initTimeout) clearTimeout(initTimeout)
      if (tl) tl.kill()
      if (marqueeTop) marqueeTop.kill()
      if (marqueeBottom) marqueeBottom.kill()
      
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  const SkillCard = ({ avatar, header, text }) => (
    <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-lg p-6 mx-4 hover:shadow-2xl transition-shadow duration-300">
      {/* Avatar/Image on top */}
      <div className="flex justify-center mb-4">
        <div className="text-5xl">{avatar}</div>
      </div>
      
      
      {/* Header */}
      <h3 className="text-lg font-bold text-[#9E8E74] font-lato text-center mb-4">{header}</h3>
      
      
      {/* Description text */}
      <p className="text-sm text-gray-600 font-lato-light leading-relaxed text-center">{text}</p>
    </div>
  )

  return (
    <section 
      ref={sectionRef}
      id="Transition" 
      className="relative z-10 bg-[#F7EFE2] pt-40 pb-50"
    >
      {/* Centered Titles */}
      <div 
            className="transition-titles absolute opacity-0"
            style={{ 
              top: '-4vw',
              right: '36vw'
            }}
          >
            <div style={{ marginBottom: '-2.1vw' }}>
              <h2 className="text-[#F7EFE2] font-lato-bold " style={{ fontSize: '3.3vw' }}>
                UX Designer
              </h2>
            </div>
            <div className="text-center" style={{ marginTop: '-2.4vw', marginLeft: '12.1vw' }}>
              <h2 className="text-[#93472D] font-lato-bold " style={{ fontSize: '3.3vw' }}>
                Architect
              </h2>
            </div>
          </div>

      {/* Marquee Cards Container */}
      <div className="transition-marquee opacity-0 space-y-20">
        {/* Top Row - Scrolling Left */}
        <div className="relative overflow-hidden">
          <div ref={topRowRef} className="flex marquee-top">
            {/* First set of cards */}
            {cardData.slice(0, 10).map(card => (
              <SkillCard key={`top-1-${card.id}`} {...card} />
            ))}
            {/* Duplicate set for seamless loop */}
            {cardData.slice(0, 10).map(card => (
              <SkillCard key={`top-2-${card.id}`} {...card} />
            ))}
          </div>
        </div>

        {/* Bottom Row - Scrolling Right */}
        <div className="relative overflow-hidden">
          <div ref={bottomRowRef} className="flex marquee-bottom">
            {/* First set of cards */}
            {cardData.slice(10, 20).map(card => (
              <SkillCard key={`bottom-1-${card.id}`} {...card} />
            ))}
            {/* Duplicate set for seamless loop */}
            {cardData.slice(10, 20).map(card => (
              <SkillCard key={`bottom-2-${card.id}`} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero, Transition }
