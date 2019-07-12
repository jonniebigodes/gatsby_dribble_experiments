import React from 'react';
// basic functional component with the gatsby special prop `pageContext` and `location`already destructured
const ProjectTemplate_v2=({pageContext,location})=>{
    // destructures the object that was passed in gatsby-node.js
    const {projectData}= pageContext
    // get the data that is passed down when you click the link to hit a a page that was created
    // more on that https://www.gatsbyjs.org/docs/gatsby-link/
    const {state}= location
    return (
      <div
        style={{
          margin: "0 auto",
        }}
      >
        <div>
          <h1>{projectData.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: projectData.content }} />
          {/* checks if the state object exists 
              and renders the data acordingly
           */}
          {state !== undefined ? (
            <a
              href={`${state.dribleItem[0].html_url}`}
              title={state.dribleItem[0].title}
              target="_noopener"
              rel="nofollow"
            >
              <img
                style={{ width: "220px", height: "220px" }}
                src={`${state.dribleItem[0].images.hidpi}`}
                alt={`${state.dribleItem[0].title}`}
              />
            </a>
          ) : (
            <h3>no content</h3>
          )}
        </div>
        <div
          style={{
            fontFamily: "monospace",
            display: "block",
            padding: "10px 30px",
            margin: "0",
          }}
        >
          <h3>Dribble Data passsed via link</h3>
           {/* checks if the state object exists 
              and renders the data acordingly
           */}
          <pre>
            {JSON.stringify(state !== undefined ? state.dribleItem[0] : {},null,2)}
          </pre>
        </div>
      </div>
    )
}

export default ProjectTemplate_v2