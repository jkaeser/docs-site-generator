import React from 'react'
import './Footer.scss'

function date() {
  let date = new Date().getFullYear()
  return date
}

const Footer = () => (
  <footer id="Footer">
    <div className="Footer__wrapper">
      <div className="Footer__copyright">{`© ${date()} Chainalysis Inc. All right reserved. `}</div>
    </div>
  </footer>
)

export default Footer
