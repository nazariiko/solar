import Header from "./components/header/Header";
import Quiz from "./components/quiz/Quiz";
import icon from './assets/checkmark.svg';


function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Quiz />
      </div>
      <div className="bottom-icons">
        <div className="bottom-item">
          <img src={icon} />
          <p>100% kostenlos & unverbindlich</p>
        </div>
        <div className="bottom-item">
          <img src={icon} />
          <p>Regionale Anbieter</p>
        </div>
        <div className="bottom-item">
          <img src={icon} />
          <p>Staatliche Förderungen nutzen</p>
        </div>
      </div>
      <div className="footer">
        <a href="https://checkfox.de/impressum" target="_blank">Impressum</a> <span>|</span>  <a href="https://checkfox.de/datenschutzerklaerung" target="_blank">Datenschutz</a>
      </div>
    </div>
  );
}

export default App;
