import React, { Component } from 'react'
import './FilterableProductTable.css'
import SearchBar from './SearchBar'
import ProductTable from './ProductTable'

const productListMock = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
]

const fetchApi = () => Promise.resolve(productListMock)

export class FilterableProductTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      searchText: '',
      inStock: false
    }
  }

  componentDidMount() {
    fetchApi().then((res) => {
      this.setState({
        productList: res
      })
    })
  }

  handleChange = (name) => (event) => {
    if (name === 'searchText') {
      this.setState({
        searchText: event.target.value
      })
    }
    if (name === 'inStock') {
      this.setState({
        inStock: event.target.checked
      })
    }
  }

  render() {
    const { productList, searchText, inStock } = this.state
    return (
      <div className='FilterableProductTable'>
        <SearchBar searchText={searchText} inStock={inStock} handleChange={this.handleChange} />
        <ProductTable productList={productList} searchText={searchText} inStock={inStock} />
      </div>
    )
  }
}

export default FilterableProductTable
