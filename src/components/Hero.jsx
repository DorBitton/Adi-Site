import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const [visibleWords, setVisibleWords] = useState({})
    const [showSubtext, setShowSubtext] = useState(false)
    
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
  
    return (
      <section 
        id="hero" 
        className="min-h-[80vh] bg-[#9E8E74] flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24"
      >
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
        
        <div className="max-w-4xl mx-auto w-full text-center px-4">
          <p className={`text-[#F7EFE2] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed transition-all duration-1000 ${
            showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            a combination that shaped how I understand space, structure, and the way people interact with their environment.
          </p>
        </div>
      </section>
    )
  }
  
const Transition = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  
  const videos = [
    '/images/transition/arch10.mp4',
    '/images/transition/arch6.mp4',
    '/images/transition/arch6.mp4',
    '/images/transition/arch6.mp4',
    '/images/transition/arch6.mp4',
    '/images/transition/arch6.mp4',
    '/images/transition/arch6.mp4',
    '/images/transition/arch6.mp4',
    '/images/transition/arch6.mp4',
  ]

  useEffect(() => {
    // Variables to hold the GSAP instances for cleanup
    let mobileTween;
    let tl;
    let initTimeout;
    
    // Wait a bit for ScrollSmoother to be ready
    initTimeout = setTimeout(() => {
      // Set initial state
      gsap.set('.transition-mobile', { opacity: 0, y: 30 })
      gsap.set('.transition-videos-left', { opacity: 0, x: -50 })
      gsap.set('.transition-titles', { opacity: 0, x: 50 })
      gsap.set('.transition-icons-container', { opacity: 0 })
      gsap.set('.transition-icons', { opacity: 0, y: 30 })
      gsap.set('.transition-text-container', { opacity: 0 })
      gsap.set('.transition-text-right', { opacity: 0, x: 50 })

      // Mobile layout fade in
      mobileTween = gsap.fromTo('.transition-mobile',
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          paused: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
            scroller: '#smooth-wrapper'
          }
        }
      )

      // Desktop layout animations
      tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
          scroller: '#smooth-wrapper'
        }
      })

      tl.fromTo('.transition-videos-left',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo('.transition-titles',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo('.transition-icons-container',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo('.transition-icons',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.transition-text-container',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo('.transition-text-right',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      )
    }, 500)

    return () => {
      // Clear the timeout if component unmounts before initialization
      if (initTimeout) clearTimeout(initTimeout);
      
      // 🧹 IMPORTANT: Explicitly kill the timeline and tween
      if (mobileTween) mobileTween.kill();
      if (tl) tl.kill();
      
      // Kill any ScrollTriggers specifically tied to this section's ref
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
            trigger.kill();
        }
      });
    }
  }, [])

  return (
    <>
      {/* Mobile Layout */}
<section 
  ref={sectionRef}
  id="Transition" 
  className="min-h-screen lg:hidden px-4 sm:px-6 py-12 sm:py-20 bg-[#F7EFE2] flex items-center justify-center"
  data-speed="0.8"
>
  <div className="transition-mobile space-y-16 max-w-2xl mx-auto opacity-0">
    {/* Titles */}
    <div className="text-center space-y-3">
      <h2 className="transition-titles text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#F7EFE2] font-lato" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        UX Designer
      </h2>
      <h2 className="transition-titles text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#9E8E74] font-lato">
        Architect
      </h2>
    </div>

    {/* Skills - No video grid */}
    <div className="space-y-12">
      <div className="text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 flex items-center justify-center">
          <img 
            src="/images/transition/small_icons/1.png" 
            alt="Design process icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#9E8E74] mb-4">
          Design process
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-lg mx-auto">
          research, ideation, and refinement, focused on user needs and context.
        </p>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 flex items-center justify-center">
          <img 
            src="/images/transition/small_icons/2.png" 
            alt="Teamwork icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#9E8E74] mb-4">
          Work in multi-disciplinary teams
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-lg mx-auto">
          Teamwork across diverse expertise. Collaboration between designers, engineers, and other professionals.
        </p>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 flex items-center justify-center">
          <img 
            src="/images/transition/small_icons/3.png" 
            alt="Client communication icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#9E8E74] mb-4">
          Deal with clients and stakeholders
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-lg mx-auto">
          Clear communication and feedback integration. Translating goals and constraints into effective solutions.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Desktop Layout */}
      <section 
        id="Transition" 
        className="min-h-[60vh] px-6 py-20 relative hidden lg:block bg-[#F7EFE2]"
        data-speed="0.9"
      >
        <div className="max-w-7xl mx-auto h-full flex items-center">
          
          {/* Left side - 3 columns with 3 videos each */}
          <div className="transition-videos-left absolute left-[4.17%] flex w-1/3 mt-[15%] opacity-0"
          style={{ gap: '1.5vw' }}>
            {/* Column 1 */}
            <div className="flex flex-col w-1/3" style={{ gap: '1vw' }}>
              {[0, 1, 2].map(i => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ width: '10vw', height: '10vw' }}>
                  <video 
                    src={videos[i]} 
                    alt={`Video ${i + 1}`} 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                </div>
              ))}
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col w-1/3" style={{ gap: '1vw' }}>
              {[3, 4, 5].map(i => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ width: '10vw', height: '10vw' }}>
                  <video 
                    src={videos[i]} 
                    alt={`Video ${i + 1}`} 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                </div>
              ))}
            </div>
            
            {/* Column 3 */}
            <div className="flex flex-col w-1/3" style={{ gap: '1vw' }}>
              {[6, 7, 8].map(i => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ width: '10vw', height: '10vw' }}>
                  <video 
                    src={videos[i]} 
                    alt={`Video ${i + 1}`} 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Middle - 3 small icons */}
          <div className="transition-icons-container absolute top-[12%] right-[35%] flex flex-col w-1/3 justify-center items-center opacity-0"
          style={{ gap: '7vw' }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="transition-icons flex items-center justify-center" style={{ width: '3vw', height: '3vw' }}>
                <img 
                  src={`/images/transition/small_icons/${i}.png`}
                  alt="Icon" 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Right side - Titles */}
          <div 
            className="transition-titles absolute opacity-0"
            style={{ 
              top: '-3.5vw',
              right: '22vw'
            }}
          >
            <div style={{ marginBottom: '-1.9vw' }}>
              <h2 className="font-extrabold text-[#F7EFE2] font-lato" style={{ fontSize: '2.8vw' }}>
                UX Designer
              </h2>
            </div>
            <div className="text-center" style={{ marginLeft: '11.2vw' }}>
              <h2 className="font-extrabold text-[#9E8E74] font-lato" style={{ fontSize: '2.8vw' }}>
                Architect
              </h2>
            </div>
          </div>

          {/* Right side - Text descriptions */}
          <div className="transition-text-container absolute top-[10%] right-[15%] w-1/3 flex flex-col items-center opacity-0"
          style={{ gap: '4vw' }}>
            {[
              { title: 'Design process', text: 'research, ideation, and refinement, focused on user needs and context.' },
              { title: 'Work in multi-disciplinary teams', text: 'Teamwork across diverse expertise. Collaboration between designers, engineers, and other professionals.' },
              { title: 'Deal with clients and stakeholders', text: 'Clear communication and feedback integration. Translating goals and constraints into effective solutions.' }
            ].map((item, i) => (
              <div key={i} className="transition-text-right text-center">
                <h2 className="font-bold text-[#9E8E74] mb-4" style={{ fontSize: '1.4vw' }}>
                  {item.title}
                </h2>
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: '0.9vw' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}

export { Hero, Transition }