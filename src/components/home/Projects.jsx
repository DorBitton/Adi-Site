import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ArrowUpRight } from 'lucide-react'
import { useMobile, useTablet, useTabletLg, useDesktop } from '../../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const Projects = () => {  
  const sectionRef = useRef(null)
  
  // Responsive hooks
  const isMobile = useMobile()
  const isTablet = useTablet()
  const isTabletLg = useTabletLg()
  const isDesktop = useDesktop()

  const baseUrl = import.meta.env.BASE_URL
  const projects = [
    {
      id: 1,
      title: 'Cinema Application',
      company: 'UI/UX Design',
      year: '24',
      description: 'UI/UX redesign of a movie booking app, transforming a cluttered interface into a clean, modern experience. Features intuitive navigation, bold visual hierarchy, and a streamlined booking flow from browsing to seat selection.',
      image: `${baseUrl}images/projects/1.png`,
      link: '/cinema-app'
    }
  ]

  useEffect(() => {
    let tween;
    
    // Delay to ensure ScrollSmoother is ready
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        gsap.set(sectionRef.current, { force3D: true })
        tween = gsap.fromTo(sectionRef.current,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play reverse play reverse',
              scroller: '#smooth-wrapper'
            }
          }
        )
      }

      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(timer)
      if (tween) tween.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div id="projects" className={`w-full bg-card ${
      isMobile ? 'py-12 px-4' : 
      isTablet ? 'py-16 px-6' : 
      'py-20 px-6 lg:px-12'
    }`}>
      <section 
        ref={sectionRef}
        className="h-auto lg:min-h-[85vh]"

      >
        <div className="grid grid-cols-1 gap-8 h-auto lg:min-h-[80vh] lg:w-[75vw] mx-auto">
          {projects.map((project) => (
            project.link?.startsWith('/') ? (
              <Link
                key={project.id}
                to={project.link}
                className={`group relative block cursor-pointer bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 border border-neutral-700/40 transition-all duration-500 hover:border-neutral-600/60 no-underline ${
                  isMobile ? 'rounded-2xl p-2' : 
                  isTablet ? 'rounded-3xl p-2.5' : 
                  'rounded-[2.5rem] p-3'
                }`}
              >
                {/* Inner Card */}
                <div className={`relative overflow-hidden border border-neutral-700 bg-gradient-to-br from-[#252525] to-[#101010] transition-all duration-500 hover:border-neutral-500 h-full ${
                  isMobile ? 'rounded-xl p-6' : 
                  isTablet ? 'rounded-2xl p-8' : 
                  'rounded-[2rem] p-10 lg:p-14'
                }`}>
                  {/* Glare effects */}
                  <div className="pointer-events-none absolute inset-0 z-0">
                    {/* Background radial glow - Pink theme */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-60 bg-[radial-gradient(circle_at_50%_0,#ff558833,#0000_80%),radial-gradient(circle_at_50%_0,#5c0a2a,#0000)]" />
                    {/* Top glare line - Pink tint */}
                    <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-pink-500/40 to-transparent opacity-20" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
                    {/* Text Content */}
                    <div className={isMobile ? 'space-y-4' : isTablet ? 'space-y-6' : 'space-y-8'}>
                      <p className={`font-light font-lato-light text-neutral-300 tracking-wider ${
                        isMobile ? 'text-lg -translate-y-[1vh]' : 
                        isTablet ? 'text-xl -translate-y-[2vh]' : 
                        'text-2xl -translate-y-[3vh]'
                      }`}>
                        Featured Project
                      </p>
                      <h2
                        className={`font-bold text-neutral-100 leading-tight ${
                          isMobile ? 'text-[32px]' : 
                          isTablet ? 'text-[40px]' : 
                          'text-[52px]'
                        }`}
                        style={{ fontFamily: 'Casta, serif' }}
                      >
                        <span className="italic">Cinema Application</span>
                      </h2>
                      <p className={`font-light font-lato-light text-neutral-300 mx-auto text-center leading-relaxed ${
                        isMobile ? 'text-[16px] max-w-full' : 
                        isTablet ? 'text-[18px] max-w-2xl' : 
                        'text-[20px] max-w-3xl'
                      }`}>
                        UI/UX redesign of a movie booking app, transforming a cluttered interface
                        into a clean, modern experience. Features intuitive navigation, bold visual
                        hierarchy, and a streamlined booking flow from browsing to seat selection.
                      </p>
                    </div>

                    {/* Images */}
                    {isMobile ? (
                      // Mobile: Single iPhone 16 Pro Image
                      <div className="flex w-full justify-center items-center mt-4">
                        <img
                          src={`${baseUrl}images/cinema-app/Prototype/iPhone 16 Pro.png`}
                          alt="iPhone 16 Pro - Cinema App"
                          className="w-full max-w-[493px] h-auto rounded-lg object-contain"
                        />
                      </div>
                    ) : (
                      // Tablet/Desktop: 4 Images in a line
                      <div className={`flex w-full justify-center items-center ${
                        isTablet ? 'flex-row flex-wrap gap-3 max-w-3xl mt-6' : 
                        'flex-row gap-4 max-w-4xl mt-8'
                      }`}>
                        {[1, 2, 3, 4].map((index) => (
                          <img
                            key={index}
                            src={`${baseUrl}images/projects/CinemaApp/${index}.png`}
                            alt={`Cinema App screenshot ${index}`}
                            className={`max-w-full h-auto rounded-lg object-contain ${
                              isTablet ? 'flex-1 min-w-[45%]' : 'flex-1'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Arrow Button */}
                  <div className={`absolute right-6 top-6 flex items-center justify-center rounded-full border border-neutral-600 bg-neutral-800/50 backdrop-blur-sm transition-all duration-500 hover:bg-neutral-700 z-20 ${
                    isMobile ? 'h-10 w-10' : 'h-12 w-12 lg:h-14 lg:w-14'
                  }`}>
                    <ArrowUpRight className={isMobile ? 'w-5 h-5 text-neutral-200' : 'w-6 h-6 lg:w-7 lg:h-7 text-neutral-200'} />
                  </div>
                </div>
              </Link>
            ) : (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group relative block cursor-pointer bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 rounded-[2.5rem] border border-neutral-700/40 transition-all duration-500 hover:border-neutral-600/60 p-3 no-underline"
              >
                {/* Inner Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-neutral-700 bg-gradient-to-br from-[#252525] to-[#101010] p-10 lg:p-14 transition-all duration-500 hover:border-neutral-500 h-full">
                  {/* Glare effects */}
                  <div className="pointer-events-none absolute inset-0 z-0">
                    {/* Background radial glow - Pink theme */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-60 bg-[radial-gradient(circle_at_50%_0,#ff558833,#0000_80%),radial-gradient(circle_at_50%_0,#5c0a2a,#0000)]" />
                    {/* Top glare line - Pink tint */}
                    <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-pink-500/40 to-transparent opacity-20" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
                    {/* Text Content */}
                    <div className="space-y-8">
                      <p className="text-2xl font-light font-lato-light text-neutral-300 tracking-wider -translate-y-[3vh]">
                        Featured Project
                      </p>
                      <h2
                        className="text-[52px] font-bold text-neutral-100 leading-tight"
                        style={{ fontFamily: 'Casta, serif' }}
                      >
                        <span className="italic">{project.title}</span>
                      </h2>
                      <p className="text-[20px] font-light font-lato-light text-neutral-300 max-w-3xl mx-auto text-center leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Images */}
                    {isMobile ? (
                      // Mobile: Single iPhone 16 Pro Image
                      <div className="flex w-full justify-center items-center mt-4">
                        <img
                          src={`${baseUrl}images/cinema-app/Prototype/iPhone 16 Pro.png`}
                          alt="iPhone 16 Pro - Cinema App"
                          className="w-full max-w-[493px] h-auto rounded-lg object-contain"
                        />
                      </div>
                    ) : (
                      // Tablet/Desktop: 4 Images in a line
                      <div className={`flex w-full justify-center items-center ${
                        isTablet ? 'flex-row flex-wrap gap-3 max-w-3xl mt-6' : 
                        'flex-row gap-4 max-w-4xl mt-8'
                      }`}>
                        {[1, 2, 3, 4].map((index) => (
                          <img
                            key={index}
                            src={`${baseUrl}images/projects/CinemaApp/${index}.png`}
                            alt={`Cinema App screenshot ${index}`}
                            className={`max-w-full h-auto rounded-lg object-contain ${
                              isTablet ? 'flex-1 min-w-[45%]' : 'flex-1'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Arrow Button */}
                  <div className={`absolute right-6 top-6 flex items-center justify-center rounded-full border border-neutral-600 bg-neutral-800/50 backdrop-blur-sm transition-all duration-500 hover:bg-neutral-700 z-20 ${
                    isMobile ? 'h-10 w-10' : 'h-12 w-12 lg:h-14 lg:w-14'
                  }`}>
                    <ArrowUpRight className={isMobile ? 'w-5 h-5 text-neutral-200' : 'w-6 h-6 lg:w-7 lg:h-7 text-neutral-200'} />
                  </div>
                </div>
              </a>
            )
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects