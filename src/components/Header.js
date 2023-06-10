import headerLogo from '../images/header-logo-white.svg';

function Header() {
    return (
      <header className="header">
        <a className="header__link" href="#"><img className="header__logo" src={headerLogo} alt="Логотип Место" /></a>
      </header>
    );
  }
  
  export default Header;