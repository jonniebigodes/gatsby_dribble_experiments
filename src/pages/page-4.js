import React, { Component } from "react"
import axios from "axios"
import MyDribbles_v2 from "../components/MyDribbles_v2"
class Page4 extends Component {
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
    return(
      <div>
        <h1>this is another Gatsby page</h1>
        <div>
        {/* the dribble data that "lives" in the state will be passed down to the component as a prop */}
        <MyDribbles_v2 dribbles={dribbles}/>
        </div>
      </div>

     
    )
  }
}

export default Page4
