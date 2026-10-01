const song = document.getElementById("song");
const openButton = document.getElementById("openSurprise");
const musicToggle = document.getElementById("musicToggle");
const finalGift = document.getElementById("finalGift");
const finalReveal = document.getElementById("finalReveal");
const modal = document.getElementById("messageModal");
const giftMessage = document.getElementById("giftMessage");
const closeModal = document.getElementById("closeModal");

let musicStarted = false;

function startMusic() {
  song.volume = 0.42;
  const playPromise = song.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      musicStarted = true;
      musicToggle.innerHTML = "♫ <span>Music</span>";
      musicToggle.setAttribute("aria-label", "Pause music");
    }).catch(() => {
      // Browser may still block playback; the Music button remains available.
    });
  }
}

openButton.addEventListener("click", () => {
  startMusic();
  document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
});

musicToggle.addEventListener("click", () => {
  if (song.paused) {
    startMusic();
  } else {
    song.pause();
    musicToggle.innerHTML = "♫ <span>Play Music</span>";
    musicToggle.setAttribute("aria-label", "Play music");
  }
});

document.querySelectorAll(".gift").forEach(gift => {
  gift.addEventListener("click", () => {
    giftMessage.textContent = gift.dataset.message;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeGiftModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
closeModal.addEventListener("click", closeGiftModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeGiftModal();
});

finalGift.addEventListener("click", () => {
  finalReveal.classList.add("show");
  finalGift.style.display = "none";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
