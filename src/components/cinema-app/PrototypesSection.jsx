import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PrototypesSection = ({ prototypesRef }) => {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    let ctx = null
    
    const timer = setTimeout(() => {
      if (!prototypesRef.current) {
        ScrollTrigger.refresh()
        return
      }

      ctx = gsap.context(() => {
        // Prototypes section animation
        const prototypeItems = prototypesRef.current?.children || []
        gsap.fromTo(
          prototypeItems,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: prototypesRef.current,
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
  }, [prototypesRef])

  const prototypeImages = [
    { src: '/images/cinema-app/Prototype/home.png', alt: 'Home Screen Prototype' },
    { src: '/images/cinema-app/Prototype/movie-details.png', alt: 'Movie Details Prototype' },
    { src: '/images/cinema-app/Prototype/showtimes.png', alt: 'Showtimes Prototype' },
    { src: '/images/cinema-app/Prototype/seat-selection.png', alt: 'Seat Selection Prototype' },
  ]

  return (
    <div ref={containerRef} className="w-full bg-black py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={prototypesRef} className="space-y-12 opacity-100">
          {/* Title */}
          <h2
            className="text-3xl lg:text-5xl font-extrabold text-center text-white mb-12"
            style={{ fontFamily: 'Lato, sans-serif' }}
          >
            Prototype
          </h2>

          {/* Prototypes Grid */}
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8">
            {prototypeImages.map((image, index) => (
              <div
                key={index}
                className="relative group flex-shrink-0 w-[200px] lg:w-[280px]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrototypesSection

