let tracks = [];

window.addEventListener("message", (event) => {
    if (!event.data || !event.data.playlist) return;

    tracks = event.data.playlist.songs;

    console.log("✅ Playlist loaded:", tracks.length, "tracks");
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
    if (!tracks.length) {
        alert("Playlist not loaded yet, try again.");
        return;
    }

    const track = tracks[Math.floor(Math.random() * tracks.length)];

    const artwork = track.artwork.url
        .replace("{w}", "600")
        .replace("{h}", "600");

    document.getElementById("cover").src = artwork;
    document.getElementById("title").textContent = track.title;

    document.getElementById("blurBg").style.backgroundImage = `url(${artwork})`;

    const rand = Math.random() * 100;
    document.getElementById("progressFill").style.width = rand + "%";
});
