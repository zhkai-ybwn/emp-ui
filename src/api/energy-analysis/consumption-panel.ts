import axios from 'axios';

const BASE_URL = '/analysisWeb';

export interface AssetTopology {
  child: AssetTopology[];
  code: string;
  name: string;
  level: number;
}

export function queryAssetTopology() {
  return axios.post<AssetTopology[]>(
    `${BASE_URL}/assetTopo/queryAssetTopology`
  );
}

export interface ConParams {
  classificationCode?: string;
  endTime?: string;
  level?: number;
  nodeId?: string;
  nodeIdList?: string[];
  startTime?: string;
}
export interface DetailParams {
  classificationCode?: string;
  classificationName?: string;
  endTime?: string;
  level?: number;
  nodeId?: string;
  nodeIdList?: string[];
  startTime?: string;
  nodeName?: string;
}

export interface Values {
  ts: string;
  v: number;
}

export interface ECTendData {
  avgValue: number;
  maxValue: number;
  minValue: number;
  values: Values[];
}

export function ECTends(req: ConParams) {
  return axios.post<ECTendData>(`${BASE_URL}/energyAnalysis/v1/ECTends`, req);
}

export interface ECOverAllData {
  carbonEmissionConversion: number;
  perCapita: number;
  standardCoalConversion: number;
  totalValue: number;
  totalValueQOQ: number;
  totalValueYOY: number;
  unitArea: number;
}

export function ECOverAll(req: ConParams) {
  return axios.post<ECOverAllData>(
    `${BASE_URL}/energyAnalysis/v1/ECOverAll`,
    req
  );
}

export function queryAll() {
  return axios.get<AssetTopology[]>(`${BASE_URL}/subDict/queryAll`);
}

// 能耗排名
export function ECRanking(req: ConParams) {
  return axios.post<ECOverAllData>(
    `${BASE_URL}/energyAnalysis/v1/ECRanking`,
    req
  );
}

// 能耗占比
export function ECproportion(req: ConParams) {
  return axios.post<ECOverAllData>(
    `${BASE_URL}/energyAnalysis/v1/ECproportion`,
    req
  );
}

// 能耗明细
export function ECDetails(req: DetailParams, detail: any) {
  return axios.post<ECOverAllData>(`${BASE_URL}/energyAnalysis/v1/ECDetails`, {
    ...req,
    ...detail,
    pageable: true,
  });
}

// 能耗明细导出
export function exportECDetails(req: DetailParams) {
  return axios.post<ECOverAllData>(
    `${BASE_URL}/energyAnalysis/v1/exportECDetails`,
    req,
    { responseType: 'blob' }
  );
}
