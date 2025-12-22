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
          className="text-3xl lg:text-5xl font-extrabold text-center text-white mb-12 lg:mb-16"
          style={{ fontFamily: 'Lato, sans-serif' }}
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
              className="text-xl lg:text-2xl font-extrabold text-white mb-6"
              style={{ fontFamily: 'Lato, sans-serif' }}
            >
              Problem
            </h3>
            <p
              className="text-sm lg:text-base text-neutral-300 leading-relaxed"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
            >
              The original app had a cluttered interface and a confusing flow that made it
              difficult for users to browse and discover movies easily. In this redesign, I
              focused on creating a clear, structured, and modern experience that supports
              intuitive navigation and highlights visual content.
            </p>
          </div>

          {/* Goal */}
          <div className="space-y-4 text-center">
            <h3
              className="text-xl lg:text-2xl font-extrabold text-white mb-6"
              style={{ fontFamily: 'Lato, sans-serif' }}
            >
              Goal
            </h3>
            <p
              className="text-sm lg:text-base text-neutral-300 leading-relaxed"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
            >
              To redesign the app with a clear structure, intuitive flow, and modern visual
              style, focusing on simplicity, hierarchy, and user engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemGoal

