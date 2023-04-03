export interface IFile {
  _id: string;
  date: string;
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  user: string;
  childs: [{ type: string; ref: "File" }];
}
