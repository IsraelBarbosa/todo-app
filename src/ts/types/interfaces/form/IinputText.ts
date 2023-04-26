import { Iinput } from './Iinput';

export interface ItextInput extends Iinput {
  type: 'text';
  value?: string;
  placeholder: string;
}
