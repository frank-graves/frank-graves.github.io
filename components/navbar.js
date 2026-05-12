export function initNavbar() {
  const navbar = document.querySelector(".main-navbar");
  const progressBar = document.querySelector(".reading-progress");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navList = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    navbar.classList.toggle("backdrop-blur-xl", scrollTop > 20);
    navbar.classList.toggle("navbar-shadow", scrollTop > 20);
  });

  mobileToggle?.addEventListener("click", () => {
    navList?.classList.toggle("open");
    mobileToggle.classList.toggle("active");
  });

  document.querySelectorAll("a[data-scroll]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (navList?.classList.contains("open")) {
        navList.classList.remove("open");
        mobileToggle.classList.remove("active");
      }
    });
  });
}
