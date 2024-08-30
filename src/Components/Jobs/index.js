import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {Redirect} from 'react-router-dom'

import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        <div className="home-container">
          <div className="input-container">
            <input
              placeholder="Search..."
              type="search"
              className="search-input"
            />
            <hr className="hr-custom" />
            <FaSearch />
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
