import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import Container from "Container"

import styles from "./index.css"

export default class Header extends Component {
  render() {
    return (
      <header className={ styles.header }>
        <Container>
          <nav className={ styles.headerNav }>
            <Link
              className={ styles.headerBrand }
              to="/">
            </Link>

            <div className={ styles.headerLinks }>
              <Link
                className={ styles.headerLink }
                to="/get-started/">
                Get started
              </Link>
              <Link
                className={ styles.headerLink }
                to="/docs/">
                Docs
              </Link>
              <a
                className={ styles.headerLink }
                href="https://github.com/anthonydugois/bernstein">
                Contribute
              </a>
            </div>
          </nav>
        </Container>
      </header>
    )
  }
}
