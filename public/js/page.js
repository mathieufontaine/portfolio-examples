import { toggleNavbar } from "./navbar.js";

// init toggle navbar
toggleNavbar();

// init Animations
AOS.init({ duration: 1500 });

// init gallery slider
new SimpleLightbox(".gallery a");

// header nav black color
const hamburgerLines = document.querySelectorAll(".menu line");
const body = document.querySelector("body");

if (body.classList.contains("page-chef")) {
  console.log("object");
}

hamburgerLines.forEach((line, index) => {
  if (body.classList.contains("page-photographer")) {
    line.style.stroke = "#212a4c";
  }
  if (body.classList.contains("page-chef")) {
    line.style.stroke = "#212a4c";
  }
  if (body.classList.contains("page-barber")) {
    line.style.stroke = "#39393f";
  }
});
