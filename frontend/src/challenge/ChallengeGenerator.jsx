import "react"
import { useState, useEffect } from "react";
import { MCQChallenge } from "./MCQChallenge.jsx";

export function ChallengeGenerator() {
    const [challenge, setChallenge] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [difficulty, setDifficulty] = useState("easy");
    const [quota, setQuota] = useState(null);

    const fetchQuota = async () => { };

    const generateChallenge = async () => { };

    const GetNextResetTime = () => { }
    //normal function determine how long until the user get more credits


    return (
        <div className="challenge-container">
            <h2>Coding Challenge Generator</h2>

            <div className="quota-display">
                <p>Challenges remaining today: {quota?.quota_remaining || 0}</p>
                {/*do we have qouta (from the backend) , if we haven't just show 0 , if we have show the remaining qouta*/}
                {quota?.quota_remaining === 0 && (
                    <p>Next reset: {0}</p>
                )}
            </div>

            <div className="difficulty-selector">
                <label htmlFor="difficulty">Select Difficulty</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    disabled={isLoading} // if we are loading we won't allow the user to select any thing 
                >

                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>

                </select>
            </div>

            <button
                onClick={generateChallenge}
                disabled={isLoading || quota?.quota_remaining === 0} // disaple when is loading or qouta fetched = 0
                className="generate-button"
            >
                {isLoading ? "Generating ...." : "Generate Challange"}
                {/* if is loading -> show "Generating ...."" , other wise shoo -> "Generate Challange" */}
            </button>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {challenge && <MCQChallenge challenge={challenge} />}
            {/* if challange exists -> render MCQChallenge component */}

        </div>
    )
}