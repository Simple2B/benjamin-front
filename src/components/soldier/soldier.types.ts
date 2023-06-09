export interface Ilife {
  birthDate: iSoldierDataMap;
  birthLocation: iSoldierDataMap;
}

export interface IService {
  serviceNumber: iSoldierDataMap;
  stateEnteredServiceFrom: iSoldierDataMap;
  branchOfService: iSoldierDataMap;
  assignment: iSoldierDataMap;
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
  value: string | string[];
}
