import "react"
import { MCQChallenge } from "../challenge/MCQChallenge"
import { useState, useEffect } from "react"

export function HistoryPanel() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { fetchHistory() }, [])
    //the way useEffect works- > run as soon as the component is rendered
    //means as soon as the component is rendered -> fetch the history (function)

    const fetchHistory = async () => {
        setIsLoading(false) //when we call this function , it stops the components from loading so we can actually view it
    }

    if (isLoading) {
        return <div className="loading">Loading history...</div>;
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <button onClick={fetchHistory}>Retry</button>
            </div>
        );
    }


    return (
        <div className="history-panel">
            <h2>History</h2>
            {history.length === 0 ? <p>no challange history</p> :
                <div className="history-list">
                    {history.map((challenge) => (
                        <MCQChallenge
                            challenge={challenge}
                            key={challenge.id}
                            showExplanation={true}
                        />
                    ))}
                </div>
            }
        </div>
    );
}