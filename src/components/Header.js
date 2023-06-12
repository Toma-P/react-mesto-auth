import { Link, NavLink } from 'react-router-dom';
import headerLogo from '../images/header-logo-white.svg';

function Header({link, linkText, email, onLinkClick}) {
  return (
    <header className="header">
    <Link className="header__link" to="" ><img className="header__logo" src={headerLogo} alt="Логотип Место" /></Link>
      <nav className="header__nav-links">
        {email && <NavLink className="header__link" to="">{email}</NavLink>}
        <NavLink className={`header__link ${email ? 'header__link_type_exit' : ''}`} to={`${link}`} onClick={onLinkClick}>{linkText}</NavLink> 
      </nav>
    </header>
  );
}
  
export default Header;