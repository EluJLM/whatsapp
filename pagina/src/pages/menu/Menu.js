import React, { useContext } from 'react';
import { MenuContext } from './MenuContext';
import Section from './components/Section';

const Menu = () => {
  const { menu } = useContext(MenuContext);

  console.log(menu);
  return (
    <div>
      <h1>Menú</h1>
      {menu.map((section, index) => (
        <Section key={index} title={section.title} plates={section.plates} />
      ))}
    </div>
  );
};

export default Menu;
