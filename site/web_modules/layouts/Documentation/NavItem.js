import React, { Component, PropTypes } from "react"
import { Link } from "react-router"

import styles from "./index.css"

export default class NavItem extends Component {
  static propTypes = {
    active: PropTypes.string,
    to: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
  };

  render() {
    const {
      active,
      to,
      children,
    } = this.props

    return (
      <li className={ styles.navItem }>
        <Link
          className={ to === active ? styles.navLinkActive : styles.navLink }
          to={ to }>
          { children }
        </Link>
      </li>
    )
  }
}
