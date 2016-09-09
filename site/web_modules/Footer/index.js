import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import Container from "Container"
import NavLink from "NavLink"

import styles from "./index.css"

export default class Footer extends Component {
  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const { pkg } = this.context.metadata

    return (
      <footer className={ styles.footer }>
        <Container>
          <div className={ styles.footerContent }>
            <div className={ styles.footerItem }>
              Created by <NavLink href={ `https://twitter.com/${ pkg.twitter }` }>Anthony Dugois</NavLink>
            </div>
            <div className={ styles.footerItem }>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=anthonydugois&repo=polynomic&type=star&count=true&size=large"
                allowTransparency="true"
                frameBorder="0"
                scrolling="0"
                width="111px"
                height="30px" />
            </div>
          </div>
        </Container>
      </footer>
    )
  }
}
