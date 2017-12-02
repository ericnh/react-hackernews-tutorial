import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import Table from '../Table';
import Search from '../Search';
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE
} from '../../constants';

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
      results: null,
      searchKey: '',
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  onDismiss(objectID) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotID = item => item.objectID !== objectID;
    const updatedHits = hits.filter(isNotID);
    this.setState({ 
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({ 
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  fetchSearchTopStories(searchTerm, page) {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  render() {
    // ES6 destructuring variable assignment
    const { searchTerm, results, searchKey } = this.state
    const page = ( results && results[searchKey] && results[searchKey].page ) || 0
    const list = ( results && results[searchKey] && results[searchKey].hits ) || []
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
        <Table
          list={ list }
          onDismiss={ this.onDismiss }
        />
        <div className="interactions">
          <Button onClick={ () => this.fetchSearchTopStories(searchKey, page + 1) }>
            More
          </Button>
        </div>
      </div>
    );
  }
}


export default App;
