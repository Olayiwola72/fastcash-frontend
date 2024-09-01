import React from "react";
import './style.scss';
import { SocialFollowProps } from "./interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { GITHUB_URL, GOOGLE_DRIVE_CV_URL, LINKEDIN_URL, TWITTER_URL } from "../../constants/env";
import cvSrc from '../../assets/cv.png';

const SocialFollow: React.FC<SocialFollowProps> = ({ className }) => {
  return (
    <div className={`social-container ${className}`}>
      <a href={GITHUB_URL}
        target="_blank"
        className="github social"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
      <a href={TWITTER_URL} 
        target="_blank"
        className="twitter social"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href={LINKEDIN_URL}
        target="_blank"
        className="linkedin social"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
      <a href={GOOGLE_DRIVE_CV_URL}
        target="_blank"
        className="envelope social"
        rel="noopener noreferrer"
      >
        <img 
          src={cvSrc}
          alt="Olayiwola Akinnagbe | Resume" 
          width="30px"
          loading="lazy"
        />
      </a>
    </div>
  );  
}

export default SocialFollow;
