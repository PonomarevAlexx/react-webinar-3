import { cn } from '@bem-react/classname';
import './style.css';

const ProfileCard = (props) => {
  const profileCard = cn('profile-card');

  return (
    <div className={profileCard()}>
      <h2>{props.t('title.profile')}</h2>
      <div className={profileCard('item')}>
        {props.t('user.name')}: <span>{props.name}</span>
      </div>
      <div className={profileCard('item')}>
        {props.t('user.phone')}: <span>{props.phone}</span>
      </div>
      <div className={profileCard('item')}>
        email: <span>{props.email}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
