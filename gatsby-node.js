const dotenv = require("dotenv").config()
const axios = require("axios")
const { createFilePath } = require(`gatsby-source-filesystem`)

// api hook to create pages with async/await
// more on that below
// https://www.gatsbyjs.org/docs/creating-and-modifying-pages/
// https://www.gatsbyjs.org/tutorial/part-seven/

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  // uses axios to fetch the data from dribble
  const axiosRequest = await axios(
    `https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBLE_API_TOKEN}`
  )

  // destructure the axios data prop to get the result from the request made above
  const { data } = axiosRequest

  // gets the markdown data needed
  const markdDownPages = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            html
            fields {
              slug
            }
            frontmatter {
              title
            }
            html
          }
        }
      }
    }
  `)
  if (markdDownPages.errors) {
    throw new Error(markdDownPages.errors)
  }
  /**
   * invokes createpage api hook to create a page
   * path: http://localhost:8000/mydribbles/
   * component: the template used
   * context: data that will passed to the page internally
   * dribbles: is the data coming from the graphql data
   */
  createPage({
    path: "/mydribbles/",
    component: require.resolve("./src/templates/DribblesTemplate.js"),
    context: {
      dribbles: data,
    },
  })

  // iterates over the results fetched and creates the page based on that data
  markdDownPages.data.allMarkdownRemark.edges.forEach(edge => {
    // gets the index from the result from dribble api request
    /* const dribblePosition = data.findIndex(
      x => x.title === edge.node.frontmatter.title
    ) */

    /**
     * invokes createpage api hook to create a page
     * path:based on the slug retrieved i.e http://localhost:8000/2-Dribbble-Invites/
     * component: the template used
     * context: data that will passed to the page internally
     * projectData: is the data coming from the graphql data
     * dribbleData: is the data from dribble
     */
    createPage({
      path: `${edge.node.fields.slug}`,
      component: require.resolve("./src/templates/ProjectTemplate.js"),
      context: {
        projectData: {
          id: edge.node.id,
          title: edge.node.frontmatter.title,
          content: edge.node.html,
        },
        // dribbleData: data[dribblePosition],
      },
    })
    /**
     * invokes createpage api hook to create a page for version 2
     * path:based on the slug retrieved i.e http://localhost:8000/v2/2-Dribbble-Invites/
     * component: the template used
     * context: data that will passed to the page internally
     * projectData: is the data coming from the graphql data
     */
    /* createPage({
      path: `/v2${edge.node.fields.slug}`,
      component: require.resolve("./src/templates/ProjectTemplate_v2.js"),
      context: {
        projectData: {
          id: edge.node.id,
          title: edge.node.frontmatter.title,
          content: edge.node.html,
        },
      },
    }) */
  })
}

// api hook to extend the node created
// in this case the nodes relative to markdown data
// more on that https://www.gatsbyjs.org/docs/node-apis/#onCreateNode
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
