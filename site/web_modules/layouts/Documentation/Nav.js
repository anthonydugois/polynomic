import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import enhanceCollection from "phenomic/lib/enhance-collection"

import styles from "./index.css"

export default class Nav extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  };

  static propTypes = {
    active: PropTypes.string,
  };

  constructor() {
    super()

    this.state = {
      isSticky: false,
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount() {
    this.initialTop = this.nav.getBoundingClientRect().top
    document.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    if (document.body.scrollTop > this.initialTop && !this.state.isSticky) {
      this.setState({ isSticky: true })
    }

    if (document.body.scrollTop < this.initialTop && this.state.isSticky) {
      this.setState({ isSticky: false })
    }
  }

  renderItem(item, index) {
    const { active } = this.props
    const isActive = active === item.__url

    return (
      <li
        key={ index }
        className={ styles.navItem }>
        <Link
          className={ isActive ? styles.navLinkActive : styles.navLink }
          to={ item.__url }>
          { item.title }
        </Link>
      </li>
    )
  };

  render() {
    const { collection } = this.context
    const { isSticky } = this.state

    const posts = enhanceCollection(collection, {
      filter: ({ layout }) => layout === "Documentation",
      sort: "title",
    })

    return (
      <nav
        className={ isSticky ? styles.navSticky : styles.nav }
        ref={ (nav) => this.nav = nav }>
        <ul className={ styles.navList }>
          { posts.map(this.renderItem) }
        </ul>
      </nav>
    )
  }
}
