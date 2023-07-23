export interface IMainInfo {
  dateOfDeath: iSoldierDataMap;
  status: iSoldierDataMap;
}

export interface Ilife {
  birthDate: iSoldierDataMap;
  birthLocation: iSoldierDataMap;
  parentsNames: iSoldierDataMap;
}

export interface IService {
  serviceNumber: iSoldierDataMap;
  stateEnteredServiceFrom: iSoldierDataMap;
  branchOfService: iSoldierDataMap;
  rank: iSoldierDataMap;
  unit: iSoldierDataMap;
  position: iSoldierDataMap;
  awards: iSoldierDataMap;
}

export interface IDeath {
  dateOfDeath: iSoldierDataMap;
  circumstancesOfDeath: iSoldierDataMap;
  initialBurial: iSoldierDataMap;
  finalBurialLocation: iSoldierDataMap;
}

interface iSoldierDataMap {
  header: string;
  value: string | string[] | undefined;
}
