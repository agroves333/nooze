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

import Octicon, { History } from '@githubprimer/octicons-react'

import styles from './Header.module.css';
import moment from "moment/moment";

class Header extends Component {
  
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
    
    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this);
  }
  
  /**
   * Perform search when Enter key is pressed
   * @param e Keyup Event
   */
  handleSearchKeyUp(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.props.onSearch(this.props.query);
    }
  }
  
  /**
   * Save search to local storage and state.
   */
  saveSearch() {
    let savedSearches = localStorage.getItem('savedSearches');
    savedSearches = savedSearches ? JSON.parse(savedSearches) : [];
    savedSearches.push(this.state.query);
    this.setState({
      savedSearches,
    });
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  }
  
  /**
   * Render Saved Searches dropdown
   */
  renderSavedSearches() {
    let savedSearches = localStorage.getItem('savedSearches');
    savedSearches = savedSearches ? JSON.parse(savedSearches).reverse() : [];
    return savedSearches.length ? savedSearches.map((savedSearch, key) => {
      return (
        <DropdownItem
          key={`saved-search-${key}`}
          onClick={() => this.props.onSearch(savedSearch)}
          className={styles.dropdownItem}
        >
          {savedSearch}
        </DropdownItem>
      )
    }) : (
        <DropdownItem
          key={`saved-search-empty`}
          className={styles.dropdownItem}
        >
          No saved searches
        </DropdownItem>
    )
  }
  
  renderHistory() {
    return this.props.searchHistory &&
      this.props.searchHistory
        .reverse()
        .map((item, key) => {
          return (
            <DropdownItem
              key={`favorite-${key}`}
              onClick={() => this.props.onSearch(item.query)}
              className={styles.dropdownItem}
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
        <Navbar className={styles.nav} color="light" light expand="md" fixed="top">
          <NavbarBrand className={styles.logo} href="/">[nooze]</NavbarBrand>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="d-flex mr-4">
                <InputGroup className="align-items-center">
                  <InputGroupAddon
                    className={styles.addFavorite}
                    addonType="prepend"
                    onClick={() => this.saveSearch()}
                  >
                    <Button
                      id="saveSearchButton"
                      color="secondary"
                      className={styles.saveSearchButton}
                    >
                      ★
                    </Button>
                    <UncontrolledTooltip placement="bottom" target="saveSearchButton">
                      Save search
                    </UncontrolledTooltip>
                  </InputGroupAddon>
                  <Input
                    ref={this.searchInput}
                    placeholder="Search nooze"
                    value={this.props.query}
                    onChange={this.props.onUpdateQuery}
                    onKeyUp={this.handleSearchKeyUp}
                  />
                  <InputGroupAddon
                    addonType="append"
                    onClick={() => this.saveSearch()}
                  >
                    <Button
                      color="primary"
                      type="submit"
                      className={styles.searchButton}
                      onClick={() => this.props.onSearch(this.state.query)}
                    >
                      Search
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  ★ Saved Searches
                </DropdownToggle>
                <DropdownMenu right className={styles.savedSearches}>
                  {this.renderSavedSearches()}
                </DropdownMenu>
              </UncontrolledDropdown>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <Octicon icon={History} /> History
                </DropdownToggle>
                <DropdownMenu right className={styles.history}>
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
  onUpdateQuery: PropTypes.func,
  searchHistory: PropTypes.array,
};

Header.defaultProps = {
  onSearch: () => {},
  onUpdateQuery: () => {},
  searchHistory: [],
};

export default Header;
