//UI Component used to shape other components inside the card style
import React, { ReactNode } from "react";
import cardStyles from "./Card.module.scss";

interface CardProps {
  customStyles: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children, customStyles }) => {
  return (
    <div
      className={
        customStyles ? `${cardStyles.card} ${customStyles}` : cardStyles.card
      }
    >
      {children}
    </div>
  );
};

export default Card;
