import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { AppRoutes } from '@utils-types';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to={AppRoutes.Constructor} className={styles.link}>
          {({ isActive }) =>(
          <>
          <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
          <p className={`text text_type_main-default ml-2 mr-10'
            ${isActive ? styles.link_active : ''}`}>
            Конструктор
          </p>
          </>
          )}
        </NavLink>
        <NavLink to={AppRoutes.Feed} className={styles.link}>
          {({ isActive }) => (
          <>
            <ListIcon type={isActive ? 'primary' : 'secondary'} />
            <p className={`text text_type_main-default ml-2
              ${isActive ? styles.link_active : ''}`}>
              Лента заказов
            </p>
          </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink to={AppRoutes.Profile} className={styles.link}>
           {({ isActive }) =>(
            <>
          <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
          <p className={`text text_type_main-default ml-2'
            ${isActive ? styles.link_active : ''}`}>
            {userName || 'Личный кабинет'}
          </p>
          </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
