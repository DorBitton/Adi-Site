import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ProblemGoal = ({ problemGoalRef }) => {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    let ctx = null
    
    const timer = setTimeout(() => {
      if (!problemGoalRef.current) {
        ScrollTrigger.refresh()
        return
      }

      ctx = gsap.context(() => {
        // Problem/Goal section animation
        const problemGoalItems = problemGoalRef.current?.children || []
        gsap.fromTo(
          problemGoalItems,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: problemGoalRef.current,
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
  }, [problemGoalRef])

  return (
    <div ref={containerRef} className="w-full bg-black py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Overview Title */}
        <h2
          className="text-[50px] text-lato-bold font-bold text-center text-white mb-16"
        >
          Overview
        </h2>

        <div
          ref={problemGoalRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 opacity-100"
        >
          {/* Problem */}
          <div className="space-y-4 text-center">
            <h3
              className="text-[24px] font-extrabold text-white mb-6"
              style={{ fontFamily: 'Lato, sans-serif' }}
            >
              Problem
            </h3>
            <p
              className="text-[20px] text-neutral-300 font-light leading-relaxed"
              style={{ fontFamily: 'Lato-light, sans-serif' }}
            >
            The original application suffered from a cluttered and inconsistent interface that made navigation confusing and unintuitive. The visual hierarchy was unclear, with too much information competing for attention on each screen, making it difficult for users to browse or discover movies easily. In addition, the application was not available in English, which limited accessibility and made the experience less intuitive for international users.
            </p>
          </div>

          {/* Goal */}
          <div className="space-y-4 text-center">
            <h3
              className="text-[24px] font-extrabold text-white mb-6"
              style={{ fontFamily: 'Lato, sans-serif' }}
            >
              Goal
            </h3>
            <p
              className="text-[20px] text-neutral-300 font-lato-light font-light leading-relaxed"
              style={{ fontFamily: 'Lato-light, sans-serif' }}
            >
            The goal of this project was to redesign the application with a clear and consistent structure that supports an intuitive user flow. The focus was on creating a modern visual style that emphasizes simplicity, strong hierarchy, and user engagement, while making the overall browsing experience more accessible and enjoyable for all users.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemGoal

