import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateHighlight extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeFeeling = this.onChangeFeeling.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      feeling: '',
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeFeeling(e) {
    this.setState({
      feeling: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.description.length > 125)
    {
      // prevent from descriptions being too long, highlights should be breif
      // add feedback letting the user know the description is too long
    }
    else {
    const highlight = {
      username: this.state.username,
      description: this.state.description,
      feeling: this.state.feeling,
      date: this.state.date
    }

    console.log(highlight);

    axios.post('http://localhost:5000/highlights/add', highlight)
      .then(res => console.log(res.data));


     window.location = '/';
  }
  }

  render() {
    return (
    <div>
      <h3>Create New Highlight of the Day</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Feeling: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.feeling}
              onChange={this.onChangeFeeling}>
                <option></option>
              <option value="Happy">Happy</option>
              <option value="Confident">Confident</option>
              <option value="Cool">Cool</option>
              <option value="Disgusted">Disgusted</option>
              <option value="Sad">Sad</option>
              <option value="Angry">Angry</option>
              <option value="Excited">Excited</option>
              <option value="Funny">Funny</option>
              <option value="Tired">Tired</option>
              </select>
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Highlight of the Day" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}