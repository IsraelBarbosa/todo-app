import { useReducer } from 'react';
import { Theme } from '../ts/types/enums/Etheme';
import { Itheme } from '../ts/types/interfaces/Itheme';
import { ACTIONTHEME } from '../ts/types/types/TactionTheme';

const initialState: Itheme = { theme: Theme.Dark };

function themeReducer(state: Itheme, action: ACTIONTHEME) {
  switch (action.type) {
    case 'DARK':
      return { theme: Theme.Dark };
    case 'LIGHT':
      return { theme: Theme.Light };
    default:
      throw new Error();
  }
}

export const useThemeReducer = () => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return { state, dispatch };
};
