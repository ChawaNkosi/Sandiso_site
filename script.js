/* Campaign site interactions: sticky nav state, mobile menu, scroll reveals. */
(function () {
  "use strict";

  /* ---------- Sticky nav shading on scroll ---------- */
  var nav = document.getElementById("site-nav");

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  function setMenu(open) {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileNav.hidden = !open;
  }

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    mobileNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) setMenu(false);
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  revealItems.forEach(function (el) {
    var delay = el.getAttribute("data-delay");
    if (delay) el.style.transitionDelay = delay + "ms";
  });

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach(function (el) {
    observer.observe(el);
  });

/* ---------- Manifesto Expand ---------- */
document.querySelectorAll(".manifesto-card.open")
document.querySelectorAll(".manifesto-expand").forEach((e,i)=>{
    console.log(i,e.scrollHeight,e.clientHeight);
});
document.querySelectorAll(".manifesto-toggle").forEach(function(button){

    button.addEventListener("click", function(){

        const card = button.closest(".manifesto-card");

        card.classList.toggle("open");

        button.querySelector("span").textContent =
    card.classList.contains("open")
        ? "Read Less"
        : "Learn More";

    });

});

/*document.querySelectorAll(".manifesto-card").forEach(function(card){

    card.addEventListener("click", function(){

        card.classList.toggle("open");

    });

});*/

})();

