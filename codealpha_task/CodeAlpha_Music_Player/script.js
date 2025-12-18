const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

const songs = [
    {
        name: "song1",
        title: "Night Vibes",
        artist: "DJ Aurora",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
    },
    {
        name: "song2",
        title: "Calm Breeze",
        artist: "Arjun Malhotra",
        cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    },
    {
        name: "song3",
        title: "Lost in Love",
        artist: "Neha Sharma",
        cover: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae"
    }
];

let songIndex = 0;

/* LOAD SONG */
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = `songs/${song.name}.mp3`; // mp3 must exist
    cover.src = song.cover;
    playBtn.innerText = "▶";
    updatePlaylist();
}

/* PLAY / PAUSE */
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
}

/* NEXT / PREVIOUS */
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.innerText = "⏸";
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.innerText = "⏸";
}

/* DURATION LOAD */
audio.addEventListener("loadedmetadata", () => {
    durationEl.innerText = formatTime(audio.duration);
});

/* TIME UPDATE */
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    currentTimeEl.innerText = formatTime(audio.currentTime);
    progress.style.width =
        (audio.currentTime / audio.duration) * 100 + "%";
});

/* SEEK */
function setProgress(e) {
    const width = e.currentTarget.clientWidth;
    audio.currentTime = (e.offsetX / width) * audio.duration;
}

/* VOLUME */
function setVolume(value) {
    audio.volume = value;
}

/* AUTOPLAY */
audio.addEventListener("ended", nextSong);

/* FORMAT TIME */
function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

/* PLAYLIST */
function updatePlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerText = song.title;
        if (index === songIndex) li.classList.add("active");
        li.onclick = () => {
            songIndex = index;
            loadSong(song);
            audio.play();
            playBtn.innerText = "⏸";
        };
        playlistEl.appendChild(li);
    });
}

/* INIT */
loadSong(songs[songIndex]);
