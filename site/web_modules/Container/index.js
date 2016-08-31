import React, { Component, PropTypes } from "react"

import styles from "./index.css"

export default class Container extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  render() {
    const { children } = this.props

    return (
      <div className={ styles.container }>
        { children }
      </div>
    )
  }
}
