import React from "react";

const HighlightCard = ({highlight}) => {
    return(
        <div className="highlight">
            <div>
                <h3>{highlight.username}</h3>
            </div>

            <div>
                <span>{highlight.description}</span>
                <h3>Feeling: {highlight.feeling}</h3>
            </div>

            <div>
                <p>{new Date(highlight.date).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default HighlightCard;