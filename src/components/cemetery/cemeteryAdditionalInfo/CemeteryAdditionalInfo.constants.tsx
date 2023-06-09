import { ICemeteryAdditionalInfo } from './CemeteryAdditionalInfo.types';

export const ADDITONAL_INFO_HEADERS: Record<
  keyof ICemeteryAdditionalInfo,
  string
> = {
  superintendent: 'Superintendent',
  war: 'War',
  numberOfSoldiersBuried: 'Number of soldiers buried',
  numberOfJewishSoldiersBuried: 'Number of jewish soldiers buried',
  listedAsMissingSoldiers: 'Listed as Missing Soldiers',
};
