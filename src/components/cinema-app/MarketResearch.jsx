import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MarketResearch = ({ marketResearchRef }) => {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    let ctx = null
    
    const timer = setTimeout(() => {
      if (!marketResearchRef.current) {
        ScrollTrigger.refresh()
        return
      }

      ctx = gsap.context(() => {
        // Market Research section animation
        const children = marketResearchRef.current?.children || []
        gsap.fromTo(
          children,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: marketResearchRef.current,
              start: 'top 70%',
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
  }, [marketResearchRef])

  const streamingLogos = [
    { name: 'Netflix', src: '/images/cinema-app/market-research/netflix.png', alt: 'Netflix' },
    { name: 'Disney+', src: '/images/cinema-app/market-research/disney.png', alt: 'Disney+' },
    { name: 'Prime Video', src: '/images/cinema-app/market-research/prime.png', alt: 'Prime Video' },
    { name: 'HBO Max', src: '/images/cinema-app/market-research/hbo.png', alt: 'HBO Max' },
    { name: 'Apple TV+', src: '/images/cinema-app/market-research/apple.png', alt: 'Apple TV+' },
  ]

  return (
    <div ref={containerRef} className="w-full bg-black py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={marketResearchRef} className="space-y-12 opacity-100">
          {/* Title */}
          <h2
            className="text-3xl lg:text-5xl font-extrabold text-center text-white mb-8"
            style={{ fontFamily: 'Lato, sans-serif' }}
          >
            Market Research
          </h2>

          {/* Subtitle */}
          <p
            className="text-base lg:text-lg text-center text-white mb-8"
            style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
          >
            Streaming Apps Overview (General UX Patterns)
          </p>

          {/* Streaming Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 mb-12">
            {streamingLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 lg:h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Description Text */}
          <div className="max-w-4xl mx-auto space-y-6">
            <p
              className="text-sm lg:text-base text-neutral-300 leading-relaxed text-center"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
            >
              To understand current standards in entertainment and media apps, I analyzed several leading international platforms. Even though these are streaming services rather than cinema-booking apps, they set the tone for how users expect to browse, explore, and interact with visual content.
            </p>
            <p
              className="text-sm lg:text-base text-neutral-300 leading-relaxed text-center"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
            >
              From this review, several consistent UX patterns emerged:
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketResearch

