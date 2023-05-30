import React, { Component } from 'react'
import ProductRow from './ProductRow'
import ProductCategoryRow from './ProductCategoryRow'

export class ProductTable extends Component {
  render() {
    const { productList, searchText, inStock } = this.props
    const row = []
    let lastCategory = null
    productList.map((product) => {
      if (!product.stocked && inStock) {
        return inStock
      }
      if (product.name.toLowerCase().indexOf(searchText.toLowerCase()) === -1) {
        return -1
      }
      if (product.category !== lastCategory) {
        row.push(<ProductCategoryRow key={product.category} category={product.category} />)
        row.push(<ProductRow key={product.name} product={product} />)
      } else {
        row.push(<ProductRow key={product.name} product={product} />)
      }
      return (lastCategory = product.category)
    })
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </table>
    )
  }
}

export default ProductTable
