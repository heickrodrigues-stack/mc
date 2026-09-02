// Base de dados das músicas
const tracks = [
  { id: 1, title: "Hit do Momento", category: "populares", year: "2024", duration: "2:30" },
  { id: 2, title: "Lançamento Pesado", category: "lancamentos", year: "2024", duration: "2:15" },
  { id: 3, title: "Feat. Especial", category: "parcerias", year: "2023", duration: "2:45" },
  { id: 4, title: "Baile da Catrina", category: "populares", year: "2023", duration: "2:20" },
  { id: 5, title: "Ritmo Envolvente", category: "lancamentos", year: "2024", duration: "2:10" },
  { id: 6, title: "Set Funk SP", category: "parcerias", year: "2023", duration: "3:05" }
];

let currentTrack = null;
let isPlaying = false;
let selectedCategory = "todos";

const musicGrid = document.getElementById("music-list");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const currentTitle = document.getElementById("current-title");
const btnPlayPause = document.getElementById("btn-play-pause");

function renderTracks() {
  musicGrid.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "todos" || track.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    musicGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">Nenhuma música encontrada.</p>`;
    return;
  }

  filtered.forEach(track => {
    const card = document.createElement("div");
    card.className = "music-card";
    card.innerHTML = `
      <div>
        <h3>${track.title}</h3>
        <p>MC Catrina • ${track.year}</p>
      </div>
      <div class="card-footer">
        <span style="font-size: 0.8rem; color: #94a3b8;">${track.duration}</span>
        <button class="btn-play" onclick="playTrack(${track.id})">▶</button>
      </div>
    `;
    musicGrid.appendChild(card);
  });
}

function playTrack(id) {
  const track = tracks.find(t => t.id === id);
  if (track) {
    currentTrack = track;
    isPlaying = true;
    currentTitle.textContent = track.title;
    btnPlayPause.textContent = "⏸";
  }
}

btnPlayPause.addEventListener("click", () => {
  if (!currentTrack) return;
  isPlaying = !isPlaying;
  btnPlayPause.textContent = isPlaying ? "⏸" : "▶";
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.category;
    renderTracks();
  });
});

searchInput.addEventListener("input", renderTracks);

// Inicialização
renderTracks();
