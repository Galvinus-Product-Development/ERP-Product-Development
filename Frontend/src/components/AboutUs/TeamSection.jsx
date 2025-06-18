import TeamCard from './TeamCard';
import './TeamSection.css';

const TeamSection = () => (
  <section className="team-section">
    <h3 className="section-title">WORDS ABOUT US</h3>
    <h4>Our Team</h4>
    <div className="team-members">
    <div style={{ animationDelay: '0.2s' }} className="team-card-wrapper">
      <TeamCard name="Aviana Plummer" role="CEO / FOUNDER" imgSrc='https://woodmart.b-cdn.net/wp-content/uploads/2021/03/w-about-us1-per-2-opt-1.jpg.webp' />
    </div>
    <div style={{ animationDelay: '0.4s' }} className="team-card-wrapper">
        <TeamCard name="Mark Jance" role="CEO / FOUNDER" imgSrc='https://woodmart.b-cdn.net/wp-content/uploads/2021/03/w-about-us1-per-1-opt-1.jpg.webp' />
    </div> 
    <div style={{ animationDelay: '0.6s' }} className="team-card-wrapper"> 
        <TeamCard name="Kristin Watson" role="CEO / FOUNDER" imgSrc='https://woodmart.b-cdn.net/wp-content/uploads/2021/03/w-about-us1-per-4-opt-1.jpg.webp' />
      </div>
      </div>

  </section>
);

export default TeamSection;
