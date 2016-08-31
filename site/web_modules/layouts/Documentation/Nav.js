import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import enhanceCollection from "phenomic/lib/enhance-collection"

import styles from "./index.css"

export default class Nav extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  };

  renderItem(item, index) {
    return (
      <li
        key={ index }
        className={ styles.navItem }>
        <Link
          className={ styles.navLink }
          to={ item.__url }>
          { item.title }
        </Link>
      </li>
    )
  };

  render() {
    const { collection } = this.context

    const posts = enhanceCollection(collection, {
      filter: ({ layout }) => layout === "Documentation",
      sort: "title",
    })

    return (
      <nav className={ styles.nav }>
        <ul className={ styles.navList }>
          { posts.map(this.renderItem) }
        </ul>
      </nav>
    )
  }
}
