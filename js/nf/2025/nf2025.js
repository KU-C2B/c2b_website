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
      const target = targetSelector ? document.querySelector(targetSelector) : null;

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

window.addEventListener("load", () => {
  initializeLenisScroll();
  initializeOpenButton();
  initializeNavigationScroll();
});
