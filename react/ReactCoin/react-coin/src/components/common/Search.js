import React from 'react';
import Loading from './Loading';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const searchQuery = event.target.value;

    this.setState({ searchQuery: searchQuery });

    // If searchQuery isn't present, don't send request to server
    if(!searchQuery) {
      return '';
    }

    fetch (`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then((result) => {
        console.log(result);
      });
  }

  render() {
    return (
      <div className="Search">
        <span className="Search-icon" />
        <input 
          className="Search-input"
          type="text"
          placeholder="Currency name"
          onChange={this.handleChange} 
        />

        <div className="Search-loading">
          <Loading 
            width='12px'
            height='12px'
          />
        </div>
      </div>
    );
  }
}

export default Search;