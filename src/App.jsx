import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import { fetchPokemon } from "./services/fetchCards.js";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCards() {
      try {
        const data = await fetchPokemon(10);
        setCards(data);
      } catch (err) {
        console.error("Failed to fetch cards", err);
      } finally {
        setLoading(false);
      }
    }

    loadCards();
  }, []);

  const [clickedIds, setClickedIds] = useState([]);

  const handleCardClick = (id) => {
    if (clickedIds.includes(id)) {
      // Card already clicked: reset score, update bestScore if needed, reset clickedIds
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClickedIds([]);
    } else {
      // New card: increment score, add id to clickedIds
      setScore(score + 1);
      setClickedIds([...clickedIds, id]);
    }
    // Shuffle cards for more challenge
    setCards((prevCards) => shuffleArray(prevCards));
  };

  // Helper function to shuffle an array
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  useEffect(() => {
    setCards((prevCards) => shuffleArray(prevCards));
  }, []);

  return (
    <>
      <div>
        <h1>Pokemon Matching Game!</h1>
        <Scoreboard score={score} bestScore={bestScore} />
        <div className="card-grid">
          {loading ? (
            <p>Loading cards...</p>
          ) : (
            cards.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                image={card.image}
                name={card.name}
                onClick={handleCardClick}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
