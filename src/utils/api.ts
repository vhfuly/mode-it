import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

async function get<T = any>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return axios.get<T>(path, config);
}

async function put<T = any>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return axios.put<T>(path, config);
}


export { get, put }