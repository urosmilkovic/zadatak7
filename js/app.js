const vp = document.querySelector(".video_player"),
  mainVideo = vp.querySelector(".main-video"),
  progAreaTime = vp.querySelector(".progressAreaTime"),
  controls = vp.querySelector(".controls"),
  progArea = vp.querySelector(".progress-area"),
  progBar = vp.querySelector(".progress-bar"),
  rewind = vp.querySelector(".fast-rewind"),
  play_pause = vp.querySelector(".play_pause"),
  forward = vp.querySelector(".fast-forward"),
  volume = vp.querySelector(".volume"),
  volumeR = vp.querySelector(".volume_range"),
  current = vp.querySelector(".current"),
  duration = vp.querySelector(".duration"),
  settingsBtn = vp.querySelector(".settingsBtn"),
  fullscreen = vp.querySelector(".fullscreen"),
  settings = vp.querySelector(".settings"),
  playback = vp.querySelectorAll(".playback li");

function playVideo() {
  play_pause.innerHTML = "pause";
  play_pause.title = "pause";
  vp.classList.add("paused");
  mainVideo.play();
}

function pauseVideo() {
  play_pause.innerHTML = "play_arrow";
  play_pause.title = "play";
  vp.classList.remove("paused");
  mainVideo.pause();
}

play_pause.addEventListener("click", () => {
  const isVideoPaused = vp.classList.contains("paused");
  isVideoPaused ? pauseVideo() : playVideo();
});

rewind.addEventListener("click", () => {
  mainVideo.currentTime -= 10;
});

forward.addEventListener("click", () => {
  mainVideo.currentTime += 10;
});

mainVideo.addEventListener("loadeddata", (e) => {
  let tduration = e.target.duration;
  let totalMin = Math.floor(tduration / 60);
  let totalSec = Math.floor(tduration % 60);

  totalSec < 10 ? (totalSec = "0" + totalSec) : totalSec;
  duration.innerHTML = `${totalMin} : ${totalSec}`;
});

mainVideo.addEventListener("timeupdate", (e) => {
  let currentVT = e.target.currentTime;
  let currentM = Math.floor(currentVT / 60);
  let currentS = Math.floor(currentVT % 60);

  currentS < 10 ? (currentS = "0" + currentS) : currentS;
  current.innerHTML = `${currentM} : ${currentS}`;

  let Vduration = e.target.duration;
  let progWid = (currentVT / Vduration) * 100;
  progBar.style.width = `${progWid}%`;
});

progArea.addEventListener("click", (e) => {
  let Vduration = mainVideo.duration;
  let progWid = progArea.clientWidth;
  let clickX = e.offsetX;

  mainVideo.currentTime = (clickX / progWid) * Vduration;
});

function changeVolume() {
  mainVideo.volume = volumeR.value / 100;
  if (volumeR.value == 0) volume.innerHTML = "volume_off";
  else if (volumeR.value < 40) volume.innerHTML = "volume_down";
  else volumeR.innerHTML = "volume_up";
}

function muteVolume() {
  if (volumeR.value == 0) {
    volumeR.value = 80;
    mainVideo.volume = 0.8;
    volume.innerHTML = "volume_up";
  } else {
    volumeR.value = 0;
    mainVideo.volume = 0;
    volume.innerHTML = "volume_off";
  }
}

volumeR.addEventListener("change", () => {
  changeVolume();
});

volume.addEventListener("click", () => {
  muteVolume();
});

progArea.addEventListener("mousemove", (e) => {
  let progWid = progArea.clientWidth;
  let x = e.offsetX;
  progAreaTime.style.setProperty("--x", `${x}px`);
  progAreaTime.style.display = "block";
  let Vduration = mainVideo.duration;
  let progTime = Math.floor((x / progWid) * Vduration);
  let currentM = Math.floor(progTime / 60);
  let currentS = Math.floor(progTime % 60);

  currentS < 10 ? (currentS = "0" + currentS) : currentS;
  progAreaTime.innerHTML = `${currentM} : ${currentS}`;
});

progArea.addEventListener("mouseleave", () => {});

fullscreen.addEventListener("click", () => {
  if (!vp.classList.contains("openFullScreen")) {
    vp.classList.add("openFullScreen");
    fullscreen.innerHTML = "fullscreen_exit";
    vp.requestFullscreen();
  } else {
    vp.classList.remove("openFullScreen");
    fullscreen.innerHTML = "fullscreen";
    document.exitFullscreen();
  }
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("active");
  settingsBtn.classList.toggle("active");
});

playback.forEach((e) => {
  e.addEventListener("click", () => {
    removeActiveClasses();
    e.classList.add("active");
    let speed = e.getAttribute("data-speed");
    mainVideo.playbackRate = speed;
  });
});

function removeActiveClasses() {
  playback.forEach((e) => {
    e.classList.remove("active");
  });
}
