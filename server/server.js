const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());


let songs = [
    { id: 1, title: "Fine Line", year: 2020, singer: "Harry Styles" },
    { id: 2, title: "Alienated", year: 2024, singer: "Zayn" },
    { id: 3, title: "Ocean & Engines", year: 2022, singer: "NIKI" },
    { id: 4, title: "So Long, London", year: 2024, singer: "Taylor Swift" },
    { id: 5, title: "Little Window", year: 2024, singer: "FINNEAS" },
    { id: 6, title: "That's So True", year: 2024, singer: "Gracie Abrams" },
    { id: 7, title: "You're Gonna Go Far", year: 2008, singer: "Noah Kahan" },
    { id: 8, title: "Mercy", year: 2018, singer: "Shawn Mendes" },
    { id: 9, title: "Wildflower", year: 2024, singer: "Billie Eilish" },
    { id: 10, title: "Nobody Gets Me", year: 2022, singer: "SZA" },
    { id: 11, title: "Always", year: 2023, singer: "Daniel Caesar" },
    { id: 12, title: "Monster In Me", year: 2018, singer: "Little Mix" },
];

let nextId = songs.length > 0 ? songs[songs.length - 1].id + 1 : 1;

// Get all songs
app.get('/api/songs', (req, res) => {
    res.json(songs);
});

// Get a specific song by ID
app.get('/api/songs/:id', (req, res) => {
    const song = songs.find(s => s.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).json({ error: "Song not found" });
    }
    res.json(song);
});

// Add a new song
app.post('/api/songs', (req, res) => {
    const { title, year, singer } = req.body;
    if (!title || !year || !singer) {
        return res.status(400).json({ error: "Title, year, and singer are required" });
    }
    const newSong = { id: nextId++, title, year, singer };
    songs.push(newSong);
    res.status(201).json(newSong); 
});

// Update an existing song
app.put('/api/songs/:id', (req, res) => {
    const { id } = req.params;
    const { title, year, singer } = req.body;

    if (!title || !year || !singer) {
        return res.status(400).json({ error: "Title, year, and singer are required" });
    }

    const songIndex = songs.findIndex(s => s.id === parseInt(id));
    if (songIndex === -1) {
        return res.status(404).json({ error: "Song not found" });
    }

    songs[songIndex] = { id: parseInt(id), title, year, singer };
    res.json(songs[songIndex]);
});

// Delete a song
app.delete('/api/songs/:id', (req, res) => {
    const { id } = req.params;
    const songIndex = songs.findIndex(s => s.id === parseInt(id));

    if (songIndex === -1) {
        return res.status(404).json({ error: "Song not found" });
    }

    songs.splice(songIndex, 1);
    res.json({ message: "Song deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
