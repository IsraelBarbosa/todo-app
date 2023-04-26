import { RefObject } from 'react';
import { Container } from 'react-bootstrap';
import iconSun from '../img/icon-sun.svg';
import iconMoon from '../img/icon-moon.svg';
import { useRef, useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';
import { IiconInfo } from '../ts/types/interfaces/IiconInfo';

const iconInfoInitialData: IiconInfo = {
  iconName: iconMoon.match(/\/([a-z]+-[a-z]+)\./i)![1] as 'icon-moon',
  iconSrc: iconMoon,
};

export const Header = () => {
  const {
    state: { theme },
    dispatch,
  } = useContext(ThemeContext);

  let [iconInfo, setIconInfo] = useState<IiconInfo>(iconInfoInitialData);

  let iconRef = useRef<HTMLImageElement>(null);

  function getIconInfo(iconRef: RefObject<HTMLImageElement>) {
    if (iconRef.current?.alt.includes('icon-moon')) {
      setIconInfo({ iconName: 'icon-sun', iconSrc: iconSun });
      dispatch({ type: 'LIGHT' });
    } else {
      setIconInfo({ iconName: 'icon-moon', iconSrc: iconMoon });
      dispatch({ type: 'DARK' });
    }
  }

  return (
    <header className={`header-layout header-layout--theme-${theme} `}>
      <Container>
        <div className="header">
          <div className="__container-titulo-e-icon__">
            <h1 className="header__titulo">TODO</h1>
            <button
              className="header__button"
              onClick={() => {
                getIconInfo(iconRef);
              }}
            >
              <img
                className="header__button__icon"
                ref={iconRef}
                src={iconInfo.iconSrc}
                alt={iconInfo.iconName}
              />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
