import React, { Component, PropTypes } from "react"
import Header from "Header"
import Footer from "Footer"

import styles from "./index.css"

export default class Playground extends Component {
  render() {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    )
  }
}
