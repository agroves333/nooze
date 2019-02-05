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

  state = {
    articles: [],
    loading: true,
    query: 'Elon Musk',
    page: 0,
  };

  componentDidMount() {
    const searchHistory = localStorage.getItem('searchHistory');
    this.handleSearch('Elon Musk');
    this.setState({
      searchHistory: searchHistory ? JSON.parse(searchHistory) : []
    });
  }

  /**
   * Update query on input change
   * @param e
   */
  updateQuery = (e) => {
    const query = e.target.value;
    this.setState({ query });
  };

  /**
   * Fetch articles from New York Times article API
   * @param query Search query
   */
  handleSearch = async (query, append) => {
    await this.setState({
      loading: !append,
      page: append ? this.state.page + 1 : 0,
    });

    try {
      const results = await axios.get('https://tkm1luc5qa.execute-api.eu-west-1.amazonaws.com/Production/get_articles', {
        params: {
          q: query || this.state.query,
          page: this.state.page,
        },
        header: {
          'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIAJTSTE7MBWU56RZYQ/20190128/us-east-1/execute-api/aws4_request, SignedHeaders=cache-control;content-type;host;postman-token;x-amz-date, Signature=76ce237b7b3d28c175cc780457311d40ad514d832f0bd2ac608cf00f3b83271d',
          'X-Amz-Date': '20190128T130806Z',
          'Host': 'tkm1luc5qa.execute-api.eu-west-1.amazonaws.com',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const articles = get(results, 'data.articles', []);
      this.setState({
        articles: append ? this.state.articles.concat(articles) : articles,
        loading: false,
      });

      this.saveHistory(query || this.state.query);
    } catch (err) {
      this.setState({
        loading: false
      });
      console.log(err);
    }
  };
  
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
          {this.state.loading ? <Spinner /> : <Articles data={this.state.articles} search={this.handleSearch}/>}
        </Container>
      </div>
    );
  }
}

export default App;
