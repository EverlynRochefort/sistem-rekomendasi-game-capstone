export function createGameCard(game) {
  const posterUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
  return `
    <div class="game-card">
        <img class="game-poster" src="${posterUrl}" alt="${
    game.title
  } poster" />
        <h3>${game.title}</h3>
        <div class="game-genres">
            ${game.genres
              .map((genre) => `<span class="genre-badge">${genre}</span>`)
              .join("")}
        </div>
        <p class="game-description">${game.description}</p>
        <button class="detail-btn" data-appid="${
          game.appid
        }">Lihat Detail</button>
    </div>
    `;
}
