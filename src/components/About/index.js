import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

class About extends Component {
  state = {faqsList: [], isLoading: true}

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({faqsList: data.faq, isLoading: false})
      const {faqsList} = this.state
      console.log(faqsList)
    }
  }

  renderFaqs = () => {
    const {faqsList} = this.state
    return (
      <ul className="faqsList">
        {faqsList.map(eachItem => (
          <li className="item">
            <p className="question">{eachItem.question}</p>
            <p className="answer">{eachItem.answer}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="about-container">
          {isLoading ? (
            this.renderLoader()
          ) : (
            <div className="about">
              <h1 className="about-heading">About</h1>
              {this.renderFaqs()}
            </div>
          )}
          <Footer />
        </div>
      </>
    )
  }
}
export default About
