// ================= Loader =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.transition = "opacity .5s";
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

// ================= Mobile Menu =================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// ================= Scroll Progress Bar =================
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / scrollHeight) * 100;

  if (progressBar) {
    progressBar.style.width = progress + "%";
  }
});

// ================= Back To Top Button =================
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (!topBtn) return;

  if (window.scrollY > 400) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ================= Active Navigation =================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ================= Dark Mode =================
const themeToggle = document.getElementById("themeToggle");

function enableDarkMode() {
  document.body.classList.add("dark");
  localStorage.setItem("theme", "dark");

  if (themeToggle) {
    themeToggle.innerHTML =
      '<i class="fa-solid fa-sun"></i>';
  }
}

function enableLightMode() {
  document.body.classList.remove("dark");
  localStorage.setItem("theme", "light");

  if (themeToggle) {
    themeToggle.innerHTML =
      '<i class="fa-solid fa-moon"></i>';
  }
}

if (localStorage.getItem("theme") === "dark") {
  enableDarkMode();
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    if (document.body.classList.contains("dark")) {
      enableLightMode();
    } else {
      enableDarkMode();
    }

  });
}

// ================= Typing Animation =================
const typing = document.getElementById("typing");

const words = [
  "Frontend Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {

  if (!typing) return;

  const currentWord = words[wordIndex];

  if (deleting) {
    typing.textContent = currentWord.substring(
      0,
      charIndex--
    );
  } else {
    typing.textContent = currentWord.substring(
      0,
      charIndex++
    );
  }

  let speed = deleting ? 60 : 120;

  if (!deleting && charIndex > currentWord.length) {
    deleting = true;
    speed = 1200;
  }

  if (deleting && charIndex < 0) {
    deleting = false;
    wordIndex++;

    if (wordIndex >= words.length) {
      wordIndex = 0;
    }
  }

  setTimeout(typingEffect, speed);
}

typingEffect();

// ================= Contact Form Validation =================
const form = document.getElementById("contactForm");

if (form) {

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document
      .getElementById("name")
      .value.trim();

    const email = document
      .getElementById("email")
      .value.trim();

    const subject = document
      .getElementById("subject")
      .value.trim();

    const message = document
      .getElementById("message")
      .value.trim();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {
      alert("Please enter your name.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (subject.length < 3) {
      alert("Please enter a subject.");
      return;
    }

    if (message.length < 10) {
      alert("Message should be at least 10 characters.");
      return;
    }

    alert("Message sent successfully!");

    form.reset();

  });

}

// ================= Scroll Reveal Animation =================
const observer = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  },

  {
    threshold: 0.15
  }

);

document
  .querySelectorAll("section, .card, .project-card, .skill")
  .forEach(element => {

    element.classList.add("hidden");

    observer.observe(element);

  });

// ================= Smooth Scrolling =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function (e) {

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});
