import React, { Component } from "react"
import axios from "axios"
import { graphql, Link } from "gatsby"


/**
 * this page will handle fetching the dribble data and store it in it's state
 */
class Page2 extends Component {
  state = {
    dribbleData: [],
    isError: false,
  }

  // component livecycle call
  async componentDidMount() {
    try {
      // this time the environment variable will use fetched depending on your mode(development or production) from .env.development or .env.production
      // more on that here https://www.gatsbyjs.org/docs/environment-variables/
      const datafromDribble = await axios(
        `https://api.dribbble.com/v2/user/shots?access_token=${process.env.GATSBY_DRIBBLE_API_TOKEN}`
      )
      const { data } = datafromDribble
      this.setState({ dribbleData: data })
    } catch (error) {
      console.log("====================================")
      console.log(`something went wrong:${error}`)
      console.log("====================================")
      this.setState({ isError: true })
    }
  }
  render() {
    const { dribbleData, isError } = this.state
    const { data } = this.props
    if (isError) {
      return (
        <>
          <h1>Something went wrong</h1>
          <h4>try reloading the page</h4>
        </>
      )
    }
    return (
      <div>
        <h1>List of pages version 2.0</h1>
        <ul>
          {data.allMarkdownRemark.edges.map(edge => {
            return (
              <li key={edge.node.id}>
                {/* creates a new gatsby link to the page created in gatsby-node.js (v2) and injects via link state prop the data regarding that page */}
                <Link to={`/v2${edge.node.fields.slug}`} state={{dribleItem:dribbleData.filter( x => x.title === edge.node.frontmatter.title)}}>
                  {edge.node.frontmatter.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
// a page query identical to the one used for v1
// more on that here https://www.gatsbyjs.org/docs/page-query/
export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
export default Page2
