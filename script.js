document.addEventListener("DOMContentLoaded", function () {
  let progress = document.getElementById("progress");
  let song = document.getElementById("song");
  let ctrlIcon = document.getElementById("control-Icon");
  let btn_play_pause = document.querySelector(".playPause");
  let btn_Back = document.querySelector(".Back");
  let btn_Next = document.querySelector(".Next");
  let song_image = document.querySelector(".song-img");

  let songs = [
    {
      src: "Resources/Music.mp3",
      img: "Resources/titan (1) (1).jpeg",
      title: "OP 1 Attack on Titan",
      artist: "Ni idea we",
    },
    {
      src: "Resources/One Piece Opening 1.mp3",
      img: "Resources/One Piece (1) (1).jpeg",
      title: "OP 1 One Piece",
      artist: "Ni idea we",
    },
    {
      src: "Resources/OP 1 Jujutsu Kaisen.mp3",
      img: "Resources/Ao No Sumika (1) (1).jpg",
      title: "OP 1 Jujutsu Kaisen",
      artist: "Ni idea we",
    },
  ];

  let currentSongIndex = 0;

  function loadSong(songIndex) {
    let songData = songs[songIndex];
    song.src = songData.src;
    song_image.src = songData.img;
    document.querySelector("h1").innerText = songData.title;
    document.querySelector("p").innerText = songData.artist;
    song.load();
  }

  function playPause() {
    if (song.paused) {
      song.play();
      ctrlIcon.classList.remove("fa-play");
      ctrlIcon.classList.add("fa-pause");
    } else {
      song.pause();
      ctrlIcon.classList.remove("fa-pause");
      ctrlIcon.classList.add("fa-play");
    }
  }

  function Back() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playPause();
  }

  function Next() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playPause();
  }

  song.volume = 0.05;

  song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
  };

  if (song.play()) {
    setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
  }

  progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  };

  btn_Back.addEventListener("click", function () {
    Back();
  });

  btn_play_pause.addEventListener("click", function () {
    playPause();
  });

  btn_Next.addEventListener("click", function () {
    Next();
  });

  loadSong(currentSongIndex);
});
