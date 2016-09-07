import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import Container from "Container"
import Logo from "Logo"
import Nav from "Nav"

import styles from "./index.css"

export default class Header extends Component {
  render() {
    return (
      <header className={ styles.homepageHeader }>
        <Container>
          <div className={ styles.homepageHeaderContent }>
            <h1 className={ styles.homepageHeaderTitle }>
              <Link
                className={ styles.homepageHeaderTitleLink }
                to="/">
                <div className={ styles.homepageHeaderTitleLogo }>
                  <Logo />
                </div>
                <div className={ styles.homepageHeaderTitleText }>
                  Polynomic
                </div>
              </Link>
            </h1>

            <p className={ styles.homepageHeaderLead }>
              A set of advanced utilities to manipulate SVG paths.
            </p>

            <div className={ styles.homepageHeaderNav }>
              <Nav />
            </div>
          </div>
        </Container>
      </header>
    )
  }
}
