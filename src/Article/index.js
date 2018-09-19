import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import get from 'lodash/get';

import styles from './Article.module.css';

const Article = ({ data }) => {
  const { headline, snippet, web_url, multimedia } = data;
  
  const image = multimedia && multimedia.find(item => {
    return item.subtype === 'blog427';
  });
  
  const imageUrl = get(image, 'url', '');

  return (
    <article className={classnames(styles.article, 'article')} onClick={() => window.open(web_url)}>
      {imageUrl && <img className={styles.image} src={`http://www.nytimes.com/${imageUrl}`} alt="Article image" />}
      <strong className={styles.title}>{headline.main}</strong>
      <div className={styles.summary}>{snippet}</div>
    </article>
  );
};

Article.propTypes = {
  data: PropTypes.shape({
    headline: PropTypes.shape({
      main: PropTypes.string,
    }),
    snippet: PropTypes.string,
    web_url: PropTypes.string,
    multimedia: PropTypes.array,
  }),
};

Article.defaultProps = {
  data: {
    headline: {
      main: '',
    },
    snippet: '',
    web_url: '',
    multimedia: [],
  }
};

export default Article;
