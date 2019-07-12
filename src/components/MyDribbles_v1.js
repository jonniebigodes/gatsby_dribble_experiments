import React, { Component } from "react"
import axios from "axios"
import '../assets/css/dribbles.css'

class MyDribbles_v1 extends Component {
  state = {
    isError: false,
    dribbles: [],
  }

  async componentDidMount() {
    try {
      // this time the environment variable will use fetched depending on your mode(development or production) from .env.development or .env.production
      // more on that here https://www.gatsbyjs.org/docs/environment-variables/
      const datafromDribble = await axios(
        `https://api.dribbble.com/v2/user/shots?access_token=${process.env.GATSBY_DRIBBLE_API_TOKEN}`
      )
      const { data } = datafromDribble
      this.setState({ dribbles: data })
    } catch (error) {
      console.log("====================================")
      console.log(`something went wrong:${error}`)
      console.log("====================================")
      this.setState({ isError: true })
    }
  }
  render() {
    const { isError, dribbles } = this.state

    if (isError) {
      return (
        <>
          <h1>Something went wrong</h1>
          <h4>try reloading the page</h4>
        </>
      )
    }
    return (
      <div className="shots">
        <h1>dribbles shown directly in a component responsible for fetching the data</h1>
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
}

export default MyDribbles_v1