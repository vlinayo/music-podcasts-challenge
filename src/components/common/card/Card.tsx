//UI Component used to shape other components inside the card style
import React, { ReactNode } from 'react';
import cardStyles from './Card.module.scss'; 

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className={cardStyles.card}>
      {children}
    </div>
  );
};

export default Card;

