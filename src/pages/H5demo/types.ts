import { FormComponentProps } from 'antd/lib/form';

/**
 * 查询项类型
 */
export type TQuery = {

};

/**
 * table 列表的成员项
 */
export type TTableItem = {

};

export type TState = BaseStore.TState<TQuery, TTableItem> & {
};

export type TActions = BaseStore.TActions<TState, {
}>;

export type TReducers = BaseStore.TReducers;

export type TModel = {
  state: TState;
  actions: TActions;
  reducers: TReducers;
};

export interface IProps extends TState, ReturnType<TActions>, IBasicStore, FormComponentProps {}
