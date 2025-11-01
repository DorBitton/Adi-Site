import React, { useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const Header = () => {
    // --- State and Handlers ---
    const [isLoaded, setIsLoaded] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState(0)

    // 1. Trigger the fade-in after a short delay (e.g., 50ms)
    useEffect(() => {
        // Use setTimeout to ensure the component is mounted before setting opacity: 1
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, 50) 
        
        return () => clearTimeout(timer)
    }, [])

    // 2. Track active section based on scroll position
    useEffect(() => {
        // Wait for content to be ready
        const initTimer = setTimeout(() => {
            const sections = [
                { id: 'hero', index: 0 },
                { id: 'projects', index: 1 },
                { id: 'contact', index: 3 }
            ]

            const triggers = sections.map(section => {
                const element = document.getElementById(section.id)
                if (!element) return null

                return ScrollTrigger.create({
                    trigger: element,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => setActiveSection(section.index),
                    onEnterBack: () => setActiveSection(section.index),
                    // Important: tell ScrollTrigger to work with ScrollSmoother
                    scroller: '#smooth-wrapper'
                })
            }).filter(Boolean)

            return () => {
                triggers.forEach(trigger => trigger.kill())
            }
        }, 500)

        return () => clearTimeout(initTimer)
    }, [])
    
    // 3. Handle navigation clicks with smooth scrolling
    const handleNavClick = useCallback((e, href) => {
        e.preventDefault()
        const targetId = href.replace('#', '')
        
        // Get ScrollSmoother instance
        const smoother = ScrollTrigger.getById('smooth-scroller')
        
        // If clicking "Home", scroll to the very top
        if (targetId === 'hero') {
            if (smoother) {
                smoother.scrollTo(0, true)
            } else {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: 0 },
                    ease: 'power2.inOut'
                })
            }
        } else {
            // For other sections, scroll to the element
            const targetElement = document.getElementById(targetId)
            
            if (targetElement) {
                if (smoother) {
                    smoother.scrollTo(targetElement, true, 'top top')
                } else {
                    // Fallback to regular GSAP scroll
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 0
                        },
                        ease: 'power2.inOut'
                    })
                }
            }
        }

        if (mobileMenuOpen) {
            setMobileMenuOpen(false)
        }
    }, [mobileMenuOpen])


    // --- Shared Data ---
    const menuItems = [
        { label: 'Home', href: '#hero', section: 0 },
        { label: 'My Projects', href: '#projects', section: 1 },
        { label: 'Continue The Story', href: '#contact', section: 3, cta: true },
    ]

    // --- Tailwind Classes for Fade-In ---
    // Start invisible and apply a transition class
    const transitionClasses = `transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`

    return (
        <>
            {/* Desktop Header */}
            <header 
                className={`hidden lg:block fixed top-7 left-0 right-0 z-50 ${transitionClasses}`}
                style={{ position: 'fixed' }}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-center h-16">
                        <nav className="bg-[#F7EFE2] rounded-full shadow-lg px-12 py-2">
                            <ul className="flex items-center gap-14">
                            {/* ... (Desktop menu items logic is simplified here since the 3D flip effect is gone) ... */}
                            {menuItems.map((item) => {
                                const isActive = activeSection === item.section
                                
                                return (
                                <li key={item.label} className="relative">
                                    <a 
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className={`flex items-center gap-2 px-6 py-2 rounded-full relative z-10 transition-colors ${
                                            item.cta 
                                                ? 'border border-black text-black hover:bg-black hover:text-white'
                                                : isActive ? 'text-black font-semibold' : 'text-neutral-600 hover:text-black'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                                )
                            })}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile Header */}
            <header 
                className={`lg:hidden fixed top-4 left-4 right-4 z-50 ${transitionClasses}`}
                style={{ position: 'fixed' }}
            >
                <div className="bg-[#F7EFE2] rounded-full shadow-lg px-6 py-3 flex items-center justify-between">
                    <span className="text-lg font-semibold">
                        {menuItems.find(item => item.section === activeSection)?.label || 'Home'}
                    </span>
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Panel */}
                <div
                    className={`absolute top-16 left-0 right-0 bg-[#F7EFE2] rounded-2xl shadow-xl mx-4 p-6 
                        transition-all duration-300 ease-in-out transform origin-top 
                        ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`
                    }
                >
                    <nav>
                        <ul className="space-y-4">
                            {menuItems.map((item) => {
                                const isActive = activeSection === item.section
                                return (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className={`block px-4 py-3 rounded-lg transition-colors ${
                                                isActive ? 'bg-black text-white font-semibold' : 'text-neutral-600 hover:bg-gray-100'
                                            } ${item.cta ? 'border border-black' : ''}`}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header