/* Damu Group — mobile menu + Агробизнес dropdown. Vanilla JS. */
(function () {
  "use strict";

  /* ---- Desktop dropdown (click support in addition to :hover) ---- */
  var item = document.querySelector(".nav__item");
  if (item) {
    var toggle = item.querySelector(".nav__link");
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      var open = item.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!item.contains(e.target)) {
        item.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Mobile menu ---- */
  var burger = document.querySelector(".burger");
  var menu = document.getElementById("mobile-menu");
  var closeBtn = menu ? menu.querySelector(".mobile-menu__close") : null;
  var lastFocus = null;

  function openMenu() {
    lastFocus = document.activeElement;
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var first = menu.querySelector("a, button");
    if (first) first.focus();
  }
  function closeMenu() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  if (burger && menu) {
    burger.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    menu.addEventListener("click", function (e) {
      if (e.target.matches("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
        burger.focus();
      }
    });
  }
})();
