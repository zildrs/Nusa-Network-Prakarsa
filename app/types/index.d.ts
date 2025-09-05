export type BaseDataType = {
  createdAt: string;
  documentId: string;
  id: number;
  name: string;
  publishedAt: string;
  updatedAt: string;
};

export type PaginationDataType = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type MetaDataType = {
  pagination: PaginationDataType;
};

export type DataResponseType<T> = {
  data: T;
  meta: MetaDataType;
};
