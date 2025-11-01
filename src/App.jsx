import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'



import { useLayoutEffect } from 'react'
import Header from './components/Header';
import  {Hero, Transition } from './components/Hero';
import Projects from './components/Projects';

import './App.css';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const App = () => {
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      effects: true,
    })
    return () => {
      smoother.kill()
    }
  }, [])
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#F7EFE2]">
          <Header />
          <Hero />
          <Transition />
          <Projects />
        </main>
      </div>
    </div>
  )
}

export default App