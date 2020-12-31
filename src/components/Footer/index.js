import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import './Footer.scss';

function date() {
  let date = new Date().getFullYear();
  return date;
};

const Footer = () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <footer id="Footer">
        <div className="Footer__wrapper">
          <div className="Footer__copyright">{`© ${date()} ${data.site.siteMetadata.title}. All rights reserved. `}</div>
        </div>
      </footer>
    )}
  />
);

export default Footer;
