import React, { Component, PropTypes } from "react"
import Header from "Header"
import Footer from "Footer"
import Container from "Container"

import styles from "./index.css"

export default class Playground extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className={ styles.playground }>
          <iframe
            src="//codepen.io/anthonydugois/embed/ORyaRz/?height=800&theme-id=light&default-tab=js,result&embed-version=2&editable=true"
            allowTransparency="true"
            frameBorder="0"
            scrolling="no"
            style={{
              overflow: "hidden",
              width: "100%",
              height: 800,
            }} />
        </div>

        <Footer />
      </div>
    )
  }
}
