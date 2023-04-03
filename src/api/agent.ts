import axios, { AxiosResponse } from "axios";
import { IFile } from "./files.interfaces";
import { ISignIn, ISignUp, IUserAuthData, IUserModel } from "./user.interfaces";

export const API_URL = "http://localhost:5000";

axios.defaults.baseURL = `${API_URL}/api`;

axios.interceptors.response.use(async (response) => {
  return response;
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: any, config?: any) =>
    axios.post<T>(url, body, config).then(responseBody),
  put: <T>(url: string, body: any) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const user = {
  auth: () => requests.get<IUserAuthData>(`/auth/auth`),
  signUp: (data: ISignUp) =>
    requests.post<IUserModel>(`/auth/registration`, data),
  signIn: (data: ISignIn) =>
    requests.post<{ user: IUserModel; token: string }>(`/auth/login`, data),
  uploadAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append("file", avatar);
    return requests.post<IUserModel>(`/files/avatar`, formData);
  },
  deleteAvatar: () => requests.delete<IUserModel>(`/files/avatar`),
};

const files = {
  getFiles: (dirId: string | null, sort?: string) => {
    let url = "/files";

    if (dirId) {
      url = `/files?parent=${dirId}`;
    }
    if (sort) {
      url = `/files?sort=${sort}`;
    }
    if (dirId && sort) {
      url = `/files?parent=${dirId}&sort=${sort}`;
    }
    return requests.get<IFile[]>(url);
  },
  searchFile: (search: string) =>
    requests.get<IFile[]>(`/files/search?search=${search}`),
  createDir: (dirId: string | null, name: string) =>
    requests.post<IFile>(`/files`, {
      name,
      parent: dirId,
      type: "dir",
    }),
  uploadFile: (data: FormData, config: any) => {
    return requests.post<IFile>(`/files/upload`, data, config);
  },
  downloadFile: async (file: IFile) => {
    const response = await axios.get(`/files/download/?id=${file._id}`, {
      responseType: "blob",
    });

    if (response.status === 200) {
      const blob = await response.data;
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  },
  deleteFile: async (file: IFile) =>
    requests.delete<{ message: string }>(`/files?id=${file._id}`),
};

const agent = {
  user,
  files,
};

export default agent;
