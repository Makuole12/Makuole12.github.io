let player;

// Funkcja wywoływana, gdy API YouTube jest gotowe
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        events: {
            'onReady': (event) => {
                // Możesz automatycznie odtwarzać po załadowaniu, jeśli chcesz
            }
        }
    });
}

// Przywracamy stan odtwarzania po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
    const iframe = document.getElementById('youtube-player');

    if (localStorage.getItem("musicPlaying") === "true") {
        player.seekTo(parseFloat(localStorage.getItem("currentTime")) || 0);
        player.playVideo();
    } else {
        document.addEventListener("click", () => playMusic());
    }
});

// Funkcja uruchamiająca lub pauzująca muzykę przy kliknięciu
function playMusic() {
    const isPlaying = localStorage.getItem("musicPlaying") === "true";

    if (isPlaying) {
        player.pauseVideo();
        localStorage.setItem("musicPlaying", "false");
    } else {
        player.playVideo();
        localStorage.setItem("musicPlaying", "true");
    }
}

// Zapisujemy aktualny czas odtwarzania przy zamknięciu strony
window.addEventListener("beforeunload", () => {
    localStorage.setItem("currentTime", player.getCurrentTime());
});

// Dodajemy skrypt YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
