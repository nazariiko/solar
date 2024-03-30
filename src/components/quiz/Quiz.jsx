import React, { useState } from 'react';
import Progress from '../progress/Progress';
import questions from '../../data/questions';
import marker from '../../assets/position-marker.svg';
import Preloader from '../preloader/Preloader';
import Form from '../form/Form';

const Quiz = () => {
  const [page, setPage] = useState(0);
  const [activeOption, setActiveOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [postalCode, setPostalCode] = useState('');
  const [isFinalForm, setIsFinalForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const question = questions[page].question;
  const options = questions[page].options;
  const progress = questions[page].progress;

  const handleBack = () => {
    setAnswers((prev) => {
      const newAnswers = prev.slice(0, prev.length - 1);
      return newAnswers;
    });
    setActiveOption(null);
    setPage((prevPage) => prevPage - 1);
  };

  const handleForward = () => {
    setAnswers((prev) => {
      const newAnswers = [...prev, activeOption];
      return newAnswers;
    });
    setActiveOption(null);
    setPage((prevPage) => prevPage + 1);
  };

  const handlePostal = () => {
    if (!postalCode) return;
    setIsFinalForm(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="quiz">
      <Progress percent={progress} />
      {isFinalForm ? '' : <h2 className="question">{question}</h2>}
      {options ? (
        <>
          <div className="options">
            {options.length
              ? options.map((option) => {
                  return (
                    <div
                      key={option.id}
                      className={`quiz-option ${option.id == activeOption?.id ? 'active' : ''}`}
                      onClick={() => setActiveOption(option)}>
                      {option.icon ? <img className="option-icon" src={option.icon} /> : ''}
                      <p className="option-text">{option.text}</p>
                    </div>
                  );
                })
              : ''}
          </div>
          <div className="action-buttons">
            {page !== 0 ? (
              <div onClick={handleBack} className="back-btn">
                Zurück
              </div>
            ) : (
              ''
            )}
            <div onClick={handleForward} className={`go-btn ${!activeOption ? 'disabled' : ''}`}>
              Weiter
            </div>
          </div>
        </>
      ) : !isFinalForm ? (
        <div className="postal-form">
          <div className="postal-code-container">
            <div className="geo-icon">
              <img src={marker} />
            </div>
            <input
              onChange={(e) => setPostalCode(e.target.value)}
              className="postal-input"
              placeholder="Postleitzahl"
              autoComplete="postal-code"
              value={postalCode}
            />
          </div>
          <div onClick={handlePostal} className="postal-approve">
            SOLARCHECK STARTEN
          </div>
        </div>
      ) : (
        isLoading ? <Preloader loading={isLoading} /> : <Form postalCode={postalCode} answers={answers} />
      )}
    </div>
  );
};

export default Quiz;
