import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import Svg from "react-svg-inline"
import Container from "Container"
import Nav from "Nav"

import polynomic from "icons/polynomic.svg"
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
              <Svg svg={ polynomic } />
            </Link>

            <Nav />
          </nav>
        </Container>
      </header>
    )
  }
}
