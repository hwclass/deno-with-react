export type TListItem = {
  name: string;
  description: string;
  [key: string]: number | string | boolean;
};

export enum EContentType {
  ApplicationJavascript = 'application/javascript'
}

export type TAsset = {
  fileName: string,
  headers: {
    [key: string]: EContentType.ApplicationJavascript
  }
}
 