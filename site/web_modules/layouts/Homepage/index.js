import React, { Component, PropTypes } from "react"
import { BodyContainer } from "phenomic"
import Container from "Container"
import Header from "./Header"
import Footer from "Footer"
import Typography from "Typography"

import styles from "./index.css"

export default class Homepage extends Component {
  render() {
    const { body } = this.props

    return (
      <div>
        <Header />

        <Container>
          <div className={ styles.homepageContent }>
            <Typography>
              <BodyContainer>
                { body }
              </BodyContainer>
            </Typography>
          </div>
        </Container>

        <Footer />
      </div>
    )
  }
}
