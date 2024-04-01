import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';
import postIcon from '../../assets/post.svg';
import personIcon from '../../assets/person-circle.svg';
import image from '../../assets/green_checkmark.svg';

const Form = ({ postalCode, answers }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm();

  const handleSendInfoToTelegram = async (data) => {
    // 857401534
    // 435778610
    const message = `
      %0AName: ${data.name}
      %0AEmail: ${data.email}
      %0APhone: ${data.phone}
      %0APost code: ${postalCode}%0A
      ${answers.map(item => item.text).join('%0A')}
    `
    await axios.get(`https://api.telegram.org/bot6509990959:AAFKjsZ1Qs125PE5OqaGzz9xros0yKiXUyA/sendMessage?chat_id=857401534&text=${message}`)

    document.querySelector('.main').innerHTML = ''
    document.querySelector('.main').insertAdjacentHTML('beforeend', `
      <img style="width: 250px;" src=${image} />
      <h3 style="text-align: center;">Vielen Dank für Ihr Interesse!</h3>
      <p style="text-align: center;">Wir kontaktieren Sie in Kürze telefonisch, um Ihnen die passenden Angebote für Ihre geplante Solaranlage zu besprechen.</p>
    `)
  }

  const onSubmit = async (data) => {
    const res = await axios.get(`https://api.zerobounce.net/v2/validate?api_key=875373e43c5b468bbeaec6eee91244f9&email=${data.email}&ip_address=156.124.12.145`)
    if (res?.data?.status == 'valid') {
      handleSendInfoToTelegram(data)
    } else {
      setError('email', { type: 'validate' })
    }
  };

  return (
    <form className="final-form" onSubmit={handleSubmit(onSubmit)}>
      <p className='final-form-p'>Wir haben bis zu 4 passende Anbieter in Ihrer Regionen gefunden.</p>
      <h2 className='final-form-h2'>Bitte vervollständigen Sie die fehlenden Daten, um die günstigsten Angebote zu erhalten.</h2>
      <div className="form-fields">
        <div className="form-field">
          <div
            className={`form-input ${errors.name ? 'error' : ''}`}
          >
            <img src={personIcon} />
            <input
              placeholder="Name"
              className={` ${errors.name ? 'error' : ''}`}
              {...register('name', { required: true })}
            />
          </div>
          <div className="form-error">{errors.name ? 'erforderlich' : ''}</div>
        </div>
        <div className="form-field">
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: (value) => {
                let newValue;
                if (value === undefined) {
                  newValue = '';
                } else {
                  newValue = value.toString()
                }
                return isValidPhoneNumber(newValue)
              },
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                className={`form-input ${errors.phone ? 'error' : ''}`}
                value={value}
                onChange={onChange}
                defaultCountry="DE"
                placeholder="Telefon"
                id="phone"
              />
            )}
          />
          <div className="form-error">{errors.phone ? 'erforderlich' : ''}</div>
        </div>
        <div className="form-field">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div
                className={`form-input ${errors.email ? 'error' : ''}`}
              >
                <img src={postIcon} />
                <input
                  placeholder="Email"
                  className={`${errors.email ? 'error' : ''}`}
                  {...register('email', { required: true })}
                  value={value}
                  onChange={onChange}
                />
              </div>
            )}
          />
          <div className="form-error">{errors.email ? errors.email.required ? 'erforderlich' : 'ungültige EMail' : ''}</div>
        </div>
      </div>

      <button className="final-submit" type="submit">
        JETZT ANGEBOTE VERGLEICHEN
      </button>
    </form>
  );
};

export default Form;
