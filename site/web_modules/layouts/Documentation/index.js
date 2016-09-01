import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import { BodyContainer } from "phenomic"
import Container from "Container"
import Typography from "Typography"
import Nav from "./Nav"

import styles from "./index.css"

export default class Documentation extends Component {
  render() {
    const {
      __url,
      head,
      body,
    } = this.props

    return (
      <Container>
        <Helmet
          title={ head.title } />

        <div className={ styles.documentation }>
          <div className={ styles.documentationNav }>
            <Nav active={ __url } />
          </div>
          <div className={ styles.documentationContent }>
            <Typography title={ head.title }>
              <BodyContainer>
                { body }
              </BodyContainer>
            </Typography>
          </div>
        </div>
      </Container>
    )
  }
}
