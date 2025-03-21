document.addEventListener("DOMContentLoaded", function () {
  var video = document.getElementById("video1");
  var playPauseButton = document.getElementById("play-pause");
  var stopButton = document.getElementById("stop");
  var seekBar = document.getElementById("seek-bar");
  var videoContainer = document.querySelector(".video-container");
  var fullscreenButton = document.getElementById("fullscreen");

  function showControls() {
    videoContainer.classList.add("show-controls");
  }

  function hideControls() {
    videoContainer.classList.remove("show-controls");
  }

  playPauseButton.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
      hideControls();
    } else {
      video.pause();
      playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
      showControls();
    }
  });

  stopButton.addEventListener("click", function () {
    video.pause();
    video.currentTime = 0;
    playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
    showControls();
  });

  video.addEventListener("timeupdate", function () {
    var value = (100 / video.duration) * video.currentTime;
    seekBar.value = value;
  });

  seekBar.addEventListener("input", function () {
    var time = (video.duration / 100) * seekBar.value;
    video.currentTime = time;
  });

  video.addEventListener("pause", showControls);
  video.addEventListener("play", hideControls);

  videoContainer.addEventListener("mouseenter", showControls);
  videoContainer.addEventListener("mouseleave", hideControls);

  fullscreenButton.addEventListener("click", function () {
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
      fullscreenButton.innerHTML = '<i class="fa fa-compress"></i>';
    } else {
      document.exitFullscreen();
      fullscreenButton.innerHTML = '<i class="fa fa-expand"></i>';
    }
  });

  document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement) {
      fullscreenButton.innerHTML = '<i class="fa fa-expand"></i>';
    }
  });
});
