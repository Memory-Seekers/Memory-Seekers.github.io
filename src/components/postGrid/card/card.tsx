import React from "react"

import styled from "styled-components"

import Category from "~/src/styles/category"
import DateTime from "~/src/styles/dateTime"
import type Post from "~/src/types/Post"

import CenteredImg from "./centeredImg"
import "@fontsource/noto-sans-kr"

type CardProps = Pick<
  Post,
  "thumbnail" | "alt" | "category" | "title" | "desc" | "date"
>

const Card: React.FC<CardProps> = ({
  thumbnail,
  alt,
  category,
  title,
  desc,
  date,
}) => {
  return (
    <Wrapper>
      {/* <CenteredImg src={thumbnail} alt={alt} /> */}
      <Text>
        <div>
          {/* <Category>{category}</Category> */}
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
        </div>
        <DateTime dateTime={date!}>{date}</DateTime>
      </Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  border-radius: var(--border-radius-base);
  border: solid;
  border-width: 2px;
  border-color: var(--color-gray-1);

  /* Fix Safari overflow:hidden with border radius not working error */
  transform: translateZ(0);
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
  padding: var(--sizing-md);

  & > * {
    display: block;
  }
`

const Title = styled.h3`
  font-family: "Noto Sans KR", sans-serif;
  font-size: var(--text-title);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.device.md}) {
    font-size: 1.3125rem;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: var(--text-md);
  }
`

const Desc = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  line-height: 1.5;
  margin-top: 8px;
  padding-bottom: var(--sizing-sm);
  color: var(--color-text-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default React.memo(Card)
