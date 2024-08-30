import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  handleSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  handleFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  handleSubmit = async event => {
    const {username, password} = this.state

    event.preventDefault()
    const data = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok) {
      this.handleSuccess(jsonData.jwt_token)
    } else {
      this.handleFailure(jsonData.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <input
            className="input"
            id="username"
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={this.onChangeUsername}
          />
          <label className="label" htmlFor="password" id="password">
            PASSWORD
          </label>
          <input
            className="input"
            id="password"
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
