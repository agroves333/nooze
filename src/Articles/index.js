import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';

import Article from '../Article';
import styles from './Articles.module.css';

const breakpointColumns = {
  default: 3,
  900: 2,
  500: 1
};

class Articles extends Component {

  componentDidMount() {
  
  }
  
  renderArticles() {
    return this.props.data.map((article, key) => {
      return <Article key={`article-${key}`} data={article} />
    });
  }

  render() {
    return (
      <div className="articles">
        <Masonry
          breakpointCols={breakpointColumns}
          className={styles.grid}
          columnClassName={styles.gridColumn}>
          {this.renderArticles()}
        </Masonry>
      </div>
    );
  }
}

Articles.propTypes = {
  data: PropTypes.array,
};

Articles.defaultProps = {
  data: [],
};

export default Articles;
