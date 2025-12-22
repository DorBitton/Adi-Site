import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CinemaAppHero = ({ titleRef, subtitleRef, mainImageRef }) => {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    let ctx = null
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!titleRef.current || !subtitleRef.current || !mainImageRef.current) {
        ScrollTrigger.refresh()
        return
      }

      ctx = gsap.context(() => {
        // Title animation
        gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Subtitle animation
        gsap.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Main image animation
        gsap.fromTo(
          mainImageRef.current,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mainImageRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        ScrollTrigger.refresh()
      }, containerRef)
    }, 50)

    return () => {
      clearTimeout(timer)
      if (ctx) {
        ctx.revert()
      }
    }
  }, [titleRef, subtitleRef, mainImageRef])

  return (
    <div ref={containerRef} className="w-full min-h-screen flex flex-col pt-20 lg:pt-32 bg-card" >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col flex-1">
        {/* Title Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1
            ref={titleRef}
            className="text-6xl lg:text-8xl xl:text-[100px] font-thin mb-4 text-white tracking-wide opacity-100"
            style={{ fontFamily: 'Casta, serif' }}
          >
            Cinema App
          </h1>
          <p
            ref={subtitleRef}
            className="text-base lg:text-xl text-neutral-400 max-w-xl mx-auto opacity-100"
            style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
          >
            UI/UX redesign project of an existing movie app
          </p>
        </div>

        {/* Main Image - positioned at bottom */}
        <div className="flex justify-center mt-auto mb-0">
          <img
            ref={mainImageRef}
            src="/images/cinema-app/v429_133.png"
            alt="Cinema App main view"
            className="w-full max-w-[300px] lg:max-w-[400px] h-auto opacity-100"
          />
        </div>
      </div>
    </div>
  )
}

export default CinemaAppHero

