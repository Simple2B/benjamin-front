import { ICemeteryAdditionalInfo } from './CemeteryAdditionalInfo.types';

export const ADDITONAL_INFO_HEADERS: Record<
  keyof ICemeteryAdditionalInfo,
  string
> = {
  superintendent: 'Superintendent',
  war: 'War',
  numberOfSoldiersBuried: 'Number of soldiers buried',
  numberOfJewishSoldiersBuried: 'numberOfJewishSoldiersBuried',
  listedAsMissingSoldiers: 'Listed as Missing Soldiers',
};
