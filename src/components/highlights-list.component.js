import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Highlight = props => (
  <div className="highlight">
  <div>
      <h3>{props.highlight.username}</h3>
  </div>

  <div>
      <span>{props.highlight.description}</span>
      <h3>Feeling: {props.highlight.feeling}</h3>
  </div>

  <div>
      <p>{new Date(props.highlight.date).toLocaleDateString()}</p>
      <button type="button" className='button' onClick={() => {window.location = '/'; props.deleteHighlight(props.highlight._id) }}>DELETE</button>
  </div>
</div>
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
    return this.state.highlight.map(currenthighlight => {
      return <Highlight highlight={currenthighlight} deleteHighlight={this.deleteHighlight} key={currenthighlight._id}/>;
    }).reverse()
  }

  render() {
    return(
  <div className="app">
  <h1>Highlights</h1>
  {this.highlightList()?.length > 0
  ?(
      <div className="list">
        {this.highlightList()}
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
