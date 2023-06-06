/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnsType } from 'antd/es/table';
import { formatDate } from './date';
import { capitalize, getFirstWord, lowercase } from './strings';
import { ColumnType } from 'antd/es/list';

export const formatTableData = (data?: any[]) =>
  (data || []).map((item, index: number) => ({
    ...item,
    key: index,
  }));

export const generateColumns = (columns: string[]): ColumnsType<ColumnType> => {
  return columns.map(column => ({
    title: capitalize(column),
    dataIndex: lowercase(getFirstWord(column)),
    key: lowercase(getFirstWord(column)),
    render: value =>
      lowercase(getFirstWord(column)) === 'date' ? formatDate(value) : value,
  }));
};
