import PropTypes from 'prop-types';
import './TeamCard.css';

const TeamCard = ({ name, role, imgSrc }) => (
  <div className="team-card">
    <img src={imgSrc} alt={name} />
    <h5>{name}</h5>
    <p>{role}</p>
    <div className="social-icons">
      <i className="fa-brands fa-facebook"></i>
      <i className="fa-brands fa-instagram"></i>
      <i className="fa-brands fa-linkedin"></i>
      <i className="fa-brands fa-twitter"></i>
    </div>
  </div>
);

TeamCard.propTypes = {
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
  };

export default TeamCard;
