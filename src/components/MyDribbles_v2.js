import React from "react"
import '../assets/css/dribbles.css';

const MyDribbles_v2 = ({ dribbles }) => {
  return (
    <div className="shots">
      <h1>
        dribbles shown directly in a functional component with the data passed via React Props
      </h1>
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
  )
}

export default MyDribbles_v2
