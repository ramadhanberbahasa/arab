document.addEventListener("DOMContentLoaded", () => {
  const songItems = document.querySelectorAll(".song-item");

  songItems.forEach((item) => {
    const playBtn = item.querySelector(".play-btn");
    const progressBar = item.querySelector(".progress-bar");
    const audio = new Audio(item.dataset.audio);

    let isPlaying = false;

    playBtn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      } else {
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
      }
      isPlaying = !isPlaying;
    });

    audio.addEventListener("timeupdate", () => {
      progressBar.value = (audio.currentTime / audio.duration) * 100;
    });

    progressBar.addEventListener("input", () => {
      audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    audio.addEventListener("ended", () => {
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      isPlaying = false;
    });
  });
});
