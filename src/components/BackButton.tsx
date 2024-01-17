import React from 'react';
import { useNavigate } from 'react-router-dom';

type ButtonContent = {
  buttonContent: string;
};

export const BackButton = ({ buttonContent }: ButtonContent) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return <button onClick={goBack}>{buttonContent}</button>;
};
