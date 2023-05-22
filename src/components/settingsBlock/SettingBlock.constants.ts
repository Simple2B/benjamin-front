import { ICONS_NAME } from '../constants/iconName';

interface SETTING_BOX_INFO {
  iconName: string;
  boxName: string;
  link: string;
}

export const SETTINHS_INFO: SETTING_BOX_INFO[] = [
  {
    iconName: ICONS_NAME.info,
    boxName: 'About Operation Benjamin',
    link: '#',
  },
  {
    iconName: ICONS_NAME.form,
    boxName: 'Gravestone Change Form',
    link: '#',
  },
  {
    iconName: ICONS_NAME.envelope,
    boxName: 'Contact Us',
    link: '#',
  },
  {
    iconName: ICONS_NAME.heart,
    boxName: 'Donate',
    link: '#',
  },
];
