import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';

const Form = ({ postalCode, answers }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="final-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>
        {' '}
        Wir haben bis zu 4 passende Angebote in Ihrer Region gefunden. Bitte vervollständigen Sie
        die fehlenden Daten, um die Angebote zu erhalten.
      </h2>
      <div className="form-fields">
        <div className="form-field">
          <input
            placeholder="Name"
            className={`form-input ${errors.name ? 'error' : ''}`}
            {...register('name', { required: true })}
          />
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
                defaultCountry="TH"
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
            rules={{
              validate: async (value) => {
                const res = await axios.get(`https://api.zerobounce.net/v2/validate?api_key=875373e43c5b468bbeaec6eee91244f9&email=${value}&ip_address=156.124.12.145`)
                if (res?.data?.status == 'valid') {
                  return true
                } else {
                  return false
                }
              },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                placeholder="Email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                {...register('email', { required: true })}
                value={value}
                onChange={onChange}
              />
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
