import { useNavigate } from "react-router-dom";
import Header from "./Header";

function PageNotFound() {
  const navigate = useNavigate();
  const navigateClick = () => {
    navigate('/sing-in');
  }

  return (
    <>
      <Header link="/sign-in" linkText="Войти" onLinkClick={navigateClick} />
      <h2 className="page__error-title">Страница не найдена</h2>
    </>

  )
}

export default PageNotFound;