import './index.css'

const NotFound = props => {
  console.log(props)
  return (
    <div className="not-found-bg-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
        />
        <h1 className="not-found">Page Not Found</h1>
        <p style={{textAlign: 'center'}}>
          We are sorry, the page you requested could not be found
        </p>
      </div>
    </div>
  )
}

export default NotFound
