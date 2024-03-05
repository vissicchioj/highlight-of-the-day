import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import HighlightCard from '../highlights';


const Highlight = props => (
  <tr>
    <td>{props.highlight.username}</td>
    <td>{props.highlight.description}</td>
    <td>{props.highlight.feeling}</td>
    <td>{props.highlight.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.highlight._id}>edit</Link> | <a href="#" onClick={() => { props.deleteHighlight(props.highlight._id) }}>delete</a>
    </td>
  </tr>
)

export default class HighlightsList extends Component {
  constructor(props) {
    super(props);

    this.deleteHighlight = this.deleteHighlight.bind(this)

    this.state = {highlight: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/highlights/')
      .then((response) => {
        console.log(response.data)
        this.setState({ highlight: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteHighlight(id) {
    axios.delete('http://localhost:5000/highlights/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        highlights: this.state.highlight.filter(el => el._id !== id)
    })
  }

  highlightList() {
    return this.state.highlight.reverse().map(currenthighlight => {
      return <Highlight highlight={currenthighlight} deleteHighlight={this.deleteHighlight} key={currenthighlight._id}/>;
    })
  }

  render() {
    return(
  <div className="app">
  <h1>Highlights</h1>
  {this.highlightList()?.length > 0
  ?(
      <div className="list">
        {this.state.highlight.map(highlight => (
                            <HighlightCard highlight = {highlight} deleteHighlight = {this.deleteHighlight}/>
                        ))}
      </div>
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
