import { FormComponentProps } from 'antd/lib/form';

/**
 * 查询项类型
 */
export type TQuery = {
  page:number; 
   count: number;
};
// status	状态，1正常，-1删除

// stype场次类型，1上午场，2下午场
/**
 * table 列表的成员项
 */
export type TTableItem = {
  id: string; //  "1",
  sname: string; //  "上午场",
  stype: string; //  "1",
  belongto: string; //  "1",
  stime: string; //  "10:00",
  etime: string; //  "13:00",
  describe: string; //  "场次描述",
  pic: string; //  "http://localhost/rushshop/Uploads/Goods/2022-05-21/6288f8fa0bd6e.png",
  status: string; //  "1"
};

export type TGoodsItem = {
  "id": string; //  "1",
  "gnum": string; //  "0",
  "gname": string; //  "测试商品",
  "orignialprice": string; //  "29800.00",
  "curprice": string; //  "29800.00",
  "ctime": string; //  "2022-05-21 22:41:45",
  "cid": string; //  "1",
  "gdes": string; //  "",
  "thumbinal": string; //  " http://localhost/rushshop/Uploads/Goods/2022-05-21/6288f8fa0bd6e.png",
  "ownuid": string; //  "0",
  "ownuname": string; //  "0",
  "gstatus": string; //  "0",
  "onsale": string; //  "0",
  "status": string; //  "1"
  "onsaledate": string; //  "1"
  "storename": string; //  "1"
}

export type TState = BaseStore.TState<TQuery, TTableItem> & {
  goodsList:TGoodsItem[]
  goodsTotal:number;
};

export type TActions = BaseStore.TActions<
  TState,
  {
    updateListTotal: (payload: number) => void;
    updateTableList: (payload: TTableItem[]) => void;
    updateGoodsList: (payload: TGoodsItem[]) => void;
    updateGoodsTotal: (payload: number) => void;
    updateQuery: (payload: TQuery) => void;
    onSearch: (payload: TQuery) => void;
    getGoodsList: () => Promise<any>
    onNav: (page:number) => Promise<any>
    onReset: () => void;
  }
>;

export type TReducers = BaseStore.TReducers;

export type TModel = {
  state: TState;
  actions: TActions;
  reducers: TReducers;
};

export interface IProps extends TState, ReturnType<TActions>, IBasicStore, FormComponentProps { }
