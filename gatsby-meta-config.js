/**
 * @typedef {Object} Links
 * @prop {string} github Your github repository
 */

/**
 * @typedef {Object} MetaConfig
 * @prop {string} title Your website title
 * @prop {string} description Your website description
 * @prop {string} author Maybe your name
 * @prop {string} siteUrl Your website URL
 * @prop {string} lang Your website Language
 * @prop {string} utterances Github repository to store comments
 * @prop {Links} links
 * @prop {string} favicon Favicon Path
 */

/** @type {MetaConfig} */
const metaConfig = {
  title: "Memory-Seekers",
  description: `추억일지 블로그`,
  author: "Memory-Seekers",
  siteUrl: "https://gatsby-starter-apple.netlify.app",
  lang: "en",
  utterances: "sungik-choi/gatsby-starter-apple-comment",
  links: {
    github: "https://github.com/Memory-Seekers",
  },
  favicon: "src/images/icon.png",
}

// eslint-disable-next-line no-undef
module.exports = metaConfig
