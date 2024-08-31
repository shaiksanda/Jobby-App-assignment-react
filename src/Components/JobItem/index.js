import {Link} from 'react-router-dom'

import {FcRating} from 'react-icons/fc'
import {IoLocation} from 'react-icons/io5'
import {FaBriefcase} from 'react-icons/fa'
import './index.css'

const JobItem = props => {
  const {jobData} = props

  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobData
  return (
    <Link to={`/jobs/${jobData.id}`} className="nav-link">
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
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
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
          <h1 style={{color: 'black', fontWeight: 'bold'}}>Description</h1>
          <p style={{color: 'black', fontWeight: 'bold'}}>{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobItem
