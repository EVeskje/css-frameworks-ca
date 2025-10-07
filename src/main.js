import "../src/styles/main.scss";

/* ---------------------------
   MOBILE MENU
---------------------------- */
function initMobileMenu() {
 const toggle = document.querySelector("[data-menu-toggle]");
 const panel = document.querySelector("[data-menu-panel]");

 if (!toggle || !panel) return;

 const open = () => {
  panel.classList.remove("hidden");
  toggle.setAttribute("aria-expanded", "true");
 };
 const close = () => {
  panel.classList.add("hidden");
  toggle.setAttribute("aria-expanded", "false");
 };
 const toggleMenu = () => {
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  expanded ? close() : open();
 };

 toggle.addEventListener("click", toggleMenu);
 panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
 document.addEventListener("keydown", (e) => e.key === "Escape" && close());

 const mq = window.matchMedia("(min-width: 768px)");
 mq.addEventListener("change", (e) => e.matches && close());
}

/* ---------------------------
   AUTH TABS (for index.html)
---------------------------- */
function initTabs() {
 const tabButtons = document.querySelectorAll("[data-tab-button]");
 const panels = document.querySelectorAll("[data-panel]");
 if (!tabButtons.length || !panels.length) return;

 tabButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
   const target = btn.getAttribute("data-tab-button");
   tabButtons.forEach((b) => {
    b.classList.remove("bg-white", "shadow");
    b.setAttribute("aria-selected", "false");
   });
   btn.classList.add("bg-white", "shadow");
   btn.setAttribute("aria-selected", "true");
   panels.forEach((p) =>
    p.classList.toggle("hidden", p.getAttribute("data-panel") !== target)
   );
  })
 );
}

/* ---------------------------
   MODAL: Create Post
---------------------------- */
function initCreatePostModal() {
 const openers = document.querySelectorAll('[data-modal-open="create-post"]');
 const modal = document.querySelector('[data-modal="create-post"]');
 if (!modal || !openers.length) return;

 const overlay = modal.querySelector("[data-modal-overlay]");
 const closeBtns = modal.querySelectorAll("[data-modal-close]");
 const dialog = modal.querySelector('[role="dialog"]');

 const open = () => {
  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  dialog?.focus();
 };
 const close = () => {
  modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
 };

 openers.forEach((btn) => btn.addEventListener("click", open));
 closeBtns.forEach((btn) => btn.addEventListener("click", close));
 overlay?.addEventListener("click", close);
 document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("hidden") && e.key === "Escape") close();
 });
}

/* ---------------------------
   INIT
---------------------------- */
window.addEventListener("DOMContentLoaded", () => {
 initMobileMenu();
 initTabs();
 initCreatePostModal();
});
