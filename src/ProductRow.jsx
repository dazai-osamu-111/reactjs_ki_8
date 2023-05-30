import React, { Component } from 'react'

export class ProductRow extends Component {
  render() {
    const { price, name } = this.props.product
    return (
      <tr>
        <td>{name}</td>
        <td>{price}</td>
      </tr>
    )
  }
}

export default ProductRow
