import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const UXPatterns = ({ uxPatternsRef }) => {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    let ctx = null
    
    const timer = setTimeout(() => {
      if (!uxPatternsRef.current) {
        ScrollTrigger.refresh()
        return
      }

      ctx = gsap.context(() => {
        // UX Patterns section animation
        const patternBoxes = uxPatternsRef.current?.children || []
        gsap.fromTo(
          patternBoxes,
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
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: uxPatternsRef.current,
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
  }, [uxPatternsRef])

  const patterns = [
    {
      title: 'Strong Visual Hierarchy & Large Imagery',
      description: 'Across all platforms, content is displayed through large, high-quality images. This approach helps users immediately connect with the content and reduces the need to read long descriptions. It also creates an immersive, cinematic feel, which is relevant for any movie-related experience.',
      insight: 'Bold visuals can guide users smoothly through the app and make movie selection more intuitive and engaging.',
    },
    {
      title: 'Minimalistic, Clean Layouts',
      description: 'Most apps avoid clutter. Navigation is kept simple, with a limited number of core actions per screen. There is a clear emphasis on allowing the content to stand out while minimizing unnecessary UI elements.',
      insight: 'A clutter-free structure helps reduce cognitive load and creates a more accessible and enjoyable browsing experience.',
    },
    {
      title: 'Smooth, Frictionless Navigation',
      description: 'Seamless transitions and consistent navigation patterns allow users to move between categories, continue watching, or jump to new titles without confusion. Predictable structures like "home → categories → detail page" are common.',
      insight: 'For a cinema app, smooth navigation will help users browse showtimes and complete bookings with confidence.',
    },
    {
      title: 'Clear Action Buttons & Large Tap Areas',
      description: 'Easy-to-tap, well-labeled buttons are essential, especially for one-hand or TV device use. Call-to-action buttons (e.g., Play, Add to List, Buy/Rent) should be clear, prominent, and visually separated from secondary actions.',
      insight: 'Booking actions (e.g., choosing seats, selecting showtimes, completing payment) should be clearly prioritized and comfortable to tap.',
    },
    {
      title: 'Personalized & Engaging Experience',
      description: 'Supporting personalized recommendations and "continue watching" flows is important. Even without personalization, highlighting engaging categories like trending titles or new releases is important.',
      insight: 'Creating a sense of discovery through categories, highlights, or editorial picks makes browsing feel more fun and dynamic.',
    },
    {
      title: 'Modern Color Palettes & Cinematic Atmosphere',
      description: 'Common themes include darker backgrounds, high contrast, and vibrant colors to emphasize movie content and create a premium, cinematic atmosphere.',
      insight: 'Using modern colors and clear contrast can help elevate the overall experience and make the app feel contemporary.',
    },
  ]

  return (
    <div ref={containerRef} className="w-full bg-black">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={uxPatternsRef} className="space-y-8 opacity-100">
          {/* Patterns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {patterns.map((pattern) => (
              <div
                key={pattern.number}
                className="border border-neutral-700 rounded-lg p-6 lg:p-8 bg-neutral-900/50 hover:bg-neutral-900/70 transition-colors"
              >
                <div className="space-y-4">
                  <h3
                    className="text-xl lg:text-2xl font-extrabold text-white"
                    style={{ fontFamily: 'Lato, sans-serif' }}
                  >
                    {pattern.title}
                  </h3>
                  <p
                    className="text-sm lg:text-base text-neutral-300 leading-relaxed"
                    style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
                  >
                    {pattern.description}
                  </p>
                  <div className="pt-4 border-t border-neutral-700">
                    <p
                      className="text-sm lg:text-base text-white leading-relaxed font-medium"
                      style={{ fontFamily: 'Lato, sans-serif', fontWeight: 400 }}
                    >
                      <span className="text-neutral-400">Insight for my project:</span> {pattern.insight}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Concluding Summary */}
          <div className="max-w-4xl mx-auto mt-12">
            <p
              className="text-base lg:text-lg text-white leading-relaxed text-left mb-6"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
            >
              The reviewed apps share a common philosophy:
              <br />
              focus on visuals, simplify navigation, reduce clutter, and create an engaging and smooth viewing experience.
            </p>
            <p
              className="text-base lg:text-lg text-white leading-relaxed text-left"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
            >
              These insights guided the redesign of my cinema app, helping me move away from the original cluttered, outdated layout and toward a clean, modern, visually-driven, and more intuitive experience for browsing and booking movies.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UXPatterns

