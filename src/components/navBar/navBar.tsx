import React, { useContext, useRef } from "react"

import { Link } from "gatsby"
import styled, { ThemeContext } from "styled-components"

import useSiteMetadata from "~/src/hooks/useSiteMetadata"
import type { UseThemeReturnType } from "~/src/hooks/useTheme"
import Background from "~/src/styles/background"
import {
  curtainAnimationCSS,
  listAnimationCSS,
  navBackgroundAnimationCSS,
} from "~/src/styles/navBarAnimation"

import logo from "../../images/Logo.png"

import LinkList from "./linkList"
import useMenu from "./useMenu"
import type { UseMenuReturnType } from "./useMenu"

import "@fontsource/roboto"
import "@fontsource/noto-sans-kr"

interface NavBarProps {
  title?: string | null
  description?: string | null
  themeToggler: UseThemeReturnType["themeToggler"]
}

const NavBar: React.FC<NavBarProps> = ({
  title,
  description,
  themeToggler,
}) => {
  const { menuLinks } = useSiteMetadata()
  const { device } = useContext(ThemeContext)
  const navRef = useRef<HTMLElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const { toggle, setToggle, handleClick } = useMenu({
    navRef,
    curtainRef,
    listRef,
    device,
  })

  return (
    <Container>
      <Profile>
        <Link to="/">
          <LogoImg src={logo} />
        </Link>
        <Title onClick={() => setToggle(false)}>{title}</Title>

        <SubTitle>{description}</SubTitle>
      </Profile>
      <Nav ref={navRef} aria-label="Global Navigation">
        <LinkUl ref={listRef} toggle={toggle}>
          <LinkList links={menuLinks} setToggle={setToggle} />
        </LinkUl>
      </Nav>
    </Container>
  )
}

type Toggleable = Pick<UseMenuReturnType, "toggle">

const LogoImg = styled.img`
  width: 7rem;
  height: 7rem;
`

const Container = styled.header`
  width: 260px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-nav-bar);
  position: fixed;
`

const Profile = styled.div`
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 2.5rem;
  padding-left: 2.5rem;
  padding-right: 1.25rem;
`

const Nav = styled.nav`
  // min-width: var(--min-width);
  // position: fixed;
  // top: 0;
  // left: 0;
  // height: 100%;
  // z-index: 10;

  // a:hover {
  //   text-decoration: none;
  // }
`

const Content = styled.div`
  box-sizing: content-box;
  position: relative;
  margin: 0 auto;
  max-width: var(--width);
  padding: 0 var(--padding-lg);
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  li {
    margin: 0;
    list-style-type: none;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding: 0 var(--padding-sm);
  }
`

const Title = styled.h1`
  z-index: 9999;
  padding: 0;
  border: none;
  font-size: var(--text-title);
  font-weight: var(--font-weight-semi-bold);
  color: var(--color-text-3);
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-family: "Roboto", sans-serif;

  a {
    color: inherit;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: var(--text-md);
  }
`

const SubTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  color: var(--color-gray-4);
`

const LinkUl = styled.ul<Toggleable>`
  display: flex;
  flex-direction: column;

  a {
    width: 100%;
    font-weight: var(--font-weight-semi-bold);
    font-family: "Roboto", sans-serif;
    font-size: 0.9rem;
    color: var(--color-gray-3);
    text-transform: uppercase;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
  }

  @media (hover: hover) {
    a {
      transition: background-color 0.3s ease-in-out;
    }
  }

  a:hover,
  a:focus {
    background: var(--color-menubar-hover-bg);
  }

  li {
    width: 100%;
    padding: 0 1.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // margin-left: 32px;
  }

  li:not(:first-child) {
    margin-top: 0.25rem;
  }

  li:first-child,
  li:last-child {
    margin-left: 0;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    ${({ toggle }) => listAnimationCSS(toggle)}
    pointer-events: ${({ toggle }) => (toggle ? "auto" : "none")};
    flex-direction: column;
    padding: 0 var(--sizing-lg);

    li {
      display: block;
      margin-left: 0;
      font-size: var(--text-md);
      transform: ${({ toggle }) =>
        toggle ? `translateY(var(--sizing-lg))` : `translateY(0)`};
      opacity: ${({ toggle }) => (toggle ? "1" : "0")};
    }

    a {
      display: flex;
      height: 100%;
      padding: 0.5rem 0;
      font-weight: var(--font-weight-medium);
    }

    li + li::before {
      content: "";
      display: block;
      position: absolute;
      width: calc(100vw - var(--sizing-lg) * 2);
      height: 1px;
      transform: translateY(-2px);
      background-color: var(--color-divider);
    }
  }
`

const NavBackground = styled(Background)<Toggleable>`
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    &::after {
      ${({ toggle }) => navBackgroundAnimationCSS(toggle)};
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--color-post-background);
    }
  }
`

const Curtain = styled.div<Toggleable>`
  display: none;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    ${({ toggle }) => curtainAnimationCSS(toggle)}
    display: block;
    position: fixed;
    top: calc(var(--nav-height) - 1px);
    left: 0;
    width: 100%;
    height: calc(100% - var(--nav-height) + 1px);
    background-color: var(--color-post-background);
  }
`

const LinkContent = styled.div`
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 100%;
    z-index: 200;
  }
`

const LinkWrap = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--nav-height);
  }
`

export default NavBar
