import { memo } from 'react';
import { cn } from '@bem-react/classname';
import './style.css';

function LangBtn({ changeLanguage, currentLanguage }) {
  const langBtn = cn('langBtn');

  return (
    <div>
      <button
        className={langBtn() + (currentLanguage === 'ru' ? langBtn({ '': 'active' }) : '')}
        onClick={() => changeLanguage('ru')}
      >
        RU
      </button>
      <button
        className={langBtn() + (currentLanguage === 'en' ? langBtn({ '': 'active' }) : '')}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}

export default memo(LangBtn);
