import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import Svg from "react-svg-inline"

import githubCorner from "icons/github-corner.svg"
import fav16 from "icons/favicon-16x16.png"
import fav32 from "icons/favicon-32x32.png"
import "./index.global.css"
import styles from "./index.css"

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const { children } = this.props
    const { pkg } = this.context.metadata

    return (
      <div className={ styles.layout }>
        <Helmet
          defaultTitle="Polynomic"
          titleTemplate="%s | Polynomic"
          meta={ [
            {
              name: "generator",
              content: `${ process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`,
            },
            {
              property: "og:site_name",
              content: pkg.name,
            },
            {
              name: "twitter:site",
              content: `@${ pkg.twitter }`,
            },
            {
              name: "viewport",
              content: "width=device-width, initial-scale=1",
            },
          ] }
          link={ [
            {
              rel: "icon",
              type: "image/png",
              href: fav16,
            }, {
              rel: "icon",
              type: "image/png",
              href: fav32,
            },
          ] }
          script={ [{ src: "https://cdn.polyfill.io/v2/polyfill.min.js" }] } />

        <style>{ "@-ms-viewport { width: device-width; }" }</style>

        <a
          className={ styles.githubCorner }
          href={ pkg.repository }>
          <Svg svg={ githubCorner } />
        </a>

        { children }
      </div>
    )
  }
}
