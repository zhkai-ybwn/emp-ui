import axios from 'axios';

const BASE_URL = '/energyBase/photovoltaic/v1';

export interface ValueObj {
  ts: string;
  value: number;
}

export interface EquipmentEC {
  chilledWaterPumpEC: number;
  chilledWaterPumpECProp: string;
  coolingTowerEC: number;
  coolingTowerECProp: string;
  coolingWaterPumpEC: number;
  coolingWaterPumpECProp: string;
  mainEngineEC: number;
  mainEngineECProp: string;
  modularUnitEC: number;
  modularUnitECProp: string;
}

export function equipmentEC(dimension: string) {
  return axios.get<EquipmentEC>(
    `${BASE_URL}/equipmentEC?dimension=${dimension}`
  );
}

export interface ECTrendAnalysis {
  mainEngry: ValueObj[];
  onGrid: ValueObj[];
  phoGenEc: ValueObj[];
}

export function eCTrendAnalysis(dimension: string) {
  return axios.get<ECTrendAnalysis>(
    `${BASE_URL}/eCTrendAnalysis?dimension=${dimension}`
  );
}

export interface EnviConditions {
  backplaneTemperature: number;
  dew_pTemperature: number;
  envHumidity: number;
  envTemperature: number;
  envWindSpeed2M: number;
  envWindSpeed10M: number;
}

export function enviConditions() {
  return axios.get<EnviConditions>(`${BASE_URL}/enviConditions`);
}
export interface EquipmentStatus {
  chilledWaterPump1Status: string;
  chilledWaterPump2Status: string;
  coolingTowerStatus: string;
  coolingWaterPump1Status: string;
  coolingWaterPump2Status: string;
  equipmentTotalNum: number;
  mainEngineStatus: string;
  modularMachine1Status: string;
  modularMachine2Status: string;
  modularMachine3Status: string;
  modularMachine4Status: string;
  offNum: number;
  runningNum: number;
}

export function equipmentStatus() {
  return axios.get<EquipmentStatus>(`${BASE_URL}/equipmentStatus`);
}

export interface ECStatistics {
  curMonMainEngryEC: number;
  curMonOnGridElecGen: number;
  curMonPhotovoltaicGenEc: number;
  curYearMainEngryEC: number;
  curYearOnGridElecGen: number;
  curYearPhotovoltaicGenEc: number;
  todayMainEngryEC: number;
  todayOnGridElecGen: number;
  todayPhotovoltaicGenEc: number;
}

export function eCStatistics() {
  return axios.get<ECStatistics>(`${BASE_URL}/eCStatistics`);
}

export interface PvOverview {
  mainEngineConsumption: number;
  mainEngineConsumptionYOY: string;
  todayElecGen: number;
  todayElecGenYOY: string;
  todayOnGridElecGen: number;
  todayOnGridElecGenYOY: string;
  totalCarbonEmissionReduction: number;
  totalCarbonEmissionReductionYOY: string;
  totalElecGen: number;
  totalElecGenQOQ: string;
  yesterdayElecGen: number;
  yesterdayMainEngineConsumption: number;
  yesterdayOnGridElecGen: number;
}

export function pvOverview() {
  return axios.get(`${BASE_URL}/overView`);
}
