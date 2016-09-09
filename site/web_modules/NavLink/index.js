import React, { Component, PropTypes } from "react"
import { Link } from "react-router"

import styles from "./index.css"

export default class NavLink extends Component {
  static propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  render() {
    const {
      to,
      href,
      children,
    } = this.props

    if (typeof href !== "undefined") {
      return (
        <a
          className={ styles.navLink }
          href={ href }>
          <div className={ styles.navLinkLabel }>
            { children }
          </div>
        </a>
      )
    }

    return (
      <Link
        className={ styles.navLink }
        to={ to }>
        <div className={ styles.navLinkLabel }>
          { children }
        </div>
      </Link>
    )
  }
}
