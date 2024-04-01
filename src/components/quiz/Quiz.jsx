import React, { useEffect, useState } from 'react';
import Progress from '../progress/Progress';
import questions from '../../data/questions';
import marker from '../../assets/position-marker.svg';
import Preloader from '../preloader/Preloader';
import Form from '../form/Form';
import icon from '../../assets/checkmark.svg';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import animationData from '../../animations/firts-screen.json';
import Lottie from 'react-lottie';
import MoneyIcon from '@mui/icons-material/Money';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CompareIcon from '@mui/icons-material/Compare';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

const Quiz = ({ handleHideHeader }) => {
  const [page, setPage] = useState(0);
  const [activeOption, setActiveOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [postalCode, setPostalCode] = useState('');
  const [isFinalForm, setIsFinalForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstScreen, setIsFirstScreen] = useState(true);
  const [postalCodes, setPostalCodes] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    setPostalCode(value)
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
        <p style={{ textAlign: 'center', fontSize: 20 }}>
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
        <div className='animation'>
          <Lottie 
            options={{
              loop: false,
              animationData: animationData
            }}
            width={370}
          />
        </div>
        <div className='first-screen-info'>
          <h2 className='first-screen-info__heading'>So einfach funktioniert's</h2>
          <div className='number-info-list'>
            <div className='number-info-list__item'>
              <div className='number-in-circle'>1</div>
              <div>
                <h3>Preis-Check starten</h3>
                <p>Besuchen Sie unsere Webseite und beginnen Sie den kostenlosen Preis-Check.</p>
              </div>
            </div>
            <div className='number-info-list__item'>
              <div className='number-in-circle'>2</div>
              <div>
                <h3>Fragen beantworten</h3>
                <p>Beantworten Sie einige einfache Fragen zu Ihren Anforderungen und Vorstellungen bezüglich der Photovoltaikanlage.</p>
              </div>
            </div>
            <div className='number-info-list__item'>
              <div className='number-in-circle'>3</div>
              <div>
                <h3>Angebote und Bewertungen erhalten</h3>
                <p>Nach der Beantwortung der Fragen erhalten Sie maßgeschneiderte Angebote und Bewertungen verschiedener Fachanbieter in Ihrer Region.</p>
              </div>
            </div>
            <div className='number-info-list__item'>
              <div className='number-in-circle'>4</div>
              <div>
                <h3>Besten Anbieter auswählen</h3>
                <p>Vergleichen Sie die Angebote und wählen Sie den Anbieter aus, der am besten zu Ihren Bedürfnissen und Ihrem Budget passt.</p>
              </div>
            </div>
          </div>

          <div className='icon-info-list'>
            <div className='icon-info-list__item'>
              <MoneyIcon />
              <h3>Überbezahlung für Solaranlagen</h3>
              <p>Verhindern Sie, dass Sie zu hohe Preise für Ihre Photovoltaikanlage zahlen.</p>
            </div>
            <div className='icon-info-list__item'>
              <ThumbDownIcon />
              <h3>Mangelhafte Qualität</h3>
              <p>Schützen Sie sich vor Anbietern, die minderwertige Solaranlagen verkaufen.</p>
            </div>
            <div className='icon-info-list__item'>
              <CompareIcon />
              <h3>Fehlende Vergleichsmöglichkeiten</h3>
              <p>Vermeiden Sie es, ohne Vergleichsmöglichkeiten eine Entscheidung zu treffen.</p>
            </div>
            <div className='icon-info-list__item'>
              <PriorityHighIcon />
              <h3>Unzureichende Marktkompetenz</h3>
              <p>Lassen Sie sich nicht durch Unkenntnis der aktuellen Marktlage in die Irre führen.</p>
            </div>
            <div className='icon-info-list__item'>
              <AccessTimeIcon />
              <h3>Lange Wartezeiten</h3>
              <p>Umgehen Sie Anbieter mit übermäßig langen Liefer- und Installationszeiten.</p>
            </div>
            <div className='icon-info-list__item'>
              <RecordVoiceOverIcon />
              <h3>Unklare Garantiebedingungen</h3>
              <p>Schließen Sie Anbieter mit undurchsichtigen oder unzureichenden Garantie- und Serviceleistungen aus.</p>
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: '60px' }}
          onClick={() => {
            setIsFirstScreen(false);
            handleHideHeader();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="first-screen-btn">
          Jetzt Preis-Check starten!
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
        <form className="postal-form" onSubmit={handleSubmit(handlePostal)}>
          <div className={`postal-code-container ${errors.postalCode ? 'error' : ''}`}>
            <div className="geo-icon">
              <img src={marker} />
            </div>
            <input
              className="postal-input"
              placeholder="Postleitzahl"
              autoComplete="postal-code"
              value={postalCode}
              {...register('postalCode', { required: true, onChange: (e) => onPostalChange(e.target.value) })}
            />
            {postalCodes.length ? (
              <div className="postal-codes-popup">
                {postalCodes.map((code, index) => {
                  return <div onClick={() => handleClickPostalCode(code)} key={index}>{code.name}, {code.plz_name}</div>;
                })}
              </div>
            ) : ''}
          </div>
          <button className="postal-approve" type='submit'>
            SOLARCHECK STARTEN
          </button>
        </form>
      ) : isLoading ? (
        <Preloader loading={isLoading} />
      ) : (
        <Form postalCode={postalCode} answers={answers} />
      )}
    </div>
  );
};

export default Quiz;
