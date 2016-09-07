import React, { Component, PropTypes } from "react"
import { Link } from "react-router"

import styles from "./index.css"

export default class Nav extends Component {
  render() {
    return (
      <div className={ styles.nav }>
        <Link
          className={ styles.navLink }
          to="/#get-started">
          Get started
        </Link>
        <Link
          className={ styles.navLink }
          to="/docs/">
          Docs
        </Link>
        <a
          className={ styles.navLink }
          href="https://github.com/anthonydugois/polynomic">
          Contribute
        </a>
      </div>
    )
  }
}
