import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let gsapContext: gsap.Context | null = null;

export function initAnimations() {
  // Clean up previous animations if any
  if (gsapContext) {
    gsapContext.revert();
  }

  // Set up GSAP context for easy clean-ups
  gsapContext = gsap.context(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Reduced motion: show everything instantly
      showEverythingInstantly();
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 320px)', () => {
      // ─── A. SERVICES LOAD SEQUENCE ───
      const serviceCards = document.querySelectorAll('.service-card-reveal');
      const servicesSection = document.querySelector('.services-section');

      if (serviceCards.length > 0 && servicesSection) {
        ScrollTrigger.create({
          trigger: servicesSection,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              serviceCards,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
              },
            );
          },
        });
      }

      // ─── B. PROCESS ROUTE LINE ───
      const routePath = document.getElementById('route-animated-path');
      const routeSection = document.getElementById('process-route-section');
      if (routePath && routeSection) {
        // Animate stroke-dashoffset on scroll
        gsap.to(routePath, {
          scrollTrigger: {
            trigger: routeSection,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
          },
          strokeDashoffset: 0,
          ease: 'none'
        });
      }

      // ─── C. ORDERED PROCESS REVEAL ───
      const processSection = document.getElementById('shipping-process');
      const processSteps = document.querySelectorAll('.process-step');
      if (processSection && processSteps.length > 0) {
        ScrollTrigger.create({
          trigger: processSection,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              processSteps,
              { opacity: 0, x: -18 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
              },
            );
          },
        });
      }
    });
  });
}

function showEverythingInstantly() {
  const heroHeading = document.getElementById('hero-heading');
  const eyebrow = document.getElementById('hero-eyebrow');
  const bodyContent = document.getElementById('hero-body-content');

  if (heroHeading) {
    heroHeading.style.opacity = '1';
    heroHeading.style.transform = 'none';
  }
  if (eyebrow) {
    eyebrow.style.opacity = '1';
    eyebrow.style.transform = 'none';
  }
  if (bodyContent) {
    bodyContent.style.opacity = '1';
    bodyContent.style.transform = 'none';
  }

  document.querySelectorAll('.service-card-reveal, .process-step').forEach(el => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });

  const routePath = document.getElementById('route-animated-path');
  if (routePath) {
    routePath.setAttribute('stroke-dashoffset', '0');
  }
}

// Clean up before transitioning to a new page
document.addEventListener('astro:before-preparation', () => {
  if (gsapContext) {
    gsapContext.revert();
  }
  ScrollTrigger.getAll().forEach(t => t.kill());
});
