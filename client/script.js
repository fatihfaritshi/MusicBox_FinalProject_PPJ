const apiURL = "http://localhost:3001/api/songs"; 
const musicList = document.getElementById("music-list");
const form = document.getElementById("add-music-form");
const titleInput = document.getElementById("music-title");
const yearInput = document.getElementById("music-year");
const singerInput = document.getElementById("music-singer"); 
const searchInput = document.getElementById("search-music");
const searchButton = document.getElementById("search-button");

let musics = [];

async function fetchMusics() {
    const response = await fetch(apiURL);
    musics = await response.json();
    displayMusics(musics);
}

// Display musics in the list
function displayMusics(musics) {
    musicList.innerHTML = "";
    musics.forEach((music) => {
        const musicCard = document.createElement("div");
        musicCard.className = "music-card";
        musicCard.innerHTML = `
        <h2>${music.title}</h2>
        <p>Year: ${music.year}</p>
        <p>Singer: ${music.singer}</p> 
        <button onclick="deleteMusic(${music.id})">Delete</button>
        `;
        musicList.appendChild(musicCard);
    });
}

// ADD
form.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    
    const newMusic = {
        title: titleInput.value,
        year: yearInput.value,
        singer: singerInput.value, 
    };

    await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMusic),
    })

    titleInput.value = "";
    yearInput.value = "";
    singerInput.value = "";
    fetchMusics();
});

// DELETE
async function deleteMusic(id) {
    await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    fetchMusics();
}

// SEARCH
searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMusics = musics.filter((music) =>
        music.title.toLowerCase().includes(searchTerm) || music.singer.toLowerCase().includes(searchTerm) // Cari berdasarkan title atau singer
    );
    displayMusics(filteredMusics);
});

fetchMusics();