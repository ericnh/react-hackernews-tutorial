import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`

// higher order function
// const isSearched = (searchTerm) => (item) =>
  // !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    // ES6 allows you to just send in the variable
    // if the property will have the same name
    this.state = {
      searchTerm: DEFAULT_QUERY,
      result: null,
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  onDismiss(objectID) {
    const isNotID = item => item.objectID !== objectID;
    const newList = this.state.result.hits.filter(isNotID);
    this.setState({ 
      result: { ...this.state.result, hits: newList }
    });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  fetchSearchTopStories(searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }

  render() {
    // ES6 destructuring variable assignment
    const {searchTerm, result} = this.state
    return (
      <div className="App page">
        <div className="interactions">
          <Search 
            value={ searchTerm }
            onChange={ this.onSearchChange }
            onSubmit={ this.onSearchSubmit }
          >
            Fetch
          </Search>
        </div>
        { result &&
          <Table
            list={ result.hits }
            onDismiss={ this.onDismiss }
          />
        }
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={ onSubmit }>
    <input
      type="text"
      value={ value }
      onChange={ onChange }
    />
    <button type="submit">
      { children }
    </button>
  </form>

const Table = ({ list, onDismiss }) =>
  <div className="table">
    { list.map( item =>
        <div key={ item.objectID } className="table-row">
          <span style={{ width: '40%' }}>
            <a href={ item.url }>{ item.title }</a>
          </span>
          <span style={{ width: '30%' }}>
            { item.author }
          </span>
          <span style={{ width: '10%' }}>
            { item.num_comments }
          </span>
          <span style={{ width: '10%' }}>
            { item.points }
          </span>
          <span style={{ width: '10%' }}>
            <Button
              className="button-inline"
              onClick={() => onDismiss(item.objectID)}
            >
              Dismiss
            </Button>
          </span>
        </div>
    )}
  </div>

const Button = ({ className = '', onClick, children }) =>
  <button
    className={ className }
    onClick={ onClick }
    type="button"
  >
    { children }
  </button>

export default App;
