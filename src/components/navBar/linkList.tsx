import React from "react"

import { Link } from "gatsby"
import { isNil } from "lodash"
import styled from "styled-components"

import type { UseSiteMetaDataReturnType } from "~/src/hooks/useSiteMetadata"
import GlobalStyle from "~/src/styles/globalStyle"

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
    const isExternalLink = EXTERNAL_LINK_EXP.test(safeLink)
    if (safeLink === ROOT) {
      return (
        <li key={name}>
          <NavLink
            to={safeLink}
            activeClassName="active"
            onClick={() => setToggle(false)}
          >
            {name}
          </NavLink>
        </li>
      )
    }
    if (isExternalLink) {
      return (
        <li key={name}>
          <a target="__blank" rel="noreferrer" href={safeLink}>
            {name}
          </a>
        </li>
      )
    }
    return (
      <li key={name}>
        <NavLink to={safeLink} activeClassName="active">
          {name}
        </NavLink>
      </li>
    )
  }

  return <>{links?.map(generateLink)}</>
}

const NavLink = styled(Link)`
  &.active {
    width: 100%;
    background-color: var(--color-menubar-hover-bg);
    color: black;
  }
`

export default LinkList
