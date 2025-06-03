const popularAppIds = [
  570,    // Dota 2
  730,    // CS:GO
  578080, // PUBG
  271590, // GTA V
  1172470,// Apex Legends
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

export async function getRecommendedGames() {
    try {
        const gameDetails = await Promise.all(
            popularAppIds.slice(0, 4).map(async (appid) => {
                const detail = await fetchGameDetails(appid);
                if (detail.success) {
                    return {
                        title: detail.data.name,
                        description: detail.data.short_description,
                        genres: detail.data.genres ? detail.data.genres.map(g => g.description) : [],
                        percentage: Math.floor(Math.random() * 20 + 80) + '%',
                        appid: appid
                    };
                }
                return null;
            })
        );
        return gameDetails.filter(game => game !== null);
    } catch (error) {
        console.error('Error fetching recommended games:', error);
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
                        genres: detail.data.genres ? detail.data.genres.map(g => g.description) : [],
                        hot: true,
                        appid: appid
                    };
                }
                return null;
            })
        );
        return gameDetails.filter(game => game !== null);
    } catch (error) {
        console.error('Error fetching trending games:', error);
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
                        genres: detail.data.genres ? detail.data.genres.map(g => g.description) : [],
                        appid: appid
                    };
                }
                return null;
            })
        );
        const allGames = gameDetails.filter(game => game !== null);
        const filtered = allGames.filter(game => 
            game.title.toLowerCase().includes(query.toLowerCase())
        );
        if (filtered.length > 0) {
            return filtered;
        }
        const searchUrl = `http://localhost:3001/api/search?query=${encodeURIComponent(query)}`;
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
                            genres: detail.data.genres ? detail.data.genres.map(g => g.description) : [],
                            appid: appid
                        };
                    }
                    return null;
                })
            );
            return details.filter(game => game !== null);
        }
        return [];
    } catch (error) {
        console.error('Error searching games:', error);
        return [];
    }
}
    
