let tracks = [];
const shuffleBtn = document.getElementById("shuffleBtn");
shuffleBtn.disabled = true;
shuffleBtn.textContent = "Loading…";

window.addEventListener("message", (event) => {
    if (!event.data || !event.data.playlist) return;

    tracks = event.data.playlist.songs;

    console.log("✅ Playlist loaded:", tracks.length, "tracks");

    shuffleBtn.disabled = false;
    shuffleBtn.textContent = "Shuffle";
});

shuffleBtn.addEventListener("click", () => {
    const track = tracks[Math.floor(Math.random() * tracks.length)];

    const artwork = track.artwork.url
        .replace("{w}", "600")
        .replace("{h}", "600");

    document.getElementById("cover").src = artwork;
    document.getElementById("title").textContent = track.title;
    document.getElementById("blurBg").style.backgroundImage = `url(${artwork})`;

    document.getElementById("progressFill").style.width =
        Math.random() * 100 + "%";
});
