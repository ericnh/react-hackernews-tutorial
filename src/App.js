import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`

// higher order function
const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

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
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  onDismiss(objectID) {
    const newList = this.state.result.filter( item => item.objectID !== objectID );
    this.setState({ result: newList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    // ES6 destructuring variable assignment
    const {searchTerm, result} = this.state
    if (!result) { return null; }
    return (
      <div className="App page">
        <div className="interactions">
          <Search 
            value={ searchTerm }
            onChange={ this.onSearchChange }
          />
        </div>
        <Table
          list={ result.hits }
          pattern= { searchTerm }
          onDismiss={ this.onDismiss }
        />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
  <form>
    <input
      type="text"
      value={ value }
      onChange={ onChange }
    />
  </form>

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    { list.filter(isSearched(pattern)).map( item =>
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
