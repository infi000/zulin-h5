import { FormComponentProps } from 'antd/lib/form';

/**
 * 查询项类型
 */
export type TQuery = {};

/**
 * table 列表的成员项
 */
export type TTableItem = {};

export type TOrderItem = {
  id?: string; //  "1",
  orderid?: string; //  "123",
  gid?: string; // "1",
  gname?: string; //  "测试商品1",
  thumbinal?: string; // " http://localhost/rushshop/Uploads/Goods/2022-05-21/6288f8fa0bd6e.png",
  goodspic?: string; //  " http://localhost/rushshop/Uploads/Goods/2022-05-21/6288f8fa0bd6e.png",
  uid?: string; // "1",
  price?: string; // "100.00",
  totalprice?: string; // "0.00",
  curprice?: string; // "160.00",
  status?: string; // "0",
  ctime?: string; //  "2022-05-22 08:00:00",
  paypic?: string; // "http://localhost/rushshop",
  poid?: string; // "0"
  showid?: string; // "0"
  sname?: string; // "0"
};

export type TState = BaseStore.TState<TQuery, TTableItem> & {
  type: 'login' | 'register';
  orderItem : TOrderItem ;
};


export type TActions = BaseStore.TActions<
  TState,
  {
    updateType: (payload: TState['type']) => void;
    updateOrderItem: (payload: TOrderItem) => void;
  }
>;

export type TReducers = BaseStore.TReducers;

export type TModel = {
  state: TState;
  actions: TActions;
  reducers: TReducers;
};

export interface IProps extends TState, ReturnType<TActions>, IBasicStore, FormComponentProps {}
