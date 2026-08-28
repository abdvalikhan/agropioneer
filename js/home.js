/* FCC PIONEER — homepage interactions. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var header = document.querySelector(".header");

  /* ---- Fixed header after ~40px scroll ---- */
  function onScroll() {
    if (!header) return;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    header.classList.toggle("is-fixed", y > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Desktop dropdown (Агробизнес) ---- */
  var dropdown = document.querySelector(".nav__item--has-menu");
  if (dropdown) {
    var toggle = dropdown.querySelector(".nav__toggle");
    var closeDropdown = function () {
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      var open = dropdown.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) closeDropdown();
    });
    dropdown.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeDropdown(); toggle.focus(); }
    });
  }

  /* ---- Mobile menu ---- */
  var burger = document.querySelector(".burger");
  var mobileMenu = document.getElementById("mobile-menu");
  var mobileClose = document.querySelector(".mobile-menu__close");
  var lastFocused = null;

  function openMenu() {
    if (!mobileMenu) return;
    lastFocused = document.activeElement;
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    if (burger) burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var first = mobileMenu.querySelector("a, button");
    if (first) first.focus();
  }
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    if (burger) burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }
  if (burger) burger.addEventListener("click", openMenu);
  if (mobileClose) mobileClose.addEventListener("click", closeMenu);
  if (mobileMenu) {
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.matches("a")) closeMenu();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("is-open")) {
      closeMenu();
      if (burger) burger.focus();
    }
  });

  /* ---- Language switch (preserves original subdomain scheme: kz./en./cn.) ---- */
  var host = window.location.host;
  var proto = window.location.protocol + "//";
  var path = window.location.pathname;
  document.querySelectorAll(".js-lang").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var lang = this.getAttribute("data-lang");
      var prefix = host.substr(0, 2);
      var bare = (prefix === "kz" || prefix === "en" || prefix === "cn") ? host.substr(3) : host;
      if (lang === "ru") {
        window.location.href = proto + bare + path;
      } else {
        window.location.href = proto + lang + "." + bare + path;
      }
    });
  });
})();
