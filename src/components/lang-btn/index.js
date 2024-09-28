import { memo, useCallback } from 'react';
import useSelector from '../../store/use-selector';
import { cn } from '@bem-react/classname';
import './style.css';
import useStore from '../../store/use-store';

function LangBtn() {
  const langBtn = cn('langBtn');

  const store = useStore();
  const select = useSelector(state => ({
    currentLanguage: state.languages.currentLanguage,
  }));

  const callbacks = {
    changeLanguage: useCallback(lang => store.actions.languages.setLanguages(lang), [store]),
  };

  return (
    <div>
      <button
        className={langBtn() + (select.currentLanguage === 'ru' ? langBtn({ '': 'active' }) : '')}
        onClick={() => callbacks.changeLanguage('ru')}
      >
        RU
      </button>
      <button
        className={langBtn() + (select.currentLanguage === 'en' ? langBtn({ '': 'active' }) : '')}
        onClick={() => callbacks.changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}

export default memo(LangBtn);
