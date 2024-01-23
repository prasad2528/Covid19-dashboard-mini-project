import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {match} = props
  const {path} = match
  const homeClassName = path === '/' ? 'highlite' : 'normal'
  const aboutClassName = path === '/about' ? 'highlite' : 'normal'
  return (
    <div className="header-container">
      <div className="header-card-container">
        <button className="button" type="button">
          COVID19<span className="span-heading">INDIA</span>
        </button>
        <ul className="list-container">
          <li className="list-item">
            <Link to="/">
              <button className={homeClassName} type="button">
                Home
              </button>
            </Link>
          </li>
          <li className="list-item">
            <Link to="/about">
              <button className={aboutClassName} type="button">
                About
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default withRouter(Header)
