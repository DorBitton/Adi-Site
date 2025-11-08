import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'



import { useLayoutEffect } from 'react'
import Header from './components/Header';
import { Hero, Transition } from './components/Hero';
import Projects from './components/Projects';
import SmallProjects from './components/SmallProjects';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';

import './App.css';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const App = () => {
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      effects: false,
      normalizeScroll: true,
      id: 'smooth-scroller' // Add ID so we can reference it from Header
    })
    
    
    // Ensure ScrollTriggers work properly with ScrollSmoother
    ScrollTrigger.refresh()
    
    return () => {
      smoother.kill()
    }
  }, [])
  return (
    <>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="relative min-h-screen w-screen overflow-x-hidden bg-background">
            <Hero />
            <Transition />
            <Projects />
            <SmallProjects />
            <AboutMe />
            <Contact />
          </main>
        </div>
      </div>
    </>
  )
}

export default App