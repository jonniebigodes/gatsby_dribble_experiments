import React from "react"

// basic functional component with the gatsby special prop `pageContext` already destructured
const ProjectTemplate = ({ pageContext }) => {
  // destructure both properties that were passed in via gatsby-node.js
  //const { projectData, dribbleData } = pageContext
  const { projectData } = pageContext
  return (
    <div
      style={{
        margin: "0 auto",
      }}
    >
      <div>
        <h1>{projectData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: projectData.content }} />
        {/* <a
          href={`${dribbleData.html_url}`}
          title={dribbleData.title}
          target="_noopener"
          rel="nofollow"
        >
          <img
            style={{ width: "220px", height: "220px" }}
            src={`${dribbleData.images.hidpi}`}
            alt={`${dribbleData.title}`}
          />
        </a>
      </div>
      <div
        style={{
          fontFamily: "monospace",
          display: "block",
          padding: "10px 30px",
          margin: "0",
        }}
      >
        <h3>Dribble Data passsed via page context</h3>
        <pre>{JSON.stringify(dribbleData, null, 2)}</pre> */}
      </div>
    </div>
  )
}

export default ProjectTemplate
