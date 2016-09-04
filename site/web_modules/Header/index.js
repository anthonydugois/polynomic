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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 94.767 115.441">
                <path d="M0,1.5V113.946a1.5,1.5,0,0,0,1.741,1.475l69.275-11.546a1.5,1.5,0,0,0,1.091-.806l22.5-45a1.5,1.5,0,0,0-1.337-2.164H36.73a1.5,1.5,0,0,1-1.282-.726L2.777,0.728A1.5,1.5,0,0,0,0,1.5Z" />
              </svg>
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
