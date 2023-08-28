import React from "react"

import { Link } from "gatsby"
import { isNil } from "lodash"
import styled from "styled-components"

import type { UseSiteMetaDataReturnType } from "~/src/hooks/useSiteMetadata"

import HomeIcon from "../../images/icons/Icon_home.png"
import AboutIcon from "../../images/icons/Icon_info.png"
import GithubIcon from "../../images/icons/github-mark.png"

import type { UseMenuReturnType } from "./useMenu"

const ROOT = "/"
const EXTERNAL_LINK_EXP =
  /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w-]*)?(\?[^\s]*)?/gi

interface LinkListProps extends Pick<UseMenuReturnType, "setToggle"> {
  links: UseSiteMetaDataReturnType["menuLinks"]
}

const LinkList: React.FC<LinkListProps> = ({ links, setToggle }) => {
  const generateLink = (props: Queries.SiteSiteMetadataMenuLinks | null) => {
    if (isNil(props)) {
      return
    }

    const { link, name } = props
    const safeLink = isNil(link) ? "" : link
    const safeName = isNil(name) ? "" : name
    const isExternalLink = EXTERNAL_LINK_EXP.test(safeLink)

    const icons = new Map([
      [`Home`, HomeIcon],
      [`Privacy`, AboutIcon],
      [`Github`, GithubIcon],
    ])
    const Icon = icons.get(safeName)

    if (safeLink === ROOT) {
      return (
        <li key={name}>
          <NavLink
            to={safeLink}
            activeClassName="active"
            onClick={() => setToggle(false)}
          >
            <MenuIcon src={Icon} />
            {name}
          </NavLink>
        </li>
      )
    }
    if (isExternalLink) {
      return (
        <li key={name}>
          <NavLink
            target="__blank"
            rel="noreferrer"
            to={safeLink}
            activeClassName="active"
          >
            <MenuIcon src={Icon} />
            {name}
          </NavLink>
        </li>
      )
    }
    return (
      <li key={name}>
        <NavLink to={safeLink} activeClassName="active">
          <MenuIcon src={Icon} />
          {name}
        </NavLink>
      </li>
    )
  }

  return <>{links?.map(generateLink)}</>
}

const MenuIcon = styled.img`
  width: 1.5rem;
  margin-right: 1rem;
  filter: invert(94%) sepia(0%) saturate(0%) hue-rotate(186deg) brightness(90%)
    contrast(92%);
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;

  &.active {
    width: 100%;
    background-color: var(--color-menubar-hover-bg);
    color: var(--color-text);

    img {
      filter: invert(0%) sepia(10%) saturate(612%) hue-rotate(319deg)
        brightness(96%) contrast(77%);
    }
  }
`

export default LinkList
