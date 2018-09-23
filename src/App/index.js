import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import get from 'lodash/get';
import takeRight from 'lodash/takeRight';
import { Container } from 'reactstrap';
import Header from '../Header';
import Articles from '../Articles';
import Spinner from '../Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      query: 'Elon Musk',
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  componentDidMount() {
    const searchHistory = localStorage.getItem('searchHistory');
    this.handleSearch('Elon Musk');
    this.setState({
      searchHistory: searchHistory ? JSON.parse(searchHistory) : []
    });
  }
  
  /**
   * Save search query to local storage
   * @param query Search query
   */
  saveHistory(query) {
    let searchHistory = localStorage.getItem('searchHistory');
    searchHistory = searchHistory ? JSON.parse(searchHistory) : [];
    searchHistory.push({
      query,
      time: Date.now(),
    });
    searchHistory = takeRight(searchHistory, 50); // Latest 50 searches
    this.setState({
      searchHistory: searchHistory,
    });
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
  
  /**
   * Update query on input change
   * @param e
   */
  updateQuery(e) {
    const query = e.target.value;
    this.setState({ query });
  }
  
  /**
   * Fetch articles from New York Times article API
   * @param query Search query
   */
  handleSearch(query) {
    this.setState({
      loading: true,
      query,
    });
    axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        'api-key': '89af977e206a4b169d8a15b4edd3f458',
        q: query,
      }
    })
      .then(results => {
        const articles = get(results, 'data.response.docs', []);
        this.setState({
          articles,
          loading: false,
        });
        
        this.saveHistory(query);
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  render() {
    return (
      <div className="h-100">
        <Header
          query={this.state.query}
          onSearch={this.handleSearch}
          searchHistory={this.state.searchHistory}
          onUpdateQuery={this.updateQuery}
        />
        <Container className={classnames(styles.container, 'position-relative h-100')}>
          {this.state.loading ? <Spinner /> : <Articles data={this.state.articles} />}
        </Container>
      </div>
    );
  }
}

export default App;
