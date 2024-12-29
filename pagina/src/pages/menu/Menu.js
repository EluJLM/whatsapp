import React, { useContext } from 'react';
import { MenuContext } from '../../utilidades/MenuContext';
import Section from './components/Section';
import { Link, Outlet } from 'react-router-dom';

const Menu = () => {
  const { menu } = useContext(MenuContext);

  return (
    <div>
      <h1>Menú</h1>
      <Link to="signin">Iniciar Sección</Link>
      {menu.map((section, index) => (
        <Section key={index} title={section.title} plates={section.plates} />
      ))}
      
      <Outlet />
    </div>
  );
};

export default Menu;
