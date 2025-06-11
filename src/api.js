const popularAppIds = [
  570, // Dota 2
  730, // CS:GO
  578080, // PUBG
  271590, // GTA V
  1172470, // Apex Legends
  252490, // Rust
  381210, // Dead by Daylight
  359550, // Rainbow Six Siege
];

export async function fetchGameDetails(appId) {
  const url = `http://localhost:3001/api/appdetails?appids=${appId}`;
  const response = await fetch(url);
  const gameDetail = await response.json();
  return gameDetail[appId];
}

export async function getRecommendedGames(gameName, numberOfRecommendations) {
  try {
    if (gameName) {
      const similarGames = await getSimilarGamesByName(gameName);
      if (similarGames.length > 0) {
        return similarGames.slice(0, numberOfRecommendations || 5);
      } else {
        console.warn("No similar games found by name, falling back to popular games.");
      }
    }

    const gameDetails = await Promise.all(
      popularAppIds.slice(0, 4).map(async (appid) => {
        const detail = await fetchGameDetails(appid);
        if (detail.success) {
          return {
            title: detail.data.name,
            description: detail.data.short_description,
            genres: detail.data.genres
              ? detail.data.genres.map((g) => g.description)
              : [],
            percentage: Math.floor(Math.random() * 20 + 80) + "%",
            appid: appid,
          };
        }
        return null;
      })
    );
    return gameDetails.filter((game) => game !== null);
  } catch (error) {
    console.error("Error fetching recommended games:", error);
    return [];
  }
}

export async function getTrendingGames() {
  try {
    const gameDetails = await Promise.all(
      popularAppIds.slice(4, 8).map(async (appid) => {
        const detail = await fetchGameDetails(appid);
        if (detail.success) {
          return {
            title: detail.data.name,
            description: detail.data.short_description,
            genres: detail.data.genres
              ? detail.data.genres.map((g) => g.description)
              : [],
            hot: true,
            appid: appid,
          };
        }
        return null;
      })
    );
    return gameDetails.filter((game) => game !== null);
  } catch (error) {
    console.error("Error fetching trending games:", error);
    return [];
  }
}

export async function searchGames(query) {
  try {
    const gameDetails = await Promise.all(
      popularAppIds.map(async (appid) => {
        const detail = await fetchGameDetails(appid);
        if (detail.success) {
          return {
            title: detail.data.name,
            description: detail.data.short_description,
            genres: detail.data.genres
              ? detail.data.genres.map((g) => g.description)
              : [],
            appid: appid,
          };
        }
        return null;
      })
    );
    const allGames = gameDetails.filter((game) => game !== null);
    const filtered = allGames.filter((game) =>
      game.title.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length > 0) {
      return filtered;
    }
    const searchUrl = `http://localhost:3001/api/search?query=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const details = await Promise.all(
        data.map(async (appid) => {
          const detail = await fetchGameDetails(appid);
          if (detail.success) {
            return {
              title: detail.data.name,
              description: detail.data.short_description,
              genres: detail.data.genres
                ? detail.data.genres.map((g) => g.description)
                : [],
              appid: appid,
            };
          }
          return null;
        })
      );
      return details.filter((game) => game !== null);
    }
    return [];
  } catch (error) {
    console.error("Error searching games:", error);
    return [];
  }
}

export async function getSimilarGames(appId) {
  try {
    // Get the current game details first
    const currentGame = await fetchGameDetails(appId);
    if (!currentGame.success) {
      console.error("Current game detail error:", currentGame);
      return [];
    }
    const currentName = currentGame.data.name;
    // Ambil kata kunci utama dari judul (misal: kata pertama, atau kata unik sebelum angka/kolon)
    let keyword = currentName.split(/:| |-/)[0];
    if (keyword.length < 3 && currentName.split(" ").length > 1) {
      // Jika kata pertama terlalu pendek, ambil dua kata pertama
      keyword = currentName.split(" ").slice(0, 2).join(" ");
    }
    // 1. Cari berdasarkan nama
    const searchUrl = `http://localhost:3001/api/search?query=${encodeURIComponent(
      keyword
    )}`;
    let response = await fetch(searchUrl);
    let appids = await response.json();
    // Hilangkan appId yang sedang dilihat
    appids = appids.filter((id) => id != appId);
    let details = await Promise.all(
      appids.map(async (id) => {
        const detail = await fetchGameDetails(id);
        if (detail.success) {
          return {
            title: detail.data.name,
            description: detail.data.short_description,
            genres: detail.data.genres
              ? detail.data.genres.map((g) => g.description)
              : [],
            appid: id,
          };
        }
        return null;
      })
    );
    details = details.filter((game) => game !== null);
    // Jika hasil pencarian nama cukup (>=2), pakai hasil ini
    if (details.length >= 2) {
      return details.slice(0, 4);
    }
    // 2. Jika tidak, fallback ke genre
    const currentGenres = currentGame.data.genres
      ? currentGame.data.genres.map((g) => g.description)
      : [];
    const gameDetails = await Promise.all(
      popularAppIds.map(async (id) => {
        if (id === parseInt(appId)) return null;
        const detail = await fetchGameDetails(id);
        if (detail.success) {
          return {
            title: detail.data.name,
            description: detail.data.short_description,
            genres: detail.data.genres
              ? detail.data.genres.map((g) => g.description)
              : [],
            appid: id,
          };
        }
        return null;
      })
    );
    const allGames = gameDetails.filter((game) => game !== null);
    const similarGames = allGames.filter((game) => {
      const matchingGenres = game.genres.filter((genre) =>
        currentGenres.includes(genre)
      );
      return matchingGenres.length > 0;
    });
    return similarGames
      .sort((a, b) => {
        const aMatches = a.genres.filter((genre) =>
          currentGenres.includes(genre)
        ).length;
        const bMatches = b.genres.filter((genre) =>
          currentGenres.includes(genre)
        ).length;
        return bMatches - aMatches;
      })
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching similar games:", error);
    return [];
  }
}

async function getSimilarGamesByName(gameName) {
  try {
    const searchUrl = `http://localhost:3001/api/search?query=${encodeURIComponent(gameName)}`;
    const response = await fetch(searchUrl);
    const appids = await response.json();

    if (Array.isArray(appids) && appids.length > 0) {
      const details = await Promise.all(
        appids.map(async (id) => {
          const detail = await fetchGameDetails(id);
          if (detail.success) {
            return {
              title: detail.data.name,
              description: detail.data.short_description,
              genres: detail.data.genres
                ? detail.data.genres.map((g) => g.description)
                : [],
              appid: id,
            };
          }
          return null;
        })
      );
      return details.filter((game) => game !== null);
    }
    return [];
  } catch (error) {
    console.error("Error fetching similar games by name:", error);
    return [];
  }
}
