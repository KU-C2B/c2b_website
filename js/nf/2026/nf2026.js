gsap.registerPlugin(ScrollTrigger);

let lenisInstance;

function initializeLenisScroll() {
  lenisInstance = new Lenis({ smoothWheel: true, duration: 1.0 });

  lenisInstance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    // time は秒なので、Lenis の期待するミリ秒に変換
    lenisInstance.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

function initializeOpenButton() {
  const openButton = document.getElementById("open-button");
  const navbarList = document.querySelector(".navigation-list");
  if (!openButton || !navbarList) return;

  openButton.addEventListener("click", () => {
    navbarList.classList.toggle("hidden");
    openButton.classList.toggle("active");
  });
}

function initializeNavigationScroll() {
  const navbarList = document.querySelector(".navigation-list");
  const openButton = document.getElementById("open-button");
  const navLinks = document.querySelectorAll(".navigation-list a[href^='#']");

  if (!navbarList || !openButton || navLinks.length === 0) return;

  const closeNavigation = () => {
    navbarList.classList.add("hidden");
    openButton.classList.remove("active");
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetSelector = link.getAttribute("href");
      const target = targetSelector
        ? document.querySelector(targetSelector)
        : null;

      if (target) {
        if (lenisInstance) {
          lenisInstance.scrollTo(target, {
            duration: 1.2,
            offset: 0,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }

      closeNavigation();
    });
  });
}

function initializeHeroAnimation() {
  const heading = document.querySelector(".hero-heading");
  const tagline = document.querySelector(".hero-tagline");
  const date = document.querySelector(".top-date");
  const topImage = document.querySelector(".top-image");

  if (!heading || !tagline || !topImage) return;

  gsap.set([heading, tagline, date], { opacity: 0, y: 40 });
  gsap.set(topImage, { scale: 1.08 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(topImage, { scale: 1, duration: 1.6, ease: "power2.out" }, 0)
    .to(heading, { opacity: 1, y: 0, duration: 1 }, 0.2)
    .to(tagline, { opacity: 1, y: 0, duration: 0.9 }, "<0.15")
    .to(date, { opacity: 1, y: 0, duration: 0.9 }, "<0.1");
}

function initializeScrollLeadAnimation() {
  const scrollLineFill = document.querySelector(".scroll-line-fill");
  const scrollText = document.querySelector(".scroll-text");
  if (!scrollLineFill || !scrollText) return;

  gsap.fromTo(
    scrollLineFill,
    { scaleY: 0 },
    {
      scaleY: 1,
      duration: 1.4,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    }
  );

  gsap.fromTo(
    scrollText,
    { opacity: 0.6 },
    {
      opacity: 1,
      duration: 1.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    }
  );
}

function initializeHighlightAnimations() {
  const highlightTargets = gsap.utils.toArray(".highlight-underline");

  highlightTargets.forEach((target) => {
    gsap.to(target, {
      scrollTrigger: {
        trigger: target,
        start: "center 70%",
        endTrigger: "html",
        end: "bottom top",
        toggleClass: {
          targets: target,
          className: "active",
        },
      },
    });
  });
}

function initializeScrollAnimations() {
  const fadeUpTargets = gsap.utils.toArray('[data-animate="fade-up"]');
  const fadeInTargets = gsap.utils.toArray('[data-animate="fade-in"]');
  const slideInTargets = gsap.utils.toArray('[data-animate="slide-in"]');
  const slideLeftTargets = gsap.utils.toArray('[data-animate="slide-left"]');
  const slideRightTargets = gsap.utils.toArray('[data-animate="slide-right"]');

  fadeUpTargets.forEach((target) => {
    gsap.to(target, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: target,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  fadeInTargets.forEach((target) => {
    gsap.to(target, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: target,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  slideInTargets.forEach((target) => {
    gsap.to(target, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: target,
        start: "top 86%",
        toggleActions: "play none none reverse",
      },
    });
  });

  slideLeftTargets.forEach((target) => {
    gsap.to(target, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: target,
        start: "top 86%",
        toggleActions: "play none none reverse",
      },
    });
  });

  slideRightTargets.forEach((target) => {
    gsap.to(target, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: target,
        start: "top 86%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

window.addEventListener("load", () => {
  initializeLenisScroll();
  initializeOpenButton();
  initializeNavigationScroll();
  initializeHeroAnimation();
  initializeScrollLeadAnimation();
  initializeScrollAnimations();
  initializeHighlightAnimations();
});
