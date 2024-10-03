import { cn } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css';

const ProfileCard = (props) => {
  const profileCard = cn('profile-card');
  const { t } = useTranslate();

  return (
    <div className={profileCard()}>
      <h2>{t('title.profile')}</h2>
      <div className={profileCard('item')}>
        {t('user.name')}: <span>{props.name}</span>
      </div>
      <div className={profileCard('item')}>
        {t('user.phone')}: <span>{props.phone}</span>
      </div>
      <div className={profileCard('item')}>
        email: <span>{props.email}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
