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

  storeInfo: any;
  goods:any[];
};

export type TActions = BaseStore.TActions<TState, {
  updateStoreInfo:(payload: TState['storeInfo']) => void;
  updateGoods:(payload: TState['goods']) => void;
  getStoreInfo:(params:{uid?: any}) => void;
  getGoods:(params:{uid?: any}) => void;

}>;

export type TReducers = BaseStore.TReducers;

export type TModel = {
  state: TState;
  actions: TActions;
  reducers: TReducers;
};

export interface IProps extends TState, ReturnType<TActions>, IBasicStore, FormComponentProps {}
