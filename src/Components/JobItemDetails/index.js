import {Component} from 'react'

import {FcRating} from 'react-icons/fc'
import {IoLocation} from 'react-icons/io5'
import {FaBriefcase} from 'react-icons/fa'
import {RiExternalLinkLine} from 'react-icons/ri'

import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {jobDetails: [], similarJobs: [], skills: [], lifeAtCompany: []}

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    // console.log(response)

    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        skills: jobDetails.skills,
      }

      const {skills} = updatedJobDetails
      const {lifeAtCompany} = updatedJobDetails

      const similarJobs = data.similar_jobs
      const updatedSimilarJobs = similarJobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        skills,
        lifeAtCompany,
      })
    }
  }

  render() {
    const {jobDetails, similarJobs, skills, lifeAtCompany} = this.state
    console.log(similarJobs, skills)

    const {
      companyLogoUrl,
      title,
      rating,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <div>
        <Header />
        <div className="job-item-details-container">
          <div className="job-item-container">
            <div className="company-logo-container">
              <div>
                <img
                  src={companyLogoUrl}
                  alt="company logo"
                  className="company-logo"
                />
              </div>
              <div style={{width: '100%'}}>
                <h1 className="title-heading">{title}</h1>
                <div
                  style={{display: 'flex', alignItems: 'center', gap: '10px'}}
                >
                  <FcRating size={30} />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <IoLocation size={30} color="black" />
                <p style={{color: 'black', fontWeight: 'bold'}}>{location}</p>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <FaBriefcase size={30} color="black" />
                <p className="content">{employmentType}</p>
              </div>
              <div>
                <p style={{color: 'black', fontWeight: 'bold'}}>
                  {packagePerAnnum}
                </p>
              </div>
            </div>
            <hr className="hr-1" />
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h1 style={{color: 'black', fontWeight: 'bold'}}>
                  Description
                </h1>
                <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                  <button className="visit-button" type="button">
                    Visit <RiExternalLinkLine />
                  </button>
                </a>
              </div>
              <p style={{color: 'black', fontWeight: 'bold'}}>
                {jobDescription}
              </p>
            </div>
            <h1 style={{color: 'black', fontWeight: 'bold'}}>Skills</h1>
            <div className="skills-container">
              {skills.map(each => (
                <div className="skill">
                  <img src={each.image_url} alt="imag" />
                  <h1 style={{color: 'black', fontWeight: 'bold'}}>
                    {each.name}
                  </h1>
                </div>
              ))}
            </div>
            <h1 style={{color: 'black', fontWeight: 'bold'}}>
              Life At Company
            </h1>
            <div className="life-at-company">
              <div className="life">
                <p style={{color: 'black', fontWeight: 'bold'}}>
                  {lifeAtCompany.description}
                </p>
              </div>
              <img
                src={lifeAtCompany.image_url}
                alt="company"
                className="company-image"
              />
            </div>
          </div>
          <h1>Similar jobs</h1>
          <div className="similar-job-item">
            {similarJobs.map(each => (
              <div className="similar-item">
                <div className="company-logo-container">
                  <div>
                    <img
                      src={each.companyLogoUrl}
                      alt="company logo"
                      className="company-logo"
                    />
                  </div>
                  <div style={{width: '100%'}}>
                    <h1 className="title-heading">{each.title}</h1>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <FcRating size={30} />
                      <p className="rating">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 style={{color: 'black', fontWeight: 'bold'}}>
                    Description
                  </h1>
                  <p style={{color: 'black', fontWeight: 'bold'}}>
                    {each.jobDescription}
                  </p>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <IoLocation size={30} color="black" />
                    <p style={{color: 'black', fontWeight: 'bold'}}>
                      {each.location}
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <FaBriefcase size={30} color="black" />
                    <p className="content">{employmentType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
