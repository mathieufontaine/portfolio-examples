import { throttle } from "./throttle.js";
import { toggleNavbar } from "./navbar.js";

const init = () => {
  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const backgrounds = [
    `radial-gradient(#2b3760, #0b1023)`,
    `radial-gradient(#4E3022, #161616)`,
    `radial-gradient(#4E4342, #0b1023)`
  ];

  let current = 0;
  let scrollSlide = 0;

  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      changeDots(slide);
      nextSlide(index);
      scrollSlide = index;
    });
  });

  const changeDots = dot => {
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  };

  const nextSlide = pageNumber => {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextLeft = nextPage.querySelector(".hero .model-left");
    const nextRight = nextPage.querySelector(".hero .model-right");
    const currentLeft = currentPage.querySelector(".hero .model-left");
    const currentRight = currentPage.querySelector(".hero .model-right");
    const nextText = nextPage.querySelector(".details");
    const content = document.querySelector(".content");

    const tl = new TimelineMax({
      onStart: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "all";
        });
        slides[current].style.pointerEvents = "none";
      }
    });

    tl.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
      .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.2")
      .to(content, 0.3, { backgroundImage: backgrounds[pageNumber] })
      .fromTo(
        currentPage,
        0.3,
        { opacity: 1, pointerEvents: "all" },
        { opacity: 0, pointerEvents: "none" }
      )
      .fromTo(
        nextPage,
        0.3,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "all" },
        "-=0.6"
      )
      .fromTo(nextRight, 0.3, { y: "-100%" }, { y: "10%" }, "-=0.6")
      .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" }, "-=0.8")
      .fromTo(nextText, 0.3, { opacity: 0, y: -30 }, { opacity: 1, y: 0 })
      .set(nextLeft, { clearProps: "all" })
      .set(nextRight, { clearProps: "all" });

    current = pageNumber;
  };
  const switchDots = dotNumber => {
    const activeDot = document.querySelectorAll(".slide")[dotNumber];
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    if (document.querySelector("main").classList.contains("home-page")) {
      activeDot.classList.add("active");
    }
  };
  const scrollChange = e => {
    if (e.deltaY > 0) {
      scrollSlide += 1;
    } else {
      scrollSlide -= 1;
    }

    if (scrollSlide > 2) {
      scrollSlide = 0;
    }
    if (scrollSlide < 0) {
      scrollSlide = 2;
    }
    switchDots(scrollSlide);
    nextSlide(scrollSlide);
  };

  if (document.querySelector("main").classList.contains("home-page")) {
    document.addEventListener("wheel", throttle(scrollChange, 1500));
    document.addEventListener("touchmove", throttle(scrollChange, 1500));
  }
};

init();
toggleNavbar();
