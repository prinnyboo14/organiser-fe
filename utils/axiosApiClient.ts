import type { AxiosRequestConfig } from "axios";
import axios from "axios";

type ClientRequestConfig = AxiosRequestConfig;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    };
  }
  return { success: false, message: "Unknown error" };
}

export async function get<T>(
  path: string,
  config?: ClientRequestConfig
): Promise<T> {
  try {
    const res = await api.get<T>(path, config);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
}

async function post<T, B>(
  path: string,
  body: B,
  config?: ClientRequestConfig
): Promise<T> {
  try {
    const res = await api.post<T>(path, body, config);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
}

async function put<T, B>(
  path: string,
  body: B,
  config?: ClientRequestConfig
): Promise<T> {
  try {
    const res = await api.put<T>(path, body, config);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
}

async function del<T>(path: string, config?: ClientRequestConfig): Promise<T> {
  try {
    const res = await api.delete<T>(path, config);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
}

export const apiClient = { get, post, put, del };
