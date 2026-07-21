import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let gsapContext: gsap.Context | null = null;

function initAnimations() {
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
      // ─── A. HERO REVEAL (Run once) ───
      const heroHeading = document.getElementById('hero-heading');
      const eyebrow = document.getElementById('hero-eyebrow');
      const bodyContent = document.getElementById('hero-body-content');

      if (heroHeading && !(window as any).heroAnimated) {
        // Split H1 into lines dynamically
        const text = heroHeading.innerHTML;
        const lines = text.split(/<br\s*\/?>/i);
        heroHeading.innerHTML = lines
          .map(line => `<span class="hero-line block overflow-hidden py-1"><span class="inline-block" style="opacity: 0; transform: translateY(18px);">${line.trim()}</span></span>`)
          .join('');

        const headingSpans = heroHeading.querySelectorAll('.hero-line > span');

        // Set parent heading to visible so its split children can animate in
        gsap.set(heroHeading, { opacity: 1 });

        // Set eyebrow and bodyContent to hidden state dynamically for JS users
        if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 15 });
        if (bodyContent) gsap.set(bodyContent, { opacity: 0, y: 15 });

        const tl = gsap.timeline({
          onComplete: () => {
            (window as any).heroAnimated = true;
          }
        });

        // 1. Heading lines slide-up
        tl.to(headingSpans, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.10,
          ease: 'power3.out',
          delay: 0
        });

        // 2. Eyebrow, description and CTA buttons fade in
        if (eyebrow) {
          tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');
        }
        if (bodyContent) {
          tl.to(bodyContent, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
        }
      } else {
        // If hero already animated, just show it
        if (heroHeading) {
          heroHeading.style.opacity = '1';
          const spans = heroHeading.querySelectorAll('.hero-line > span');
          spans.forEach(s => {
            (s as HTMLElement).style.opacity = '1';
            (s as HTMLElement).style.transform = 'none';
          });
        }
        if (eyebrow) {
          eyebrow.style.opacity = '1';
          eyebrow.style.transform = 'none';
        }
        if (bodyContent) {
          bodyContent.style.opacity = '1';
          bodyContent.style.transform = 'none';
        }
      }

      // ─── B. SERVICES LOAD SEQUENCE ───
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

      // ─── C. PROCESS ROUTE LINE ───
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

      // ─── D. ORDERED PROCESS REVEAL ───
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

// Listen to Astro view transition page load events
document.addEventListener('astro:page-load', () => {
  initAnimations();
});

// Clean up before transitioning to a new page
document.addEventListener('astro:before-preparation', () => {
  if (gsapContext) {
    gsapContext.revert();
  }
  ScrollTrigger.getAll().forEach(t => t.kill());
});
