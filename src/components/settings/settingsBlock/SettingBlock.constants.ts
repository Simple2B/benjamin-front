import { ICONS_NAME } from '@/components/constants/iconName';

interface SETTING_BOX_INFO {
  iconName: string;
  boxName: string;
  linkName: string;
}

export const SETTINHS_INFO: SETTING_BOX_INFO[] = [
  {
    iconName: ICONS_NAME.info,
    boxName: 'About Operation Benjamin',
    linkName: 'aboutUrl',
  },
  {
    iconName: ICONS_NAME.form,
    boxName: 'Gravestone Change Form',
    linkName: 'gravestoneFormUrl',
  },
  {
    iconName: ICONS_NAME.envelope,
    boxName: 'Contact Us',
    linkName: 'contactUsUrl',
  },
  {
    iconName: ICONS_NAME.heart,
    boxName: 'Donate',
    linkName: 'donateUrl',
  },
];
