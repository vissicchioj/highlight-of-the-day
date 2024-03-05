import React from "react";

function HighlightCard(props) {
    return(
        <div className="highlight">
            <div>
                <span className="username">{props.highlight.username}</span>
                <button className = "delete--button" onClick={() => {props.deleteHighlight(props.highlight._id) }}>🗑️</button>
            </div>

            <div>
                <span>{props.highlight.description}</span>
                
            </div>

            <div>
                <span className="feeling">Feeling: {props.highlight.feeling}</span>
                <span className="date">{new Date(props.highlight.date).toLocaleDateString()}</span>
            </div>
        </div>
    )
}

export default HighlightCard;