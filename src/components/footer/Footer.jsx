import React from "react";
import "./Footer.styles.scss";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-outer-container">
      <div className="footer-inner-container">
        <div className="columns-container">
          <div className="column column-1">
            <h3>NAVIGATION</h3>
            <ul>
              <li>
                <NavLink to="">Home</NavLink>
              </li>
              <li>
                <NavLink to="">FAQ</NavLink>
              </li>
              <li>
                <NavLink to="">Investor Relations</NavLink>
              </li>
              <li>
                <NavLink to="">Jobs</NavLink>
              </li>
              <li>
                <NavLink to="">About Us</NavLink>
              </li>
              <li>
                <NavLink to="">Help Centre</NavLink>
              </li>
            </ul>
          </div>
          <div className="column column-2">
            <h3>LEGAL</h3>
            <ul>
              <li>
                <NavLink to="">Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink to="">Terms of Service</NavLink>
              </li>
              <li>
                <NavLink to="">Cookie Preferences</NavLink>
              </li>
              <li>
                <NavLink to="">Corporate Information</NavLink>
              </li>
            </ul>
          </div>
          <div className="column column-3">
            <h3>TALK TO US</h3>
            <span>naguib.abanoub@gmail.com</span>
            <span>+2 01019699 933</span>
          </div>
          <div className="column column-4 socials-column">
            <h3>FOLLOW US</h3>
            <div className="socials-container">
              <div className="single-svg-container">
                <svg
                  className="fb-icon"
                  width="7"
                  height="15"
                  viewBox="0 0 7 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Shape"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.55073 15V7.49941H0V4.91457H1.55073V3.36264C1.55073 1.25393 2.42638 0 4.91418 0H6.98534V2.58514H5.69072C4.72228 2.58514 4.65821 2.94637 4.65821 3.62054L4.65469 4.91428H7L6.72556 7.49912H4.65469V15H1.55073Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="single-svg-container">
                <svg
                  className="twitter-icon"
                  width="13"
                  height="11"
                  viewBox="0 0 13 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Twitter"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.31224 2.92617L6.34042 3.40195L5.87076 3.34369C4.16119 3.12037 2.66767 2.363 1.39959 1.09102L0.779637 0.459879L0.619952 0.92595C0.281797 1.9649 0.497841 3.06211 1.20233 3.80006C1.57806 4.20787 1.49352 4.26613 0.84539 4.02338C0.619952 3.9457 0.422695 3.88744 0.403908 3.91657C0.338156 3.98454 0.563593 4.86814 0.742064 5.21769C0.986288 5.70318 1.48413 6.17896 2.02893 6.46055L2.4892 6.68387L1.9444 6.69358C1.41838 6.69358 1.39959 6.70329 1.45595 6.9072C1.64381 7.53834 2.38588 8.20831 3.21248 8.49961L3.79486 8.70351L3.28763 9.01423C2.53617 9.46088 1.65321 9.71333 0.770244 9.73275C0.347549 9.74246 0 9.7813 0 9.81043C0 9.90753 1.14597 10.4513 1.81289 10.6649C3.81365 11.296 6.19013 11.0242 7.97484 9.94637C9.24293 9.17929 10.511 7.65485 11.1028 6.17896C11.4222 5.39247 11.7415 3.95541 11.7415 3.26602C11.7415 2.81936 11.7697 2.7611 12.2957 2.22707C12.6057 1.91635 12.8969 1.57651 12.9532 1.47941C13.0472 1.29492 13.0378 1.29492 12.5587 1.45999C11.7603 1.75128 11.6476 1.71245 12.0421 1.2755C12.3333 0.964789 12.6808 0.40162 12.6808 0.236553C12.6808 0.207424 12.5399 0.255973 12.3803 0.343361C12.2112 0.440459 11.8355 0.586106 11.5537 0.673494L11.0464 0.838562L10.5862 0.518138C10.3325 0.343361 9.9756 0.149165 9.78773 0.0909061C9.30868 -0.0450315 8.57601 -0.0256119 8.14392 0.129745C6.96977 0.566688 6.2277 1.69303 6.31224 2.92617Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="single-svg-container">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="linkedin-icon">
                    <path
                      id="Shape"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 14H0V5H3V14V14Z"
                      fill="white"
                    />
                    <path
                      id="Shape_2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.49108 3H1.47404C0.578773 3 0 2.33303 0 1.49948C0 0.648306 0.5964 0 1.50865 0C2.42091 0 2.98269 0.648306 3 1.49948C3 2.33303 2.42091 3 1.49108 3V3Z"
                      fill="white"
                    />
                    <path
                      className="linkedin-icon"
                      id="Shape_3"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.9999 13.9998H11.0519V9.29535C11.0519 8.11371 10.6253 7.30738 9.55814 7.30738C8.74368 7.30738 8.25855 7.85096 8.04549 8.37598C7.96754 8.56414 7.94841 8.8263 7.94841 9.08911V14H5C5 14 5.03886 6.03183 5 5.20672H7.94841V6.45221C8.33968 5.85348 9.04046 5 10.6057 5C12.5456 5 14 6.25705 14 8.95797L13.9999 13.9998V13.9998Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="copyrights-container">
          <span>©2023 TheMovieVault. All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
