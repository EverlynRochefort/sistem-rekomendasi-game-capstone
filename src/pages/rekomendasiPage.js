import "../styles/rekomendasi.css";
import { getRecommendedGamesWithDetails } from "../api.js";
import { Navbar, Footer, createGameCard } from "../components/index.js";

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
                <div class="form-group-rec">
                    <h2>Game Name</h2>
                    <input type="text" id="gameName" placeholder="example: The Witcher 3, Minecraft, Fornite" required>
                </div>
                
                <div class="form-group-rec">
                    <h2>Number of Recommendations</h2>
                    <input type="number" id="numberOfRecommendations" placeholder="example: 5" min="1" value="6" required>
                </div>

                <button type="submit" class="parse-btn">Get Recommendations</button>
                <!-- This is the missing element that caused the error -->
                <div id="formMessage" class="message-box" style="display: none;"></div>
            </form>
        </div>
        <div id="recommendationResults" class="game-grid"></div>
    </main>
    ${Footer()}
    `;
}

export function attachRekomendasiHandler() {
  const rekomendasiForm = document.getElementById("rekomendasiForm");
  const recommendationResults = document.getElementById(
    "recommendationResults"
  );
  const formMessage = document.getElementById("formMessage");

  if (!rekomendasiForm) {
    console.error(
      "Error: 'rekomendasiForm' element not found in the DOM. Cannot attach handlers."
    );
    return;
  }

  function showMessage(message, type = "info") {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.className = `message-box ${type}`;
      formMessage.style.display = "block";
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    } else {
      console.warn(
        "Attempted to show message but 'formMessage' element was not found in the DOM."
      );
    }
  }

  rekomendasiForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const gameNameInput = document.getElementById("gameName");
    const numberOfRecommendationsInput = document.getElementById(
      "numberOfRecommendations"
    );

    const gameName = gameNameInput.value.trim();
    const numberOfRecommendations = numberOfRecommendationsInput.value;

    if (!gameName) {
      showMessage("Please enter a game name.", "error");
      gameNameInput.focus();
      return;
    }
    if (!numberOfRecommendations || parseInt(numberOfRecommendations, 10) < 1) {
      showMessage(
        "Please enter a valid number of recommendations (at least 1).",
        "error"
      );
      numberOfRecommendationsInput.focus();
      return;
    }

    if (recommendationResults) {
      recommendationResults.innerHTML =
        '<div class="loading">Getting recommendations...</div>';
    }
    if (formMessage) {
      formMessage.style.display = "none";
    }

    try {
      /*function baru gabung semua nya*/
      const recommendations = await getRecommendedGamesWithDetails(
        gameName,
        numberOfRecommendations
      );

      if (recommendations && recommendations.length > 0) {
        if (recommendationResults) {
          recommendationResults.innerHTML = recommendations
            .map((game) => createGameCard(game))
            .join("");

          recommendationResults
            .querySelectorAll(".detail-btn")
            .forEach((button) => {
              button.addEventListener("click", (e) => {
                const appId = e.target.dataset.appid;
                window.location.hash = `#/detail/${appId}`;
              });
            });
        }
      } else {
        if (recommendationResults) {
          showMessage(
            "No recommendations found for this game. Try a different name or adjust the number of recommendations.",
            "info"
          );
          recommendationResults.innerHTML =
            '<div class="no-results">No recommendations found.</div>';
        }
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      if (recommendationResults) {
        recommendationResults.innerHTML =
          '<div class="error">Error loading recommendations. Please try again.</div>';
      }
      showMessage(`Error: ${error.message}`, "error");
    }
  });
}
