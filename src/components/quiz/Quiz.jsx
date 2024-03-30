import React, { useEffect, useState } from 'react';
import Progress from '../progress/Progress';
import questions from '../../data/questions';
import marker from '../../assets/position-marker.svg';
import Preloader from '../preloader/Preloader';
import Form from '../form/Form';
import icon from '../../assets/checkmark.svg';
import axios from 'axios';

const Quiz = ({ handleHideHeader }) => {
  const [page, setPage] = useState(0);
  const [activeOption, setActiveOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [postalCode, setPostalCode] = useState('');
  const [isFinalForm, setIsFinalForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstScreen, setIsFirstScreen] = useState(true);
  const [postalCodes, setPostalCodes] = useState([]);

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

  const handleClickPostalCode = (code) => {
    setPostalCode(code.name);
    setPostalCodes([]);
  }

  const onPostalChange = async (value) => {
    setPostalCode(value);
    const res = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-germany-postleitzahl/records?select=plz_name%2Cname&where=search(name, '${value}')&limit=5`)
    const postalCodes = res?.data?.results || [];
    setPostalCodes(postalCodes);
  };

  useEffect(() => {
    if (activeOption) {
      handleForward();
    }
  }, [activeOption]);

  if (isFirstScreen) {
    return (
      <div className="quiz">
        <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: 34 }}>
          SolarInvestCheck:{' '}
        </h2>
        <p style={{ textAlign: 'center', fontSize: 22 }}>
          Lohnt sich die Investition in eine Solaranlage für Sie?
        </p>
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
        <div
          onClick={() => {
            setIsFirstScreen(false);
            handleHideHeader();
          }}
          className="first-screen-btn">
          KOSTENLOS PRÜFEN
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <Progress percent={progress} />
      {isFinalForm ? '' : <h2 className="question">{question}</h2>}
      {options ? (
        <>
          <div>
            <div className="options">
              {options.length
                ? options.map((option) => {
                    return (
                      <div
                        key={option.id}
                        className={`quiz-option ${option.id == activeOption?.id ? 'active' : ''}`}
                        onClick={() => {
                          setActiveOption(option);
                        }}>
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
          </div>
        </>
      ) : !isFinalForm ? (
        <div className="postal-form">
          <div className="postal-code-container">
            <div className="geo-icon">
              <img src={marker} />
            </div>
            <input
              onChange={(e) => onPostalChange(e.target.value)}
              className="postal-input"
              placeholder="Postleitzahl"
              autoComplete="postal-code"
              value={postalCode}
            />
            {postalCodes.length ? (
              <div className="postal-codes-popup">
                {postalCodes.map((code, index) => {
                  return <div onClick={() => handleClickPostalCode(code)} key={index}>{code.name}, {code.plz_name}</div>;
                })}
              </div>
            ) : ''}
          </div>
          <div onClick={handlePostal} className="postal-approve">
            SOLARCHECK STARTEN
          </div>
        </div>
      ) : isLoading ? (
        <Preloader loading={isLoading} />
      ) : (
        <Form postalCode={postalCode} answers={answers} />
      )}
    </div>
  );
};

export default Quiz;
