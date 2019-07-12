import React from "react"

import "../assets/css/dribbles.css"
// basic functional component with the gatsby special prop `pageContext` already destructured
const DribblesTemplate = ({ pageContext }) => {
  // destructure the propertie that were passed in via gatsby-node.js
  const { dribbles } = pageContext

  return (
    <div>
      <h1>dribbles via gatsby node</h1>
      <div className="shots">
        {dribbles.map(dribble => {
          return (
            <a
              className="shot"
              target="_noopener"
              href={dribble.html_url}
              rel="nofollow"
              title={dribble.title}
            >
              <div className="title">{dribble.title}</div>
              <img src={dribble.images.hidpi} alt={dribble.title} />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default DribblesTemplate
