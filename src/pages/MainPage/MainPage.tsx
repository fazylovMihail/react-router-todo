import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <>
      <section className="home">
        <div className="container">
          <h1 className="home__heading">Добро пожаловать!</h1>
          <p className="home__text">
            Выберите страницу, на которую хотите перейти
          </p>
          <Link to={"/notes"}>Заметки</Link>
        </div>
      </section>
    </>
  );
};

MainPage.displayName = "MainPage";
