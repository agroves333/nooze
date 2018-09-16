import React from 'react';

import s from './Spinner.module.css';

const Index = () => {
  
  return (
    <div className={s.wrapper}>
      <div className={s.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Index;
