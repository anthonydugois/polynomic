import React, { Component, PropTypes } from "react"
import NavItem from "./NavItem"

import styles from "./index.css"

export default class Nav extends Component {
  static propTypes = {
    active: PropTypes.string,
  };

  constructor() {
    super()

    this.state = {
      isSticky: false,
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.initialTop = this.nav.getBoundingClientRect().top
    document.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    const isOutOfViewport = document.body.scrollTop > this.initialTop
    const { isSticky } = this.state

    if (isOutOfViewport && !isSticky) {
      this.setState({ isSticky: true })
    }

    if (!isOutOfViewport && isSticky) {
      this.setState({ isSticky: false })
    }
  }

  render() {
    const { active } = this.props
    const { isSticky } = this.state

    return (
      <nav
        className={ isSticky ? styles.navSticky : styles.nav }
        ref={ (nav) => this.nav = nav }>
        <ul className={ styles.navList }>
          <NavItem
            active={ active }
            to="/docs/">
            Introduction
          </NavItem>

          <NavItem
            active={ active }
            to="/docs/pathstring/">
            Pathstring
          </NavItem>

          <NavItem
            active={ active }
            to="/docs/point/">
            Point
          </NavItem>

          <NavItem
            active={ active }
            to="/docs/path/">
            Path
          </NavItem>

          <NavItem
            active={ active }
            to="/docs/transforms/">
            Transforms
          </NavItem>
        </ul>
      </nav>
    )
  }
}
