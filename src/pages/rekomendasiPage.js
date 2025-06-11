import "../styles/rekomendasi.css";
// Ensure correct import paths based on your file structure.
// If parseMLRecommendation is in api.js, then import it directly.
import { parseMLRecommendation } from "../api.js";
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
                    <input type="text" id="gameName" placeholder="example: The Witcher 3, Minecraft, Fornite" required>
                </div>
                
                <div class="form-group">
                    <h2>Number of Recommendations</h2>
                    <input type="number" id="numberOfRecommendations" placeholder="example: 5" min="1" value="6" required>
                </div>

                <button type="submit" class="signin-btn">Get Recommendations</button>
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
  const formMessage = document.getElementById("formMessage"); // This line now should correctly find the element

  // Crucial check: If the form itself isn't found, stop here.
  // This could happen if renderRekomendasiPage hasn't been called or its output isn't in the DOM.
  if (!rekomendasiForm) {
    console.error(
      "Error: 'rekomendasiForm' element not found in the DOM. Cannot attach handlers."
    );
    return;
  }

  // Helper function to display messages within the form area
  function showMessage(message, type = "info") {
    // Ensure formMessage exists before trying to access its properties
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.className = `message-box ${type}`; // Apply classes for styling (e.g., 'error', 'info')
      formMessage.style.display = "block"; // Make the message box visible
      // Optionally, hide the message after a few seconds
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000); // Hide after 5 seconds
    } else {
      console.warn(
        "Attempted to show message but 'formMessage' element was not found in the DOM."
      );
      // Fallback to alert if message box is not found (though a custom modal is preferred)
      // alert(message); // Removed as per instructions
    }
  }

  rekomendasiForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const gameNameInput = document.getElementById("gameName");
    const numberOfRecommendationsInput = document.getElementById(
      "numberOfRecommendations"
    );

    const gameName = gameNameInput.value.trim();
    const numberOfRecommendations = numberOfRecommendationsInput.value;

    // Basic input validation
    if (!gameName) {
      showMessage("Please enter a game name.", "error");
      gameNameInput.focus(); // Focus on the input field for user convenience
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

    // Clear previous results and messages, and show a loading indicator
    if (recommendationResults) {
      recommendationResults.innerHTML =
        '<div class="loading">Getting recommendations...</div>';
    } else {
      console.warn("Element 'recommendationResults' not found.");
    }

    if (formMessage) {
      formMessage.style.display = "none"; // Hide any previous form messages
    }

    try {
      // Call the parseMLRecommendation function from api.js
      const recommendations = await parseMLRecommendation(
        gameName,
        numberOfRecommendations
      );

      if (recommendations && recommendations.length > 0) {
        // Render the recommendations using the 'game' name and 'distance' from your ML API
        if (recommendationResults) {
          recommendationResults.innerHTML = recommendations
            .map(
              (rec) => `
                                <div class="game-card">
                                    <h3>${rec.game}</h3>
                                    <p class="game-distance">Similarity Distance: ${rec.distance.toFixed(
                                      4
                                    )}</p>
                                    <!--
                                        NOTE: Your current ML API returns 'game' and 'distance'.
                                        If you want appid, title, description, you must enhance your FastAPI to fetch and return them.
                                    -->
                                </div>
                            `
            )
            .join("");
        }
      } else {
        if (recommendationResults) {
          recommendationResults.innerHTML =
            '<div class="no-results">No recommendations found for this game.</div>';
        }
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      // Display an error message to the user in the results area and form message
      if (recommendationResults) {
        recommendationResults.innerHTML =
          '<div class="error">Error loading recommendations. Please try again.</div>';
      }
      showMessage(`Error: ${error.message}`, "error");
    }
  });
}
