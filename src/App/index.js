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
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }
  
  componentDidMount() {
    const searchHistory = localStorage.getItem('searchHistory');
    this.handleSearch('Elon Musk');
    this.setState({
      searchHistory: searchHistory ? JSON.parse(searchHistory) : []
    })
  }
  
  updateQuery(e) {
    const query = e.target.value;
    this.setState({ query });
  }
  
  saveHistory(query) {
    let searchHistory = localStorage.getItem('searchHistory');
    searchHistory = searchHistory ? JSON.parse(searchHistory) : [];
    searchHistory.push({
      query,
      time: Date.now(),
    });
    searchHistory = takeRight(searchHistory.reverse(), 50); // Latest 50 articles
    this.setState({
      searchHistory,
    });
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
  
  handleSearch(query) {
    this.setState({
      loading: true,
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
  
  handleSearchKeyUp(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  }
  
  render() {
    return (
      <div className="h-100">
        <Header onSearch={this.handleSearch} searchHistory={this.state.searchHistory} />
        <Container className={classnames(styles.container, 'position-relative h-100')}>
          {this.state.loading ? <Spinner /> : <Articles data={this.state.articles} />}
        </Container>
      </div>
    );
  }
}

export default App;
