document.addEventListener("DOMContentLoaded", () => {

  /* =======================
       LEFT PANEL TOGGLE
  ======================== */
  const panel = document.getElementById("side-curriculum");
  const toggleButton = document.getElementById("toggle-panel");

  // 첫 시작은 "열림 상태"
  let isOpen = true;

  toggleButton.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      panel.classList.remove("closed");
    } else {
      panel.classList.add("closed");
    }
  });


  /* =======================
        HERO CODE SLIDER
  ======================== */
  const slides = document.querySelectorAll(".slider .slide");
  let current = 0;

  function showNextSlide() {
    slides[current].classList.remove("showing");
    current = (current + 1) % slides.length;
    slides[current].classList.add("showing");
  }

  if (slides.length > 1) {
    setInterval(showNextSlide, 3500);
  }

});
