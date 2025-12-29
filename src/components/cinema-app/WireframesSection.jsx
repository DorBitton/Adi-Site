import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WireframesSection = ({ wireframesRef }) => {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    let ctx = null
    
    const timer = setTimeout(() => {
      if (!wireframesRef.current) {
        ScrollTrigger.refresh()
        return
      }

      ctx = gsap.context(() => {
        // Wireframes section animation
        const wireframeItems = wireframesRef.current?.children || []
        gsap.fromTo(
          wireframeItems,
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
              trigger: wireframesRef.current,
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
  }, [wireframesRef])

  const baseUrl = import.meta.env.BASE_URL
  const wireframeImages = [
    { src: `${baseUrl}images/cinema-app/Lofi-Wireframe-Sketches/step 1.png`, alt: 'Cinema App screen 1' },
    { src: `${baseUrl}images/cinema-app/Lofi-Wireframe-Sketches/step 2.png`, alt: 'Cinema App screen 2' },
    { src: `${baseUrl}images/cinema-app/Lofi-Wireframe-Sketches/step 3 1.png`, alt: 'Cinema App screen 3' },
    { src: `${baseUrl}images/cinema-app/Lofi-Wireframe-Sketches/step 4.png`, alt: 'Cinema App screen 4' },
    { src: `${baseUrl}images/cinema-app/Lofi-Wireframe-Sketches/step 5 1.png`, alt: 'Cinema App screen 5' },
  ]

  return (
    <div ref={containerRef} className="w-full bg-black py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={wireframesRef} className="space-y-12 opacity-100">
          {/* Title */}
          <h2
            className="text-[50px] text-lato-bold font-bold text-center text-white mb-20"
          >
            Lofi Wireframe Sketches
          </h2>

          {/* Wireframes Grid */}
          <div className="flex flex-nowrap justify-center items-center gap-11">
            {wireframeImages.map((image, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[160px] lg:w-[200px]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WireframesSection

