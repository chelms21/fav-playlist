async function getTracks() {
    try {
        const res = await fetch("/.netlify/functions/playlist");
        if (!res.ok) throw new Error("Proxy error " + res.status);

        return await res.json();

    } catch (err) {
        alert("Error: " + err.message);
        console.error(err);
        return null;
    }
}

document.getElementById("shuffle").addEventListener("click", async () => {
    const tracks = await getTracks();
    if (!tracks) return;

    const track = tracks[Math.floor(Math.random() * tracks.length)];
    const attrs = track.attributes;

    const cover = attrs.artwork.url
        .replace("{w}", "600")
        .replace("{h}", "600");

    document.getElementById("player").style.display = "block";

    document.getElementById("title").textContent = attrs.name;
    document.getElementById("artist").textContent = attrs.artistName;
    document.getElementById("cover").src = cover;
    document.getElementById("bg").style.backgroundImage = `url(${cover})`;

    const percent = Math.random() * 100;
    document.getElementById("bar").style.width = percent + "%";
});
