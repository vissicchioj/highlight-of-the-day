import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import HighlightCard from '../highlights';


const Highlight = props => (
  // <tr>
  //   <td>{props.highlight.username}</td>
  //   <td>{props.highlight.description}</td>
  //   <td>{props.highlight.feeling}</td>
  //   <td>{props.highlight.date.substring(0,10)}</td>
  //   <td>
  //     <Link to={"/edit/"+props.highlight._id}>edit</Link> | <a href="#" onClick={() => { props.deleteHighlight(props.highlight._id); } }>delete</a>
  //   </td>
  // </tr>
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

export default class HighlightsList extends Component {
  constructor(props) {
    super(props);

    this.deleteHighlight = this.deleteHighlight.bind(this)

    this.state = {highlights: []};

    
  }

  

  componentDidMount() {
    axios.get('http://localhost:5000/highlights/')
      .then(response => {
        this.setState({ highlights: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteHighlight(id) {
    axios.delete('http://localhost:5000/highlights/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        highlights: this.state.highlights.filter(el => el._id !== id)
    })

    alert("Highlight Deleted");
    
  }

  highlightList() {
    return this.state.highlights.map(currenthighlight => {
      return <Highlight highlight={currenthighlight} deleteHighlight={this.deleteHighlight} key={currenthighlight._id}/>;
    }).reverse()
  }

  render() {
    return(
  <div className="app"> 
  <h1>Highlights</h1>
  {this.highlightList()?.length > 0
  ?(
    this.highlightList()
  ) : (
      <div className="empty">
          <h2>No highlights found</h2>
      </div>
    )
  }   
  </div>
    )
  }
}
