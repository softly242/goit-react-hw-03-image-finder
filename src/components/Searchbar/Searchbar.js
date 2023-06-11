import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    q: '',
  };

  handleImageChange = event => {
    this.setState({ q: event.currentTarget.value.toLowerCase() });
  };
  handleSumbit = event => {
    event.preventDefault();
    if (this.state.q.trim() === '') {
      toast('Введите имя');
      return;
    }
    this.props.onSubmit(this.state.q);
    this.setState({ q: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSumbit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' viewBox="0 0 24 24" width="1em" height="1em">
              <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
            </svg>
          </button>

          <input
            className="SearchForm-input"
            value={this.state.q}
            onChange={this.handleImageChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}