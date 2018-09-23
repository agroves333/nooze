import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';

import Article from '../Article';
import styles from './Articles.module.css';

const Articles = ({ data }) => {
  
  const renderArticles = () => {
    return data.map((article, key) => {
      return <Article key={`article-${key}`} data={article} />
    });
  };
  
  return (
    <div className="articles">
      <Masonry
        breakpointCols={{
          default: 3,
          900: 2,
          500: 1
        }}
        className={styles.grid}
        columnClassName={styles.gridColumn}>
        {renderArticles()}
      </Masonry>
    </div>
  );
};

Articles.propTypes = {
  data: PropTypes.array,
};

Articles.defaultProps = {
  data: [],
};

export default Articles;
