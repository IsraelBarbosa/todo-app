import { createContext, Dispatch } from 'react';
import { useThemeReducer } from '../reducers/themeReducer';
import { Theme } from '../ts/types/enums/Etheme';

import { IcomponentProps } from '../ts/types/interfaces/IcomponentProps';
import { Itheme } from '../ts/types/interfaces/Itheme';
import { ACTIONTHEME } from '../ts/types/types/TactionTheme';

export const ThemeContext = createContext<{
  state: Itheme;
  dispatch: Dispatch<ACTIONTHEME>;
}>({
  state: { theme: Theme.Dark },
  dispatch: () => null,
});

export const ThemeProvider = ({ children }: IcomponentProps) => {
  const { state, dispatch } = useThemeReducer();

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
