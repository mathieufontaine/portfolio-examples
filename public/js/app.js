import { throttle } from "./throttle.js";
import { toggleNavbar } from "./navbar.js";

const animationOnLoad = () => {
  const photoLeft = document.querySelector(".photographer .model-left");
  const photoRight = document.querySelector(".photographer .model-right");
  const photoText = document.querySelector(".photographer .details");
  console.log("object");

  const tl = gsap.timeline();
  tl.to(photoRight, { y: "10%", duration: 0.5 })
    .to(photoLeft, { y: "-10%", duration: 0.5 }, "-=0.5")
    .to(photoText, { opacity: 1, y: 0, duration: 0.3 });

  // photoLeft.style.transform = "translateY(-10%) !important";
  // photoRight.style.transform = "translateY(10%) !important";
  // photoText.style.transform = "translate(0%, 0%)";
  // photoText.style.opacity = "0";
};

const initSectionSlide = () => {
  const slides = document.querySelectorAll(".slide");
  const sections = document.querySelectorAll(".section");
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

  const nextSlide = sectionNumber => {
    const nextSection = sections[sectionNumber];
    const currentSection = sections[current];
    const nextLeft = nextSection.querySelector(".hero .model-left");
    const nextRight = nextSection.querySelector(".hero .model-right");
    const currentLeft = currentSection.querySelector(".hero .model-left");
    const currentRight = currentSection.querySelector(".hero .model-right");
    const nextText = nextSection.querySelector(".details");
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
      .to(content, 0.3, { backgroundImage: backgrounds[sectionNumber] })
      .fromTo(
        currentSection,
        0.3,
        { opacity: 1, pointerEvents: "all" },
        { opacity: 0, pointerEvents: "none" }
      )
      .fromTo(
        nextSection,
        0.3,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "all" },
        "-=0.6"
      )
      .fromTo(nextRight, 0.3, { y: "-100%" }, { y: "10%" }, "-=0.6")
      .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" }, "-=0.8")
      .fromTo(nextText, 0.3, { opacity: 0, y: -30 }, { opacity: 1, y: 0 });
    // .set(nextLeft, { clearProps: "all" })
    // .set(nextRight, { clearProps: "all" });

    current = sectionNumber;
  };
  const switchDots = dotNumber => {
    const activeDot = document.querySelectorAll(".slide")[dotNumber];
    slides.forEach(slide => {
      slide.classList.remove("active");
    });

    activeDot.classList.add("active");
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

  // changeDots(slides[0]);
  // nextSlide(0);
  // scrollSlide = 0;
  document.addEventListener("wheel", throttle(scrollChange, 1500));
  document.addEventListener("touchmove", throttle(scrollChange, 1500));
};

animationOnLoad();
initSectionSlide();
toggleNavbar();

// const photoLeft = document.querySelector(".photographer .model-left");
// const photoRight = document.querySelector(".photographer .model-right");
// const photoText = document.querySelector(".photographer .details");
// photoLeft.style.transform = "translate(0%, -10%)";
// photoRight.style.transform = "translate(0%, 10%)";
// photoText.style.transform = "translate(0%, 0%)";
// photoText.style.opacity = "0";
