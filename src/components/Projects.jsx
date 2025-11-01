import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {  
  const sectionRef = useRef(null)
  const desktopSectionRef = useRef(null)
  const cardRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: 'Cinema Application',
      description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
      image: '/images/projects/cinema.png'
    }
  ]

  useEffect(() => {
    let mobileTween, desktopTween;
    
    // Delay to ensure ScrollSmoother is ready
    const timer = setTimeout(() => {
      // Mobile animation
      if (sectionRef.current) {
        gsap.set(sectionRef.current, { opacity: 0, y: 50 })
        mobileTween = gsap.to(sectionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
            scroller: '#smooth-wrapper'
          }
        })
      }

      // Desktop animation
      if (desktopSectionRef.current) {
        gsap.set(desktopSectionRef.current, { opacity: 0, y: 50 })
        desktopTween = gsap.to(desktopSectionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: desktopSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
            scroller: '#smooth-wrapper'
          }
        })
      }

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(timer)
      if (mobileTween) mobileTween.kill()
      if (desktopTween) desktopTween.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current || trigger.vars.trigger === desktopSectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  return (
    <div id="projects" data-speed="0.9">
      {/* Mobile Layout */}
      <section 
        ref={sectionRef}
        className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 lg:hidden flex justify-center items-center px-4 sm:px-6"
      >
        <div className="bg-[#93472D] shadow-2xl p-6 sm:p-8 md:p-12 w-full max-w-4xl rounded-lg">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="flex flex-col gap-6 sm:gap-8"
            >
              {/* Project Info */}
              <div className="p-4 sm:p-6">
                <div className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-white" style={{fontFamily: 'Lato, sans-serif'}}>
                  Featured Project
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white" style={{fontFamily: 'Casta, sans-serif'}}>
                  {project.title}
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-white" style={{fontFamily: 'Lato, sans-serif'}}>
                  {project.description}
                </p>
              </div>

              {/* Project Image */}
              <div className="relative flex justify-center items-center">
                <div 
                  className="w-full rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => window.open(`/project/${project.id}`, '_blank')}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Desktop Layout */}
      <section 
        ref={desktopSectionRef}
        className="hidden lg:flex justify-center items-center"
        style={{ paddingTop: '8vw', paddingBottom: '8vw' }}
      >
        <div 
          className="bg-[#93472D]"
          style={{ 
            padding: '2vw',
            width: '95vw',
            maxWidth: '2800px'
          }}
        >
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-2 items-center h-full ${
                index !== projects.length - 1 ? 'mb-8' : ''
              }`}
              style={{ gap: '2vw' }}
            >
              {/* Project Info */}
              <div 
                className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}
                style={{ padding: '2vw' }}
              >
                <div 
                  className="font-medium mb-4 text-white" 
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '1.1vw'
                  }}
                >
                  Featured Project
                </div>
                <h2 
                  className="font-bold mb-8 text-white" 
                  style={{
                    fontFamily: 'Casta, sans-serif',
                    fontSize: '3.5vw'
                  }}
                >
                  {project.title}
                </h2>
                <p 
                  className="leading-relaxed text-white" 
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '1.2vw',
                    lineHeight: '1.6'
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Project Image */}
              <div className={`relative h-full flex justify-center items-center ${
                index % 2 === 1 ? 'lg:order-1' : ''
              }`}>
                <div 
                  className="w-full h-full rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => window.open(`/project/${project.id}`, '_blank')}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects