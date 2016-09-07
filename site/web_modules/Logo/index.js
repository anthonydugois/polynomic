import React, { Component, PropTypes } from "react"

import styles from "./index.css"

export default class Logo extends Component {
  render() {
    return (
      <svg
        className={ styles.logo }
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 94.767 115.441">
        <path d="M0,1.5V113.946a1.5,1.5,0,0,0,1.741,1.475l69.275-11.546a1.5,1.5,0,0,0,1.091-.806l22.5-45a1.5,1.5,0,0,0-1.337-2.164H36.73a1.5,1.5,0,0,1-1.282-.726L2.777,0.728A1.5,1.5,0,0,0,0,1.5Z" />
      </svg>
    )
  }
}
