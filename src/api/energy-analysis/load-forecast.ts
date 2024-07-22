import axios from 'axios';

const BASE_URL = '/loadForecast';

export interface ValueObj {
  ts: string;
  value: number;
}

export interface RealTime {
  accuracy: string;
  actualData: ValueObj[];
  currentLoad: number;
  evaluationGrade: string;
  forecastData: ValueObj[];
  nextHourFL: number;
  predictedLoad: number;
}

export interface AlarmParam {
  startTime: string;
  endTime: string;
  type: string;
}

export function realTime(req: AlarmParam) {
  return axios.post<RealTime>(`${BASE_URL}/predict/realTime`, req);
}

export interface WeatherInfo {
  humidityAvg: number;
  skycon: string;
  temperatureMax: number;
  temperatureMin: number;
}

export function getWeather(req: AlarmParam) {
  return axios.post<RealTime>(`${BASE_URL}/weather/v1/getWeather`, req);
}

export function histPredict(req: AlarmParam) {
  return axios.post<RealTime>(`${BASE_URL}/predict/histPredict`, req);
}
