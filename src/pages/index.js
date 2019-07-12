import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
// simple functional component that will consume a graphql query via the hook useStaticQuery
// more on that here=>https://www.gatsbyjs.org/docs/static-query/
export default () => {
  const listOfMarkdownPages = useStaticQuery(graphql`
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
  `)
  return (
    <div>
        <h1>List of pages</h1>
        <ul>
            {listOfMarkdownPages.allMarkdownRemark.edges.map(edge=>{
                return (<li key={edge.node.id}><Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link></li>)
            })}
        </ul>
    </div>
  )
}
