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

  const baseUrl = import.meta.env.BASE_URL
  
  const prototypeRows = [
    // Row 1: 1, 2, 3, 4, 5
    [
      { src: `${baseUrl}images/cinema-app/Prototype/1.png`, alt: 'Screen 1' },
      { src: `${baseUrl}images/cinema-app/Prototype/2.png`, alt: 'Screen 2' },
      { src: `${baseUrl}images/cinema-app/Prototype/3.png`, alt: 'Screen 3' },
      { src: `${baseUrl}images/cinema-app/Prototype/4.png`, alt: 'Screen 4' },
      { src: `${baseUrl}images/cinema-app/Prototype/5.png`, alt: 'Screen 5' },
    ],
    // Row 2: 3a, 3b (centered)
    [
      { src: `${baseUrl}images/cinema-app/Prototype/3a.png`, alt: 'Screen 3a' },
      { src: `${baseUrl}images/cinema-app/Prototype/3b.png`, alt: 'Screen 3b' },
    ],
    // Row 3: 6, 7, 8, 9
    [
      { src: `${baseUrl}images/cinema-app/Prototype/6.png`, alt: 'Screen 6' },
      { src: `${baseUrl}images/cinema-app/Prototype/7.png`, alt: 'Screen 7' },
      { src: `${baseUrl}images/cinema-app/Prototype/8.png`, alt: 'Screen 8' },
      { src: `${baseUrl}images/cinema-app/Prototype/9.png`, alt: 'Screen 9' },
    ],
  ]

  return (
    <div ref={containerRef} className="w-full bg-black py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={prototypesRef} className="space-y-12 opacity-100">
          {/* Title */}
          <h2
            className="text-[50px] text-lato-bold font-bold text-center text-white mb-20"
          >
            Prototype
          </h2>

          {/* Prototypes Grid */}
          <div className="grid grid-cols-5 gap-6 justify-items-center mb-10">
            {/* Row 1: Photos 1, 2, 3, 4, 5 */}
            {prototypeRows[0].map((image, index) => (
              <div key={index} className="relative group w-[250px]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
                />
              </div>
            ))}
            
            {/* Row 2: Photos 3a, 3b (centered in columns 2-3) */}
            <div className="col-start-2 relative group w-[250px]">
              <img
                src={prototypeRows[1][0].src}
                alt={prototypeRows[1][0].alt}
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
              />
            </div>
            <div className="relative group w-[250px]">
              <img
                src={prototypeRows[1][1].src}
                alt={prototypeRows[1][1].alt}
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
              />
            </div>
            
            {/* Row 3: Photos 6, 7, 8, 9 (starting at column 2, under photo 2) */}
            <div className="col-start-2 relative group w-[250px]">
              <img
                src={prototypeRows[2][0].src}
                alt={prototypeRows[2][0].alt}
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
              />
            </div>
            {prototypeRows[2].slice(1).map((image, index) => (
              <div key={index + 1} className="relative group w-[250px]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
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

