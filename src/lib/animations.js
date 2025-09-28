'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import scrollReveal from 'scrollreveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}
// Global initialization flags to prevent multiple initializations
var aosInitialized = false;
var srInitialized = false;
/**
 * Initializes all animation libraries
 */
export function initAnimations() {
    if (typeof window === 'undefined')
        return;
    // Initialize AOS (Animate on Scroll)
    if (!aosInitialized) {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });
        aosInitialized = true;
        console.log('AOS initialized');
    }
    // Initialize ScrollReveal
    if (!srInitialized) {
        scrollReveal({
            origin: 'bottom',
            distance: '20px',
            duration: 800,
            delay: 0,
            reset: false,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            viewFactor: 0.2,
        });
        srInitialized = true;
        console.log('ScrollReveal initialized');
    }
    // Initialize GSAP ScrollTrigger
    // This automatically works with any new ScrollTrigger instances
}
/**
 * Hook to initialize animations in components
 */
export function useAnimations() {
    useEffect(function () {
        initAnimations();
        // Refresh animations on component mount
        AOS.refresh();
        // Setup window resize handler to refresh animations
        var handleResize = function () {
            AOS.refresh();
        };
        window.addEventListener('resize', handleResize);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
}
/**
 * GSAP utility functions
 */
export var gsapUtils = {
    fadeIn: function (element, delay, duration) {
        if (delay === void 0) { delay = 0; }
        if (duration === void 0) { duration = 0.8; }
        return gsap.fromTo(element, { opacity: 0, y: 20 }, {
            opacity: 1,
            y: 0,
            duration: duration,
            delay: delay,
            ease: 'power2.out',
        });
    },
    staggerFadeIn: function (elements, stagger, delay, duration) {
        if (stagger === void 0) { stagger = 0.1; }
        if (delay === void 0) { delay = 0; }
        if (duration === void 0) { duration = 0.8; }
        return gsap.fromTo(elements, { opacity: 0, y: 20 }, {
            opacity: 1,
            y: 0,
            duration: duration,
            delay: delay,
            stagger: stagger,
            ease: 'power2.out',
        });
    },
    revealFromLeft: function (element, delay, duration) {
        if (delay === void 0) { delay = 0; }
        if (duration === void 0) { duration = 0.8; }
        return gsap.fromTo(element, { opacity: 0, x: -50 }, {
            opacity: 1,
            x: 0,
            duration: duration,
            delay: delay,
            ease: 'power2.out',
        });
    },
    revealFromRight: function (element, delay, duration) {
        if (delay === void 0) { delay = 0; }
        if (duration === void 0) { duration = 0.8; }
        return gsap.fromTo(element, { opacity: 0, x: 50 }, {
            opacity: 1,
            x: 0,
            duration: duration,
            delay: delay,
            ease: 'power2.out',
        });
    },
    clipReveal: function (element, delay, duration) {
        if (delay === void 0) { delay = 0; }
        if (duration === void 0) { duration = 1; }
        return gsap.fromTo(element, {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
        }, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: duration,
            delay: delay,
            ease: 'power3.inOut'
        });
    },
    createScrollTrigger: function (element, animation, start, end, scrub) {
        if (start === void 0) { start = 'top 80%'; }
        if (end === void 0) { end = 'bottom 20%'; }
        if (scrub === void 0) { scrub = false; }
        return ScrollTrigger.create({
            trigger: element,
            start: start,
            end: end,
            scrub: scrub,
            animation: animation,
            toggleActions: 'play none none none'
        });
    }
};
