import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home-container">
          <div>
            <h1 className="job-title">Find The Job That Fits Your Life</h1>
            <p>
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>

            <Link to="/jobs">
              <button type="button" className="card">
                Find Jobs
              </button>
            </Link>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <img
              src="https://www.vmcdn.ca/f/files/kitchenertoday/images/jobs/searching-for-job.jpeg;w=960"
              alt="imag"
              className="image"
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Home
