import {IoLogoInstagram} from 'react-icons/io5'
import {FiGithub, FiTwitter} from 'react-icons/fi'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <h1 className="heading">
      COVID19<span className="span-heading">INDIA</span>
    </h1>
    <p className="footer-description">
      We stand with everyone fighting on the front lines
    </p>
    <div className="footer-icons">
      <FiGithub className="git" />
      <IoLogoInstagram className="instagram" />
      <FiTwitter className="twitter" />
    </div>
  </footer>
)
export default Footer
