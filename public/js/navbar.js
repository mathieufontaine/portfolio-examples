export const toggleNavbar = () => {
  const hamburger = document.querySelector(".menu");
  const hamburgerLines = document.querySelectorAll(".menu line");
  const navOpen = document.querySelectorAll(".nav-open");
  const contact = document.querySelectorAll(".contact");
  const social = document.querySelectorAll(".social");
  const logo = document.querySelectorAll(".logo");

  const tl = new TimelineMax({ reversed: true });

  tl.to(navOpen, 0.5, { y: 0 })
    .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.1")
    .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
    .to(logo, 0.2, { color: "black" }, "-=1")
    .to(hamburgerLines, 0.2, { stroke: "black" }, "-=1");

  hamburger.addEventListener("click", () => {
    tl.reversed() ? tl.play() : tl.reverse();
  });
};
