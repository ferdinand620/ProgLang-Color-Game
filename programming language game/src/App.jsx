import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [DisplayForm, setDisplayForm] = useState(false)
  const [Attempts, setAttempts] = useState(0);
  const [FailedAttempts, setFailedAttempts] = useState(0);
  const [UsedLanguages, setUsedLanguages] = useState([]);
  const [ResultColor, setResultColor] = useState("");
  const [ResultName, setResultName] = useState("");
  const [Feedback, setFeedback] = useState("");

  //array of Object of programming languages and the color being the key
  const ProgLang = [
    { name: "JavaScript", color: "yellow" },
    { name: "Python", color: "blue" },
    { name: "Java", color: "red" },
    { name: "C++", color: "green" },
    { name: "C#", color: "purple" },
    { name: "Ruby", color: "pink" },
    { name: "PHP", color: "teal" },
    { name: "Swift", color: "orange" },
    { name: "Kotlin", color: "violet" },
    { name: "Go", color: "gray" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setDisplayForm(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Function to check if a language has already been used
  const checkExistence = (language) => {
    return UsedLanguages.includes(language);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const language = formData.get("language").trim();
    const color = formData.get("color").trim();

    // Check if the language was already used
    if (checkExistence(language)) {
      setFeedback("This language has already been used. Automatic failed attempt.");
      setFailedAttempts((prev) => prev + 1);
      setAttempts((prev) => prev + 1);
      return;
    }

    // Check if the language and color match
    const match = ProgLang.find((pr) => pr.name === language && pr.color === color);

    if (match) {
      setResultColor(color);
      setResultName(language);
      setFeedback("Correct match!");
      setAttempts((prev) => prev + 1);
    } else {
      setFeedback("Incorrect match!");
      setAttempts((prev) => prev + 1);
      setFailedAttempts((prev) => prev + 1);
    }

    // Track used languages
    setUsedLanguages((prev) => [...prev, language]);

    // Check if game-over conditions are met
    if (Attempts + 1 >= 20 || FailedAttempts + 1 >= 5) {
      setFeedback("Game Over!");
      setDisabledBTN(true)
      // Optionally, disable form submission or reset game here
    }

    console.log("Programming Language:", language);
    console.log("Color:", color);
  };

  return (
    <>
      {DisplayForm ? (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="language"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Programming Language
              </label>
              <input
                type="text"
                name="language"
                id="language"
                placeholder="Enter programming language"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="color"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Color
              </label>
              <input
                type="text"
                name="color"
                id="color"
                placeholder="Enter color"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Display feedback */}
          {Feedback && (
            <div
              className={`mt-4 p-2 text-center text-white ${
                Feedback.includes("Incorrect") ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {Feedback}
            </div>
          )}

          {/* Display current attempts and failed attempts */}
          <div className="mt-4 text-center">
            <p>Attempts: {Attempts}</p>
            <p>Failed Attempts: {FailedAttempts}</p>
          </div>

          {/* Show result */}
          {ResultName && ResultColor && (
            <div className="mt-4 p-4 text-center bg-gray-200 rounded">
              <p>
                You guessed <strong>{ResultName}</strong> with color{" "}
                <strong
                  style={{
                    backgroundColor: ResultColor,
                    padding: "0 5px",
                    color: "#fff",
                  }}
                >
                  {ResultColor}
                </strong>
                ! Great job!
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {ProgLang.map((pl) => (
            <div className={`card bg-${pl.color}-500`}>
              <div className="card-body">{pl.name}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
