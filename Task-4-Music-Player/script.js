// ==========================
// SONG LIST
// ==========================

const songs = [

    {
        title: "No Copyright Music",
        artist: "SigmaMusicArt",
        src: "songs/song1.mp3",
        cover: "images/cover1.png",
        favorite: false
    },

    {
        title: "Amapiano Beats Log Drum Groove",
        artist: "alex-morgan",
        src: "songs/song2.mp3",
        cover: "images/cover2.jpg",
        favorite: false
    },

    {
        title: "Business Growth Professional Pitch",
        artist: "alex-morgan",
        src: "songs/song3.mp3",
        cover: "images/cover3.jpg",
        favorite: false
    },

    {
        title: "Documentary Discovery Wide Horizon",
        artist: "alex-morgan",
        src: "songs/song4.mp3",
        cover: "images/cover4.jpg",
        favorite: false
    }

];

// ==========================
// ELEMENTS
// ==========================

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");
const muteBtn = document.getElementById("mute");

const playlist = document.getElementById("playlist");

const themeBtn = document.getElementById("themeBtn");

// ==========================
// VARIABLES
// ==========================

let songIndex = 0;

let isPlaying = false;

let shuffle = false;

let repeat = false;

// ==========================
// LOAD SONG
// ==========================

function loadSong(index){

    const song = songs[index];

    title.textContent = song.title;

    artist.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.src;

    renderPlaylist();

}

// ==========================
// PLAY SONG
// ==========================

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

    cover.classList.add("playing");

}

// ==========================
// PAUSE SONG
// ==========================

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    cover.classList.remove("playing");

}

// ==========================
// PLAY / PAUSE
// ==========================

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});

// ==========================
// INITIAL SONG
// ==========================

loadSong(songIndex);
// ==========================
// NEXT SONG
// ==========================

function nextSong() {

    if (shuffle) {

        songIndex = Math.floor(
            Math.random() * songs.length
        );

    } else {

        songIndex++;

        if (songIndex >= songs.length) {

            songIndex = 0;

        }

    }

    loadSong(songIndex);

    playSong();

}

// ==========================
// PREVIOUS SONG
// ==========================

function previousSong() {

    if (shuffle) {

        songIndex = Math.floor(
            Math.random() * songs.length
        );

    } else {

        songIndex--;

        if (songIndex < 0) {

            songIndex = songs.length - 1;

        }

    }

    loadSong(songIndex);

    playSong();

}

// ==========================
// BUTTON EVENTS
// ==========================

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", previousSong);

// ==========================
// UPDATE PROGRESS BAR
// ==========================

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        progress.value =
            (audio.currentTime / audio.duration) * 100;

        currentTime.textContent =
            formatTime(audio.currentTime);

        duration.textContent =
            formatTime(audio.duration);

    }

});

// ==========================
// SEEK FUNCTION
// ==========================

progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) *
            audio.duration;

    }

});

// ==========================
// FORMAT TIME
// ==========================

function formatTime(time) {

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

}

// ==========================
// VOLUME CONTROL
// ==========================

volume.addEventListener("input", () => {

    audio.volume = volume.value / 100;

    if (audio.volume === 0) {

        muteBtn.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

    }

    else {

        muteBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

    }

});

// ==========================
// MUTE / UNMUTE
// ==========================

muteBtn.addEventListener("click", () => {

    audio.muted = !audio.muted;

    if (audio.muted) {

        muteBtn.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

    }

    else {

        muteBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

    }

});
// ==========================
// PLAYLIST
// ==========================

function renderPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        if (index === songIndex) {

            li.classList.add("active");

        }

        li.innerHTML = `

        <div class="song-info">

            <span class="song-title">
                ${song.title}
            </span>

            <span class="song-artist">
                ${song.artist}
            </span>

        </div>

        <i class="fa-solid fa-heart favorite ${song.favorite ? "active" : ""}"></i>

        `;

        // Select Song
        li.addEventListener("click", () => {

            songIndex = index;

            loadSong(songIndex);

            playSong();

        });

        // Favorite
        li.querySelector(".favorite").addEventListener("click", (e) => {

            e.stopPropagation();

            songs[index].favorite = !songs[index].favorite;

            renderPlaylist();

        });

        playlist.appendChild(li);

    });

}

// ==========================
// SHUFFLE
// ==========================

shuffleBtn.addEventListener("click", () => {

    shuffle = !shuffle;

    shuffleBtn.classList.toggle("active");

});

// ==========================
// REPEAT
// ==========================

repeatBtn.addEventListener("click", () => {

    repeat = !repeat;

    repeatBtn.classList.toggle("active");

});

// ==========================
// SONG END
// ==========================

audio.addEventListener("ended", () => {

    if (repeat) {

        playSong();

    }

    else {

        nextSong();

    }

});

// ==========================
// THEME
// ==========================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

    else {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});

// ==========================
// KEYBOARD SHORTCUTS
// ==========================

document.addEventListener("keydown", (e) => {

    switch (e.code) {

        case "Space":

            e.preventDefault();

            isPlaying
                ? pauseSong()
                : playSong();

            break;

        case "ArrowRight":

            nextSong();

            break;

        case "ArrowLeft":

            previousSong();

            break;

    }

});

// ==========================
// INITIALIZE
// ==========================

renderPlaylist();

audio.volume = 1;

console.log("🎵 Music Player Loaded Successfully");