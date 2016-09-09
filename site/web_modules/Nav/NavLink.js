import React, { Component, PropTypes } from "react"
import NavLink from "NavLink"

import styles from "./index.css"

export default class extends Component {
  render () {
    const {
      children,
      ...props,
    } = this.props

    return (
      <div className={ styles.navLink }>
        <NavLink { ...props }>
          { children }
        </NavLink>
      </div>
    )
  }
}
