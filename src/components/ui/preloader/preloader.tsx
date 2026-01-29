import React from 'react';
import styles from './preloader.module.css';

export const Preloader = () => (
  <div data-cy='preloader' className={styles.preloader}>
    <div className={styles.preloader_circle} />
  </div>
);
