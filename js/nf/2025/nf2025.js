gsap.registerPlugin(ScrollTrigger);

function initializeLenisScroll() {
  const lenis = new Lenis({ smoothWheel: true, duration: 1.0 });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    // time は秒なので、Lenis の期待するミリ秒に変換
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

function initializeOpenButton() {
  const openButton = document.getElementById("open-button");
  const navbarList = document.querySelector(".navigation-list");
  openButton.addEventListener("click", () => {
    navbarList.classList.toggle("hidden");
    openButton.classList.toggle("active");
  });
}

window.addEventListener("load", () => {
  initializeLenisScroll();
  initializeOpenButton();
});
