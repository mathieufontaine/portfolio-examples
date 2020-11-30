const homeAnimation = () => {
  let tl = gsap.timeline();

  tl.from(".page", {
    duration: 1.5,
    translateX: "100%",
    opacity: 0
  });
  tl.from(".hero", { duration: 1.5, translateY: 100, opacity: 0 }, "-=1");
};

// init Barba
barba.init({
  transitions: [
    {
      name: "home",
      sync: true,
      to: {
        namespace: ["home"]
      },
      beforeOnce() {
        // console.log("before");
      },
      once() {
        homeAnimation();
      },
      afterOnce() {
        // console.log("after");
      },
      leave() {},
      enter() {
        homeAnimation();
      }
    },
    {
      name: "barber",
      to: {
        namespace: ["barber"]
      },
      leave() {},
      enter() {},
      beforeEnter() {
        // console.log("before");
      }
    }
  ]
});
