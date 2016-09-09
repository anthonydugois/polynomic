import React, { Component, PropTypes } from "react"
import NavLink from "./NavLink"

import styles from "./index.css"

export default class Nav extends Component {
  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const { pkg } = this.context.metadata

    return (
      <div className={ styles.nav }>
        <NavLink to="/">
          { "Get started" }
        </NavLink>
        <NavLink to="/docs/">
          { "Docs" }
        </NavLink>
        <NavLink to="/docs/">
          { "Playground" }
        </NavLink>
        <NavLink href={ pkg.repository }>
          { "Contribute" }
        </NavLink>
      </div>
    )
  }
}
