import { toggleNavbar } from "./navbar.js";

// init toggle navbar
toggleNavbar();

// init Animations
AOS.init({ duration: 1500 });

// init gallery slider
new SimpleLightbox(".gallery a");

const hamburgerLines = document.querySelectorAll(".menu line");

hamburgerLines.forEach((line, index) => {
  line.style.stroke = "black";
});
