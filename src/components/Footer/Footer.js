import './Footer.css'


import Lapiz from '../../assets/images/lapiz.png'
import Instagram from '../../assets/images/instagram.png'
import Linkedin from '../../assets/images/linkedin.png'
import Facebook from '../../assets/images/facebook.png'

export default function Footer() {
  
    return (
      <footer className="footer">
        <div className="footer__logo">
          <img src={Lapiz} alt="" className="footer__img" />
          <p className="copy">NoteU</p>
        </div>
        <p className='legacy'> 2023 NoteU labs. Inc </p>
        <div className="info_section">
          <a href='/#' className='social_media'>
            <img src={Instagram} alt="" className="footer__img" />
          </a>
          <a href='/#' className='social_media'>
            <img src={Linkedin} alt="" className="footer__img" />
          </a>
          <a href='/#' className='social_media'>
            <img src={Facebook} alt="" className="footer__img" />
          </a>
        </div>
      </footer>
    )

}
