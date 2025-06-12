import React from "react";
import { useState } from "react";

export function MCQChallenge({ challenge, showExplanation = false }) {
    const [selectedOption, setSelectedOption] = useState(null); //answer-user selection
    const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation);//wether show explaination or not

    const options = typeof challenge.options === "string"
        ? JSON.parse(challenge.options)
        : challenge.options;

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index); //else set the selction option to the user answer insted of null (default)
        setShouldShowExplanation(true);
    };

    const getOptionClass = (index) => {
        if (selectedOption === null) return "option"

        if (index === challange_correct_answer_id) {
            return "option correct"
        }
        if (selectedOption === index && selectedOption !== challange_correct_answer_id) {
            return "option incorrect"
        }
        return "option"
    }


    return (
        <div className="challenge-display">
            <p><strong>Difficulty</strong>: {challenge.difficulty}</p>
            <p className="challenge-title">{challenge.title}</p>

            <div className="options">
                {options.map((option, index) => (
                    <div
                        className={getOptionClass(index)}
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                    >
                        {option} {/*render optiom*/}
                    </div>
                ))}
            </div>

            {shouldShowExplanation && selectedOption !== null && (
                <div className="explanation">
                    <h4>Explanation</h4>
                    <p>{challenge.explanation}</p> {/*render challange explination*/} 
                </div>
            )}
        </div>
    )
}