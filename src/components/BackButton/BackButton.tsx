import { useNavigate } from 'react-router-dom';
import './styles/BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="back-button-container">
      <button onClick={goBack} className="back-btn">
        <img src="/assets/return-icon.svg" alt="" />
        Back
      </button>
      <div className="underline"></div>
    </div>
  );
};
