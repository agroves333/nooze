import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Article.module.css';

const Article = ({ data }) => {
  const { title, description, url, urlToImage } = data;

  return (
    <article className={classnames(styles.article, 'article')} onClick={() => window.open(url)}>
      {urlToImage && <img className={styles.image} src={urlToImage} alt="Article" />}
      <strong className={styles.title}>{title}</strong>
      <div className={styles.description}>{description}</div>
    </article>
  );
};

Article.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
  }),
};

Article.defaultProps = {
  data: {
    title: '',
    description: '',
    url: '',
    urlToImage: '',
  }
};

export default Article;
