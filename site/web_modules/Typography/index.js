import React, { Component, PropTypes } from "react"

import styles from "./index.css"

export default class Typography extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    title: PropTypes.string,
  };

  render() {
    const {
      children,
      title,
    } = this.props

    return (
      <div className={ styles.typography }>
        { title && (
          <h1 className={ styles.typographyTitle }>
            { title }
          </h1>
        ) }

        { children }
      </div>
    )
  }
}
