import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

async function get<T = any>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return axios.get<T>(process.env.NEXT_PUBLIC_URL + path, config);
}

async function put<T = any>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return axios.put<T>(process.env.NEXT_PUBLIC_URL + path, config);
}


export { get, put }