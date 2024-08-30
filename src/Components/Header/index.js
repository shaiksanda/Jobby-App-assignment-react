import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoMdHome} from 'react-icons/io'
import {FaBriefcase} from 'react-icons/fa'
import {MdExitToApp} from 'react-icons/md'

import './index.css'

const Header = props => {
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  console.log(props)
  return (
    <div className="header-container">
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </div>
      <div className="mobile-container">
        <Link to="/">
          <IoMdHome size={25} color="white" />
        </Link>
        <Link to="/jobs">
          <FaBriefcase size={25} color="white" />
        </Link>
        <Link to="/login">
          <MdExitToApp onClick={handleLogout} size={25} color="white" />
        </Link>
      </div>
      <div className="laptop-container">
        <Link to="/" className="nav-link">
          <h1 className="heading">Home</h1>
        </Link>
        <Link to="/jobs" className="nav-link">
          <h1 className="heading">Jobs</h1>
        </Link>
      </div>
      <div className="laptop-container">
        <button onClick={handleLogout} type="button" className="logout-button">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
