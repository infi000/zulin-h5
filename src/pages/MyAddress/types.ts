import { FormComponentProps } from 'antd/lib/form';

/**
 * 查询项类型
 */
export type TQuery = {};
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

export type TGoodsDetailItem = {
  "id": string; // "1",
  "gid": string; // "2",
  "pic": string; // "http://localhost/rushshop/Uploads/Goods/2022-05-21/6288fa0968b20.png",
  "sort": string; // "0"
}

export type TGoodsItem = {
  "id": string; // "2",
  "gnum": string; // "0",
  "gname": string; // "测试商品",
  "orignialprice": string; // "29800.00",
  "curprice": string; // "29800.00",
  "ctime": string; // "2022-05-21 22:42:32",
  "cid": string; // "1",
  "gdes": string; // "",
  "content": string; // "",
  "thumbinal": string; // "http://localhost/rushshop/Uploads/Goods/2022-05-21/6288f8fa0bd6e.png",
  "goodspic": string; // "http://localhost/rushshop/Uploads/Goods/2022-05-21/6288f8fa0bd6e.png",
  "ownuid": string; // "0",
  "gstatus": string; // "0",
  "onsale": string; // "0",
  "status": string; // "1",
  "details": TGoodsDetailItem[];
}
export type TAddrItem = {

  "id": string; // "1",
  "uid": string; // "1",
  "uname": string; // "123",
  "phone": string; // "1566220000",
  "province": string; // "北京",
  "city": string; // "北京",
  "county": string; // "东城区",
  "detail": string; // "永和大厦A-9009",
  "isdefault": string; // "1",
  "ctime": string; // "2022-05-24 23:55:07"

}

export type TState = BaseStore.TState<TQuery, TTableItem> & {
  addrList: Partial<TAddrItem>[];
  modalInfo:TModalData<any>
};

export type TActions = BaseStore.TActions<
  TState,
  {
    updateAddrList: (payload: TAddrItem[]) => void;
    updateModalInfo: (payload: TModalData<any>) => void;
    getAddrList: (payload: any) => Promise<any>
  }
>;

export type TReducers = BaseStore.TReducers;

export type TModel = {
  state: TState;
  actions: TActions;
  reducers: TReducers;
};

export interface IProps extends TState, ReturnType<TActions>, IBasicStore, FormComponentProps { }
