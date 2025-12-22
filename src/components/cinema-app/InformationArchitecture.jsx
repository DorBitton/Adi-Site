import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const InformationArchitecture = ({ iaRef }) => {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    let ctx = null
    
    const timer = setTimeout(() => {
      if (!iaRef.current) {
        ScrollTrigger.refresh()
        return
      }

      ctx = gsap.context(() => {
        // IA section animation
        const children = iaRef.current?.children || []
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
              trigger: iaRef.current,
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
  }, [iaRef])

  const coreScreens = [
    {
      title: 'Welcome Screen',
      description: 'A simple entry point.',
    },
    {
      title: 'Home',
      description: 'A central hub for movies, categories, and browsing.',
    },
    {
      title: 'Movie Info',
      description: 'A focused page with poster, details, trailer, and synopsis (without showtimes to avoid clutter).',
    },
    {
      title: 'Choose Time',
      description: 'A screen for available screening times.',
    },
    {
      title: 'Choose Seat',
      description: 'An interactive seating map with order summary and transition to payment.',
    },
    {
      title: 'Pay',
      description: 'A multi-step checkout process including order details, payment method, card entry, and confirmation.',
    },
  ]

  return (
    <div ref={containerRef} className="w-full bg-black py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={iaRef} className="space-y-12 opacity-100">
          {/* Title */}
          <h2
            className="text-3xl lg:text-5xl font-extrabold text-center text-white mb-8"
            style={{ fontFamily: 'Lato, sans-serif' }}
          >
            Information Architecture (IA)
          </h2>

          {/* User Flow */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 lg:p-8 mb-8">
              <h3
                className="text-xl lg:text-2xl font-extrabold text-white mb-4"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                User Flow
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-sm lg:text-base text-white">
                <span>Home</span>
                <span className="text-neutral-500">→</span>
                <span>Movie Details</span>
                <span className="text-neutral-500">→</span>
                <span>Showtimes</span>
                <span className="text-neutral-500">→</span>
                <span>Seat Selection</span>
                <span className="text-neutral-500">→</span>
                <span>Payment</span>
                <span className="text-neutral-500">→</span>
                <span>Confirmation</span>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-sm lg:text-base text-neutral-300 leading-relaxed text-center mb-12"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
            >
              The goal of the IA is to create a seamless and intuitive movie-booking experience by simplifying navigation and guiding users through the booking flow.
            </p>

            {/* Core Screens */}
            <div className="mb-8">
              <h3
                className="text-xl lg:text-2xl font-extrabold text-white mb-6 text-center"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                Core Screens
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {coreScreens.map((screen, index) => (
                  <div
                    key={index}
                    className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-4 lg:p-6"
                  >
                    <h4
                      className="text-base lg:text-lg font-extrabold text-white mb-2"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                    >
                      {screen.title}
                    </h4>
                    <p
                      className="text-xs lg:text-sm text-neutral-300 leading-relaxed"
                      style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
                    >
                      {screen.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion */}
            <p
              className="text-sm lg:text-base text-neutral-300 leading-relaxed text-center"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
            >
              This structure reduces cognitive load and helps users complete purchases quickly and confidently.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationArchitecture

