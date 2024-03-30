import { useState } from "react";
import Header from "./components/header/Header";
import Quiz from "./components/quiz/Quiz";


function App() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  const handleHideHeader = () => {
    setIsHeaderVisible(false)
  }

  return (
    <div className="app">
      <Header visible={isHeaderVisible} />
      <div className="main">
        <Quiz handleHideHeader={handleHideHeader} />
      </div>
      <div className="footer">
        <a href="https://checkfox.de/impressum" target="_blank">Impressum</a> <span>|</span>  <a href="https://checkfox.de/datenschutzerklaerung" target="_blank">Datenschutz</a>
      </div>
    </div>
  );
}

export default App;
