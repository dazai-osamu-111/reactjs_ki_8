import React, { Component } from 'react'

export class SearchBar extends Component {
  render() {
    const { searchText, inStock, handleChange } = this.props
    return (
      <form action=''>
        <input type='text' placeholder='Search...' value={searchText} onChange={handleChange('searchText')} />
        <div>
          <input type='checkbox' value={inStock} onChange={handleChange('inStock')} />
          Only show products in stock
        </div>
      </form>
    )
  }
}

export default SearchBar
