// تهيئة المؤشر المخصص
const initCustomCursor = () => {
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
    });

    gsap.to(follower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
    });
  });

  document.addEventListener("mousedown", () => {
    gsap.to([cursor, follower], {
      scale: 0.8,
      duration: 0.2,
    });
  });

  document.addEventListener("mouseup", () => {
    gsap.to([cursor, follower], {
      scale: 1,
      duration: 0.2,
    });
  });

  // تأثير التحويم على العناصر القابلة للنقر
  const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .skill-card"
  );
  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      gsap.to([cursor, follower], {
        scale: 1.5,
        duration: 0.2,
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.2,
      });
    });
  });
};

// تهيئة تأثيرات Vanilla Tilt
const initTiltEffects = () => {
  VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  });
};

// تأثيرات التمرير المتقدمة
const initScrollEffects = () => {
  const scrollProgress = document.createElement("div");
  scrollProgress.className = "scroll-progress";
  document.body.appendChild(scrollProgress);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
  });
};

// تأثيرات النص المتقدمة
const initAdvancedTextEffects = () => {
  // تقسيم النص إلى حروف
  const textElements = document.querySelectorAll(
    ".animated-text, .skill-card h3"
  );
  textElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = "";
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.className = "char";
      span.style.setProperty("--char-index", i);
      element.appendChild(span);
    });
  });
};

// تأثيرات الخلفية المتقدمة
const initGradientAnimation = () => {
  const canvas = document.getElementById("gradient-canvas");
  const ctx = canvas.getContext("2d");
  let time = 0;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const animate = () => {
    time += 0.005;
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `hsl(${time * 100}, 70%, 60%)`);
    gradient.addColorStop(1, `hsl(${time * 100 + 40}, 70%, 60%)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    requestAnimationFrame(animate);
  };

  window.addEventListener("resize", resize);
  resize();
  animate();
};

// تأثيرات البطاقات المتقدمة
const initAdvancedCardEffects = () => {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;

      const glare = card.querySelector(".glare");
      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `
                    radial-gradient(
                        circle at ${glareX}% ${glareY}%,
                        rgba(255, 255, 255, 0.3) 0%,
                        transparent 80%
                    )
                `;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      const glare = card.querySelector(".glare");
      if (glare) {
        glare.style.background = "transparent";
      }
    });
  });
};

// تأثيرات الانتقال بين الصفحات
const initPageTransitions = () => {
  Barba.Pjax.start();

  Barba.Dispatcher.on("newPageReady", () => {
    const transition = document.createElement("div");
    transition.className = "page-transition";
    document.body.appendChild(transition);

    setTimeout(() => {
      transition.remove();
    }, 1000);
  });
};

// تهيئة Three.js
const initThreeBackground = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("three-background").appendChild(renderer.domElement);

  // إنشاء الأشكال الهندسية
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshPhongMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    emissive: 0x22d3ee,
    emissiveIntensity: 0.5,
  });

  const shapes = [];
  for (let i = 0; i < 50; i++) {
    const shape = new THREE.Mesh(geometry, material);
    shape.position.set(
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 20 - 10
    );
    shape.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    shapes.push(shape);
    scene.add(shape);
  }

  // إضافة الإضاءة
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1);
  scene.add(light);

  camera.position.z = 5;

  // حركة الأشكال
  const animate = () => {
    requestAnimationFrame(animate);

    shapes.forEach((shape) => {
      shape.rotation.x += 0.001;
      shape.rotation.y += 0.001;
    });

    renderer.render(scene, camera);
  };

  animate();

  // تحديث حجم النافذة
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

// تهيئة Particles.js
const initParticles = () => {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: ["#6366f1", "#f472b6", "#22d3ee"] },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        random: true,
        animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false },
      },
      size: {
        value: 3,
        random: true,
        animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#6366f1",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outMode: "bounce",
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detectOn: "canvas",
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });
};

// تأثيرات النص المتقدمة
const initTextEffects = () => {
  const text = new SplitType(".hero h1", { types: "chars" });

  gsap.from(text.chars, {
    opacity: 0,
    y: 50,
    rotateX: -90,
    stagger: 0.02,
    duration: 1,
    ease: "back.out(1.7)",
  });
};

// تأثيرات القسم الرئيسي
const heroAnimation = () => {
  const tl = gsap.timeline();

  tl.to(".hero h1", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power4.out",
  })
    .to(
      ".hero h2",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.5"
    )
    .to(
      ".hero p",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.5"
    )
    .to(
      ".cta-button",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.5"
    );
};

// تأثيرات القائمة
const navAnimation = () => {
  gsap.to(".nav-links li", {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power4.out",
  });
};

// تأثيرات المهارات
const skillsAnimation = () => {
  gsap.to(".skill-card", {
    scrollTrigger: {
      trigger: ".skills",
      start: "top center",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power4.out",
  });
};

// تأثيرات المشاريع
const projectsAnimation = () => {
  gsap.to(".project-card", {
    scrollTrigger: {
      trigger: ".projects",
      start: "top center",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.2,
    ease: "power4.out",
  });
};

// تأثير التمرير السلس
const smoothScroll = (target) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: target,
    ease: "power4.inOut",
  });
};

// تأثير الكتاب المتحركة
const initTypeWriter = () => {
  const text = document.querySelector(".typing-text");
  const words = ["مطور ويب شامل", "مصمم مواقع", "مبرمج جافاسكريبت"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      text.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      text.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  };

  type();
};

// تأثيرات قسم نبذة عني
const initAboutAnimations = () => {
  gsap.from(".main-intro", {
    scrollTrigger: {
      trigger: ".about",
      start: "top center",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".about-card", {
    scrollTrigger: {
      trigger: ".about-details",
      start: "top center",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from(".interest-tags span", {
    scrollTrigger: {
      trigger: ".interests",
      start: "top center",
    },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: "power3.out",
  });

  gsap.from(".personal-quote", {
    scrollTrigger: {
      trigger: ".personal-quote",
      start: "top center",
    },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: "power3.out",
  });
};

// تفاعلات نموذج التواصل
const initContactForm = () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // هنا يمكنك إضافة كود لإرسال النموذج
      // مثال: إظهار رسالة نجاح
      const submitBtn = form.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح';
      submitBtn.style.background = "var(--gradient-2)";

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = "var(--gradient-1)";
        form.reset();
      }, 3000);
    });
  }
};

// تحديث تأثيرات التحميل
window.addEventListener("load", () => {
  initCustomCursor();
  initThreeBackground();
  initParticles();
  initTextEffects();
  initTiltEffects();
  initScrollEffects();
  initAdvancedTextEffects();
  heroAnimation();
  navAnimation();
  skillsAnimation();
  projectsAnimation();
  updateAdvancedCardEffects();
  initTypeWriter();
  initGradientAnimation();
  initAdvancedCardEffects();
  initPageTransitions();
  initAboutAnimations();
  initContactForm();
  initMobileMenu();
});

// التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    smoothScroll(target);
  });
});

// تأثير تتبع المؤشر للبطاقات
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      duration: 0.5,
      rotateX: rotateX,
      rotateY: rotateY,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
    });
  });
});

// تأثير الظهور التدريجي للعناصر
ScrollTrigger.batch(".skill-card, .project-card", {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 1,
      ease: "power4.out",
    });
  },
  once: true,
});

// تحديث تأثيرات البطاقات
const updateCardEffects = () => {
  document.querySelectorAll(".skill-card, .project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        duration: 0.5,
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.05,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: "power2.out",
      });
    });
  });
};

updateCardEffects();

// إضافة في نهاية الملف
const initMobileMenu = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      // تغيير أيقونة القائمة
      const icon = menuToggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });

    // إغلاق القائمة عند النقر على أي رابط
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      });
    });
  }
};

// تحسين الأداء�لى الأجهزة المحمولة
const optimizeMobilePerformance = () => {
  if (window.innerWidth <= 768) {
    // تقليل عدد الجزيئات
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.number.value = 30;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }

    // تقليل حجم الأشكال الثلاثية الأبعاد
    const threeBackground = document.getElementById("three-background");
    if (threeBackground) {
      threeBackground.style.opacity = "0.3";
    }
  }
};

window.addEventListener("resize", optimizeMobilePerformance);
optimizeMobilePerformance();
