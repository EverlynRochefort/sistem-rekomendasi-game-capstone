import "../styles/rekomendasi.css";
import { getRecommendedGames } from "../api";
import { Navbar, Footer } from "../components/index.js";

export async function renderRekomendasiPage() {
    const username = localStorage.getItem("username");
    return `
    ${Navbar(username)}
    <main>
    <div class="rekomendasi-page">
        <h1>Game Recommendation System</h1>
        <p>Temukan game baru berdasarkan game favorit Anda. Masukkan nama game yang Anda sukai dan kami akan mencari game serupa yang mungkin akan Anda suka.</p>
    </div>
    <div class="rekomendasi-form">
        <form id="rekomendasiForm">
            <div class="form-group">
                <h2>Game Name</h2>
                <input type="text" id="gameName" placeholder="example: The Witcher 3, Minecraft, Fornite">
            </div>
            
            <div class="form-group">
                <h2>Number of Recommendations</h2>
                <input type="number" id="numberOfRecommendations" placeholder="example: 5">
            </div>

            <button type="submit" class="signin-btn">Get Recommendations</button>
        </form>
    </div>
    <div id="recommendationResults" class="game-grid"></div>
    </main>
    ${Footer()}
    `;
}

export function attachRekomendasiHandler() {
    const rekomendasiForm = document.getElementById("rekomendasiForm");
    if (!rekomendasiForm) return;

    rekomendasiForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const gameName = document.getElementById("gameName").value.trim();
        const numberOfRecommendations = document.getElementById("numberOfRecommendations").value;
        const recommendationResults = document.getElementById("recommendationResults");

        if (!gameName || !numberOfRecommendations) {
            alert("Please enter both game name and number of recommendations.");
            return;
        }

        recommendationResults.innerHTML = '<div class="loading">Getting recommendations...</div>';

        try {
            const recommendations = await getRecommendedGames(gameName, numberOfRecommendations);
            if (recommendations.length > 0) {
                recommendationResults.innerHTML = recommendations.map(game => `
                    <div class="game-card">
                        <img class="game-poster" src="https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg" alt="${game.title} poster" />
                        <h3>${game.title}</h3>
                        <p class="game-description">${game.description}</p>
                        <button class="detail-btn" data-appid="${game.appid}">Lihat Detail</button>
                    </div>
                `).join("");

                // Attach detail button listeners for newly rendered games
                recommendationResults.querySelectorAll(".detail-btn").forEach(button => {
                    button.addEventListener("click", (e) => {
                        const appId = e.target.dataset.appid;
                        window.location.hash = `#/detail/${appId}`;
                    });
                });

            } else {
                recommendationResults.innerHTML = '<div class="no-results">No recommendations found for this game.</div>';
            }
        } catch (error) {
            console.error("Error getting recommendations:", error);
            recommendationResults.innerHTML = '<div class="error">Error loading recommendations.</div>';
        }
    });
}