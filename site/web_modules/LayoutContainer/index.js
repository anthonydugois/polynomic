import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import GitHubCorner from "GitHubCorner"

// Import global CSS before other components and their styles
import "./index.global.css"
import styles from "./index.css"

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ])
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired
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
              content: `${ process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`
            },
            {
              property: "og:site_name",
              content: pkg.name
            },
            {
              name: "twitter:site",
              content: `@${ pkg.twitter }`
            },
            {
              name: "viewport",
              content: "width=device-width, initial-scale=1"
            },
          ] }
          script={ [{ src: "https://cdn.polyfill.io/v2/polyfill.min.js" }] } />

        <style>{ "@-ms-viewport { width: device-width; }" }</style>

        <GitHubCorner />
        { children }
      </div>
    )
  }
}
