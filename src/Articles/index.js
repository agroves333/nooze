import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import get from 'lodash/get';
import Article from '../Article';
import Spinner from '../Spinner';

import styles from './Articles.module.css';

class Articles extends Component {

    hasMore = true;
    initialLoad = true;

    componentDidUpdate() {
        const { lastPage } = this.props;
        this.hasMore = !lastPage;
    }

    componentDidMount() {
        this.initialLoad = false;
    }

    renderArticles = () => {
        return get(this.props, 'data', []).map((article, key) => {
            return <Article key={`article-${key}`} data={article}/>
        });
    };

    render() {
        return (
            <div className={styles.articles}>
                <InfiniteScroll
                    style={{
                        overflow: 'hidden',
                    }}
                    dataLength={this.props.data.length} //This is important field to render the next data
                    next={() => this.props.search(this.props.q, true)}
                    hasMore={true}
                    // loader={<Spinner />}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>No more articles</b>
                        </p>
                    }
                    // below props only if you need pull down functionality
                    refreshFunction={() => this.props.search(this.props.q)}
                    scrollThreshold={0.95}
                    loader={<Spinner />}
                    scrollableTarget="app_container"
                >
                    <Masonry
                        breakpointCols={{
                            default: 3,
                            900: 2,
                            500: 1
                        }}
                        className={styles.grid}
                        columnClassName={styles.gridColumn}>
                        {this.renderArticles()}
                    </Masonry>
                </InfiniteScroll>
            </div>
        );
    }
}

Articles.propTypes = {
    q: PropTypes.string,
    data: PropTypes.array,
    search: PropTypes.func,
};

Articles.defaultProps = {
    data: [],
    search: () => {
    }
};

export default Articles;
