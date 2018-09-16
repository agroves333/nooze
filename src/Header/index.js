import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  UncontrolledTooltip,
} from 'reactstrap';

import Octicon, { Star, History } from '@githubprimer/octicons-react'

import styles from './Header.module.css';
import moment from "moment/moment";

class Header extends Component {
  
  constructor() {
    super();
    this.searchInput = React.createRef();
    this.state = {
      query: 'Elon Musk',
    };
    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }
  
  updateQuery(e) {
    const query = e.target.value;
    this.setState({ query });
  }
  
  handleSearchKeyUp(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.props.onSearch(this.state.query);
    }
  }
  
  saveSearch() {
    let savedSearches = localStorage.getItem('savedSearches');
    savedSearches = savedSearches ? JSON.parse(savedSearches) : [];
    savedSearches.push(this.state.query);
    this.setState({
      savedSearches,
    });
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches.reverse()));
  }

  renderSavedSearches() {
    let savedSearches = localStorage.getItem('savedSearches');
    savedSearches = savedSearches ? JSON.parse(savedSearches) : [];
    return savedSearches && savedSearches.map((savedSearch, key) => {
      return (
        <DropdownItem
          key={`saved-search-${key}`}
          onClick={() => this.props.onSearch(savedSearch)}
        >
          {savedSearch}
        </DropdownItem>
      )
    })
  }
  
  renderHistory() {
    return this.props.searchHistory.map((item, key) => {
      return (
        <DropdownItem
          key={`favorite-${key}`}
          onClick={() => this.props.onSearch(item.query)}
        >
          <div>
            <span className="mr-2">"{item.query}"</span>
            <small className="text-muted">{moment(item.time).fromNow()}</small>
          </div>
        </DropdownItem>
      )
    });
  }
  
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" fixed="top">
          <NavbarBrand className={styles.logo} href="/">nooze</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="d-flex mr-4">
                <InputGroup className="align-items-center">
                  <InputGroupAddon
                    className={styles.addFavorite}
                    addonType="prepend"
                    onClick={() => this.saveSearch()}
                  >
                    <Button id="saveSearchButton">★</Button>
                    <UncontrolledTooltip placement="bottom" target="saveSearchButton">
                      Save search
                    </UncontrolledTooltip>
                  </InputGroupAddon>
                  <Input
                    ref={this.searchInput}
                    className="mr-1"
                    placeholder="Search nooze"
                    value={this.state.query}
                    onChange={this.updateQuery}
                    onKeyUp={this.handleSearchKeyUp}
                  />
                </InputGroup>
                <Button
                  color="primary"
                  className={styles.searchButton}
                  onClick={() => this.props.onSearch(this.state.query)}
                >
                  Search
                </Button>
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <Octicon icon={Star} /> Saved Searches
                </DropdownToggle>
                <DropdownMenu right>
                  {this.renderSavedSearches()}
                </DropdownMenu>
              </UncontrolledDropdown>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <Octicon icon={History} /> History
                </DropdownToggle>
                <DropdownMenu right>
                  {this.renderHistory()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  onSearch: PropTypes.func,
  searchHistory: PropTypes.array,
};

Header.defaultProps = {
  onSearch: () => {},
  searchHistory: [],
};

export default Header;
