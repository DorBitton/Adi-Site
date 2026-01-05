import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PrototypesSection = ({ prototypesRef }) => {
  const containerRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [useCarousel, setUseCarousel] = useState(false)

  // Check if screen width can fit the images
  useEffect(() => {
    const checkScreenWidth = () => {
      // Row 1 needs: 6 images * 200px + 5 gaps * 32px + padding = ~1360px
      // Add some buffer for padding (48px each side = 96px total)
      const minWidthNeeded = 1360 + 96
      setUseCarousel(window.innerWidth < minWidthNeeded)
    }

    checkScreenWidth()
    window.addEventListener('resize', checkScreenWidth)
    return () => window.removeEventListener('resize', checkScreenWidth)
  }, [])

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
    // Row 1: 1, 2, Arrow 1, 3, 3a, 3b
    [
      { src: `${baseUrl}images/cinema-app/Prototype/1.png`, alt: 'Screen 1' },
      { src: `${baseUrl}images/cinema-app/Prototype/2.png`, alt: 'Screen 2' },
      { src: `${baseUrl}images/cinema-app/Prototype/Arrow 1.png`, alt: 'Arrow 1' },
      { src: `${baseUrl}images/cinema-app/Prototype/3.png`, alt: 'Screen 3' },
      { src: `${baseUrl}images/cinema-app/Prototype/3a.png`, alt: 'Screen 3a' },
      { src: `${baseUrl}images/cinema-app/Prototype/3b.png`, alt: 'Screen 3b' },
    ],
    // Row 2: 3, 4, 5
    [
      { src: `${baseUrl}images/cinema-app/Prototype/3.png`, alt: 'Screen 3' },
      { src: `${baseUrl}images/cinema-app/Prototype/4.png`, alt: 'Screen 4' },
      { src: `${baseUrl}images/cinema-app/Prototype/5.png`, alt: 'Screen 5' },
    ],
    // Row 3: 6, 7, 8, 9
    [
      { src: `${baseUrl}images/cinema-app/Prototype/6.png`, alt: 'Screen 6' },
      { src: `${baseUrl}images/cinema-app/Prototype/7.png`, alt: 'Screen 7' },
      { src: `${baseUrl}images/cinema-app/Prototype/8.png`, alt: 'Screen 8' },
      { src: `${baseUrl}images/cinema-app/Prototype/9.png`, alt: 'Screen 9' },
    ],
  ]

  // Flatten all images for mobile carousel
  const allImages = prototypeRows.flat()

  // Navigation functions for mobile carousel
  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  // Get the flow text based on current image index
  const getFlowText = (index) => {
    if (index < prototypeRows[0].length) {
      return 'Entry & Movie Discovery Flow'
    } else if (index < prototypeRows[0].length + prototypeRows[1].length) {
      return 'Movie Selection Flow'
    } else {
      return 'Checkout & Payment Flow'
    }
  }

  return (
    <div ref={containerRef} className="w-full bg-black py-16 lg:py-24">
      <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-12">
        <div ref={prototypesRef} className="space-y-12 opacity-100">
          {/* Title */}
          <h2
            className="text-[50px] text-lato-bold font-bold text-center text-white"
          >
            High-Fi Mockups
          </h2>
          
          <p className="text-[20px] text-neutral-300 font-light leading-relaxed text-center mb-12">
            The following screens present the final high-fidelity mockups used to validate the visual design before prototyping and development.
          </p>

          {/* iPhone 16 Pro Image - Centered on its own line */}
          <div className="flex justify-center mb-20">
            <div className="relative group w-[960px]">
              <img
                src={`${baseUrl}images/cinema-app/Prototype/iPhone 16 Pro.png`}
                alt="iPhone 16 Pro Mockup"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
              />
            </div>
          </div>

          {useCarousel ? (
            /* Mobile/Tablet: Carousel with navigation buttons */
            <div className="relative w-full px-4">
              {/* Carousel Container */}
              <div className="relative flex justify-center items-center">
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-0 z-10 p-2 bg-neutral-800/80 hover:bg-neutral-700 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                {/* Image */}
                <div className="w-full max-w-[300px] mx-12">
                  <img
                    src={allImages[currentImageIndex].src}
                    alt={allImages[currentImageIndex].alt}
                    className="w-full h-auto object-contain rounded-lg shadow-lg"
                  />
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 z-10 p-2 bg-neutral-800/80 hover:bg-neutral-700 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Image Counter */}
              <div className="text-center mt-4 text-neutral-300 text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>

              {/* Flow Text Label */}
              <div className="text-center mt-6">
                <h3 className="text-[18px] leading-relaxed text-white"
                    style={{ fontFamily: 'Lato-light, sans-serif', fontWeight: 100 }}>
                  {getFlowText(currentImageIndex)}
                </h3>
              </div>
            </div>
          ) : (
            /* Desktop/Tablet: Flexible grid layout */
            <div className="w-full">
              {/* Row 1: Centered with 6 images */}
              <div className="flex justify-center gap-8 mb-6">
                {prototypeRows[0].map((image, index) => (
                  <div key={index} className="relative group w-[200px] flex-shrink-0">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>

              {/* Text Label - Aligned with Row 1 */}
              <div className="flex justify-center mb-20">
                <div className="w-full max-w-[1360px]">
                  <h3 className="text-[20px] text-neutral-300 font-light leading-relaxed">
                    Entry & Movie Discovery Flow
                  </h3>
                </div>
              </div>

              {/* Row 2: Offset to align first image under second image of Row 1 */}
              <div className="flex justify-center">
                <div className="w-full max-w-[1360px] flex gap-8 mb-6 justify-center items-center ml-[-230px]" >
                  {prototypeRows[1].map((image, index) => (
                    <div key={index} className="relative group w-[200px] flex-shrink-0">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Label - Aligned with Row 2 */}
              <div className="flex justify-center mb-20 items-center">
                <div className="ml-[-710px]" >
                  <h3 className="text-[20px] text-neutral-300 font-light leading-relaxed">
                    Movie Selection Flow
                  </h3>
                </div>
              </div>

              {/* Row 3: Offset to align first image under second image of Row 1 */}
              <div className="flex justify-center">
                <div className="w-full max-w-[1360px] flex gap-8 mb-6 justify-center items-center">
                  {prototypeRows[2].map((image, index) => (
                    <div key={index} className="relative group w-[200px] flex-shrink-0">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Label - Aligned with Row 3 */}
              <div className="flex justify-center items-center">
                <div className="ml-[-670px]">
                  <h3 className="text-[20px] text-neutral-300 font-light leading-relaxed" >
                    Checkout & Payment Flow
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mt-50 flex flex-col items-center">
            <h2 className="text-[50px] text-lato-bold font-bold text-center text-white mb-10">
              Next Steps
            </h2>
            
            <div className="space-y-8 max-w-4xl">
              {/* Prototype & Test */}
              <div className="flex gap-4">
                <span className="text-white text-[20px] mt-1">•</span>
                <div>
                  <h3 className="text-[24px] font-bold text-white mb-2"
                      style={{ fontFamily: 'Lato, sans-serif' }}>
                    Prototype & Test
                  </h3>
                  <p className="text-[20px] text-neutral-300 font-light leading-relaxed">
                    Turn the high-fidelity mockups into a clickable prototype to validate the user flows with real users.
                  </p>
                </div>
              </div>

              {/* Refine Based on Feedback */}
              <div className="flex gap-4">
                <span className="text-white text-[20px] mt-1">•</span>
                <div>
                  <h3 className="text-[24px] font-bold text-white mb-2"
                      style={{ fontFamily: 'Lato, sans-serif' }}>
                    Refine Based on Feedback
                  </h3>
                  <p className="text-[20px] text-neutral-300 font-light leading-relaxed">
                    Make adjustments to navigation, seat selection, and booking processes to ensure a smooth, intuitive experience.
                  </p>
                </div>
              </div>

              {/* Enhance Personalization */}
              <div className="flex gap-4">
                <span className="text-white text-[20px] mt-1">•</span>
                <div>
                  <h3 className="text-[24px] font-bold text-white mb-2"
                      style={{ fontFamily: 'Lato, sans-serif' }}>
                    Enhance Personalization
                  </h3>
                  <p className="text-[20px] text-neutral-300 font-light leading-relaxed">
                    Add recommendations and highlighted movies to create a more engaging and tailored experience for each user.
                  </p>
                </div>
              </div>

              {/* Prepare for Development */}
              <div className="flex gap-4">
                <span className="text-white text-[20px] mt-1">•</span>
                <div>
                  <h3 className="text-[24px] font-bold text-white mb-2"
                      style={{ fontFamily: 'Lato, sans-serif' }}>
                    Prepare for Development
                  </h3>
                  <p className="text-[20px] text-neutral-300 font-light leading-relaxed">
                    Once tested and refined, hand over the design to developers for implementation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrototypesSection

