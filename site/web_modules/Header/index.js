import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import Container from "Container"
import Nav from "Nav"
import Logo from "Logo"

import styles from "./index.css"

export default class Header extends Component {
  render() {
    return (
      <header className={ styles.header }>
        <Container>
          <nav className={ styles.headerNav }>
            <Link
              className={ styles.headerLogo }
              to="/">
              <Logo />
            </Link>

            <Nav />
          </nav>
        </Container>
      </header>
    )
  }
}
