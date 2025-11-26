import fetch from "node-fetch";

export async function handler(event, context) {
    const playlistId = "pl.u-ovURBX17aZ";
    const embedUrl = `https://embed.music.apple.com/us/playlist/favorite-songs/${playlistId}`;

    try {
        // Fetch embed page (server CAN do this)
        const html = await fetch(embedUrl).then(r => r.text());

        // Extract auth token
        const tokenMatch = html.match(/"token"\s*:\s*"([^"]+)"/);

        if (!tokenMatch) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to extract token" })
            };
        }

        const token = tokenMatch[1];

        // Fetch playlist JSON
        const apiUrl = `https://amp-api.music.apple.com/v1/catalog/us/playlists/${playlistId}`;

        const res = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data.data[0].relationships.tracks.data)
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
}
