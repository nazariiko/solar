import React from 'react';
import { ClipLoader } from 'react-spinners';

const Preloader = ({ loading }) => {
  return (
    <div className='preloader'>
      <ClipLoader loading={loading} size={75} />
      <p style={{ marginTop: 10 }} className='preloader-text'>Suche läuft...</p>
      <p className='preloader-text'>Wir filtern die günstigsten Angebote und Anbieter für Sie heraus...</p>
    </div>
  );
};

export default Preloader;