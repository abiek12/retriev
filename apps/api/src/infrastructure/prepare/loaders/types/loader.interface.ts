export interface IFileLoader {
  load(filePath: string): Promise<any>;
}
