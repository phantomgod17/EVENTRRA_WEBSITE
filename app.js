// Final Optimized Version - Smooth Mobile + Auto Slide + Preloader + Swipe Support

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const slider = document.querySelector('.slider');
const sliderList = slider.querySelector('.slider .list');
const thumbnail = slider.querySelector('.slider .thumbnail');
const loader = document.getElementById("pre");

let isAnimating = false;
let autoSlideInterval;
let autoSlideDelay = 5000; // 5 seconds

// 🌀 Preloader fade-out effect
window.addEventListener("load", () => {
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }
});

// ⚡ Function to move slides
function moveSlider(direction) {
  if (isAnimating) return;
  isAnimating = true;

  const sliderItems = sliderList.querySelectorAll('.item');
  const thumbnailItems = document.querySelectorAll('.thumbnail .item');

  requestAnimationFrame(() => {
    if (direction === 'next') {
      sliderList.appendChild(sliderItems[0]);
      thumbnail.appendChild(thumbnailItems[0]);
      slider.classList.add('next');
    } else {
      sliderList.prepend(sliderItems[sliderItems.length - 1]);
      thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
      slider.classList.add('prev');
    }

    slider.addEventListener(
      'animationend',
      () => {
        slider.classList.remove('next', 'prev');
        isAnimating = false;
      },
      { once: true }
    );
  });
}

// ▶️ Auto-slide control
function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => moveSlider('next'), autoSlideDelay);
}

function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}

// ⏯️ Pause on hover or touch
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

// 🎯 Button events
nextBtn.addEventListener('click', () => {
  moveSlider('next');
  startAutoSlide();
});
prevBtn.addEventListener('click', () => {
  moveSlider('prev');
  startAutoSlide();
});

// 🤚 Swipe gesture support for mobile
let startX = 0;
let endX = 0;

slider.addEventListener(
  'touchstart',
  (e) => {
    startX = e.touches[0].clientX;
    stopAutoSlide();
  },
  { passive: true }
);

slider.addEventListener(
  'touchmove',
  (e) => {
    endX = e.touches[0].clientX;
  },
  { passive: true }
);

slider.addEventListener(
  'touchend',
  () => {
    const diff = endX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) moveSlider('prev');
      else moveSlider('next');
    }
    startAutoSlide();
  },
  { passive: true }
);

// 🌙 Optimize scroll & touch responsiveness
window.addEventListener('scroll', () => {}, { passive: true });
window.addEventListener('touchstart', () => {}, { passive: true });

// 🚀 Start autoplay when ready
startAutoSlide();

// Start autoplay on load
startAutoSlide();

