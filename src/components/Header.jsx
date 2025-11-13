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

    // 1. Trigger the fade-in after a short delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, 50) 
        
        return () => clearTimeout(timer)
    }, [])

    // 2. Track active section based on scroll position
    useEffect(() => {
        const initTimer = setTimeout(() => {
            const sections = [
                { id: 'hero', index: 0 },
                { id: 'projects', index: 1 },
                { id: 'about', index: 2 }
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
        
        const smoother = ScrollTrigger.getById('smooth-scroller')
        
        // Calculate header offset (80px on desktop, 64px on mobile)
        const headerOffset = window.innerWidth >= 1024 ? 80 : 64
        
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
            const targetElement = document.getElementById(targetId)
            
            if (targetElement) {
                if (smoother) {
                    // Use offset to account for fixed header
                    smoother.scrollTo(targetElement, true, `top ${headerOffset}px`)
                } else {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: targetElement,
                            offsetY: headerOffset
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

    // --- Navigation Data ---
    const navLinks = [
        { label: 'Home', href: '#hero', section: 0 },
        { label: 'My Projects', href: '#projects', section: 1 },
        { label: 'My Vision', href: '#about', section: 2 }
    ]

    // --- Tailwind Classes for Fade-In ---
    const transitionClasses = `transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`

    return (
        <>
            {/* Desktop Header */}
            <header 
                className={`hidden lg:block fixed top-0 left-0 right-0 z-50 ${transitionClasses}`}
                style={{ position: 'fixed' }}
            >
                <div className="backdrop-blur-sm border-b border-border/50 bg-card/70">
                    <div className="w-full px-12 lg:px-16 xl:px-20">
                        <div className="flex items-center justify-between h-20 gap-8">
                            {/* Logo - Left */}
                            <div className="flex-shrink-0 flex-1 flex justify-start">
                                <a 
                                    href="#hero" 
                                    onClick={(e) => handleNavClick(e, '#hero')}
                                    className="text-2xl font-bold transition-all duration-300 font-casta text-foreground hover:scale-105 hover:text-primary"
                                >
                                    Your Name
                                </a>
                            </div>

                            {/* Primary Navigation - Center */}
                            <nav className="flex-shrink-0">
                                <ul className="flex items-center gap-12">
                                    {navLinks.map((link) => {
                                        const isActive = activeSection === link.section
                                        return (
                                            <li key={link.label}>
                                                <a 
                                                    href={link.href}
                                                    onClick={(e) => handleNavClick(e, link.href)}
                                                    className={`text-base font-medium transition-all duration-300 relative group ${
                                                        isActive ? 'text-foreground' : 'text-muted-foreground'
                                                    } hover:text-foreground hover:scale-105`}
                                                >
                                                    {link.label}
                                                    {isActive && (
                                                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground"></span>
                                                    )}
                                                    {!isActive && (
                                                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                                    )}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </nav>

                            {/* CTA Buttons - Right */}
                            <div className="flex-shrink-0 flex-1 flex justify-end items-center gap-4">
                                {/* Contact Button (Emphasized) */}
                                <a 
                                    href="#contact"
                                    onClick={(e) => handleNavClick(e, '#contact')}
                                    className="px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 bg-primary text-primary-foreground hover:opacity-90"
                                >
                                    Contact
                                </a>

                                {/* LinkedIn Icon */}
                                <a 
                                    href="https://linkedin.com/in/yourprofile" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-foreground text-foreground transition-all duration-300 hover:scale-110 hover:bg-foreground hover:text-background hover:border-foreground"
                                    aria-label="LinkedIn Profile"
                                >
                                    <svg 
                                        className="w-5 h-5" 
                                        fill="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Header */}
            <header 
                className={`lg:hidden fixed top-0 left-0 right-0 z-50 ${transitionClasses}`}
                style={{ position: 'fixed' }}
            >
                <div className="backdrop-blur-sm border-b border-border/50 bg-card/70">
                    <div className="px-6 py-4 flex items-center justify-between">
                        {/* Logo */}
                        <a 
                            href="#hero" 
                            onClick={(e) => handleNavClick(e, '#hero')}
                            className="text-xl font-bold font-casta text-foreground transition-all duration-300 hover:scale-105 hover:text-primary"
                        >
                            Your Name
                        </a>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-foreground transition-all duration-300 hover:scale-110 hover:rotate-90"
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
                        className={`overflow-hidden transition-all duration-300 ease-in-out
                            ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <nav className="px-6 py-4 border-t border-border/50 bg-card/90">
                            <ul className="space-y-3">
                                {navLinks.map((link) => {
                                    const isActive = activeSection === link.section
                                    return (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                onClick={(e) => handleNavClick(e, link.href)}
                                                className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                                                    isActive 
                                                        ? 'bg-primary text-primary-foreground' 
                                                        : 'text-foreground hover:bg-primary/20 hover:translate-x-2'
                                                }`}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    )
                                })}
                                
                                {/* Mobile CTA Buttons */}
                                <li className="pt-2">
                                    <a
                                        href="#contact"
                                        onClick={(e) => handleNavClick(e, '#contact')}
                                        className="block px-4 py-3 rounded-lg text-center font-medium transition-all duration-300 bg-primary text-primary-foreground hover:scale-105 hover:shadow-lg hover:opacity-90"
                                    >
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://linkedin.com/in/yourprofile"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-foreground text-foreground font-medium transition-all duration-300 hover:scale-105 hover:bg-foreground hover:text-background"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header