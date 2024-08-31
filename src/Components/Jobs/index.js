import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {Redirect} from 'react-router-dom'

import {Component} from 'react'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileData: {},
    jobsData: [],
    isLoadingProfile: false,
    isLoadingJobs: false,
    isProfileFailure: false,
    isJobsFailure: false,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({isLoadingProfile: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const profileData = data.profile_details
      const updatedProfileData = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      this.setState({profileData: updatedProfileData, isLoadingProfile: false})
    } else {
      this.setState({isLoadingProfile: false, isProfileFailure: true})
    }
  }

  getJobsData = async () => {
    this.setState({isLoadingJobs: true})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const jobData = await response.json()

      const updatedJobsData = jobData.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({jobsData: updatedJobsData, isLoadingJobs: false})
    } else {
      this.setState({isLoadingJobs: false, isJobsFailure: true})
    }
  }

  renderJobsDetails = () => {
    const {jobsData} = this.state
    console.log(jobsData)
    return (
      <div>
        {jobsData.map(each => (
          <JobItem key={each.id} jobData={each} />
        ))}
      </div>
    )
  }

  handleRetry = () => {
    this.getProfileData()
  }

  handleRetryJobs = () => {
    this.getJobsData()
  }

  renderLoaderView = () => (
    <div
      className="loader-container"
      data-testid="loader"
      style={{textAlign: 'center'}}
    >
      <Loader type="ThreeDots" color="white" height="50" width="50" />
    </div>
  )

  renderProfileData = () => {
    const {profileData} = this.state
    return (
      <div className="profile-container">
        <img src={profileData.profileImageUrl} alt="profile" />
        <h1 className="profile-heading">{profileData.name}</h1>
        <p className="short-bio">{profileData.shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div style={{textAlign: 'center'}}>
      <button onClick={this.handleRetry} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderJobsFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <div style={{textAlign: 'center'}}>
        <button
          onClick={this.handleRetryJobs}
          type="button"
          className="retry-button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderProfile = () => {
    const {isLoadingProfile, isProfileFailure} = this.state
    let content

    switch (true) {
      case isLoadingProfile:
        content = this.renderLoaderView()
        break
      case isProfileFailure:
        content = this.renderProfileFailureView()
        break

      default:
        content = this.renderProfileData()
        break
    }
    return content
  }

  renderJobsData = () => {
    const {isLoadingJobs, isJobsFailure} = this.state
    let content

    switch (true) {
      case isLoadingJobs:
        content = this.renderLoaderView()
        break
      case isJobsFailure:
        content = this.renderJobsFailureView()
        break

      default:
        content = this.renderJobsDetails()
        break
    }
    return content
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        <div className="job-container">
          <div className="container-1">
            <div className="input-container-1">
              <input
                placeholder="Search..."
                type="search"
                className="search-input"
              />
              <hr className="hr-custom" />
              <button
                aria-label="Open "
                type="button"
                data-testid="searchButton"
                className="search-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>{this.renderProfile()}</div>
            <hr className="hr" />
            <div>
              <h1>Types of Employment</h1>
              {employmentTypesList.map(each => (
                <div
                  key={each.employmentTypeId}
                  className="employment-type-container"
                >
                  <input type="checkbox" />
                  <p className="employment-label">{each.label}</p>
                </div>
              ))}
            </div>
            <hr className="hr" />
            <div>
              <h1>Salary Range</h1>
              {salaryRangesList.map(each => (
                <div
                  key={each.salaryRangeId}
                  className="employment-type-container"
                >
                  <input type="radio" name="salary" />
                  <p className="employment-label">{each.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="container-2">
            <div className="input-container-2">
              <input
                placeholder="Search..."
                type="search"
                className="search-input"
              />
              <button
                aria-label="Open "
                type="button"
                data-testid="searchButton"
                className="search-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>{this.renderJobsData()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
