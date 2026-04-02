import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://mainbackend.emireq.com/api",
  headers: { "Content-Type": "application/json" },
});

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string;
  headers?: Record<string, string>;
  isFormData?: boolean;
};

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(status: number, data: Record<string, unknown>) {
    super(data.message as string || `Request failed with status ${status}`);
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, token, headers = {}, isFormData = false } = options;

  try {
    const res = await api.request<T>({
      url: endpoint,
      method,
      data: body,
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
      },
    });

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      throw new ApiError(err.response.status, err.response.data ?? {});
    }
    throw err;
  }
}

export { api };
