// 基本类型
// 字典
declare type Dictionary<T> = {
  [key: string]: T;
};

/**
 * 将T类型中的S属性变为必填
 */
declare type TSomeRequired<T, S extends keyof T> = Omit<T, S> &
  {
    [key in S]-?: T[S];
  };

/**
 * 弹窗类型
 */
declare type TModalData<T = Dictionary<any>> = {
  show: boolean;
  type: 'create' | 'edit' | 'view';
  data: T;
}
declare interface IFetchParams {
  type?: 'GET' | 'POST';
  params: object;
  notFormat?: boolean;
  errMsg?: string;
  [key: string]: any;
}
declare type fetch = (url: string, params: IFetchParams) => Promise<any>;

declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}


declare type MerchantShowArr = Array<{ type: any; fn: () => boolean }>;

declare namespace SofaAction {
  // redux action
  type Action = {
    type: string;
    payload?: any;
    // loading 状态触发的Action
    loadingAction?: (loading: boolean) => Action;
    loadingSubmit?: ([]: string[]) => Action;
    // 异步Action调用的服务端服务
    service?: any; // TODO 搞半天没成功，放弃了；
    // 异步Action调用参数
    params?: object;
    // 异步Action调用成功后的Action
    success?: Action | ActionCreator | any;
  };
  // redux action creator
  type ActionCreator = (params?: any, callback?: any) => Action;
}
declare type SyncAction<T> = (payload: T) => { type: string; payload: T };
declare type AsyncAction<T> = (payload: T) => Promise<T>;

declare interface IReducerStoreResult<S, A> {
  state: S;
  dispatch: Function;
  action: A;
}

/**
 * 页面分页
 */
declare type TPage = { page_no: number; page_size: number };

/**
 * 借口分页
 */
declare type TPageFetch = { count: number; offset: number };


declare type TFetchMsg<T> = { res: 'succ' | 'err'; errdata: string; data: Dictionary<T> };
/**
 * 年龄组别
 */
declare type TAgeType = 'RS' | 'EL' | 'ML' | 'SL' | 'UL' | 'FF低龄' | 'FF高龄';


enum EMtype {
  '中国区' = '1',
  '组委' = '2',
}

enum EStatus {
  '正常' = '1',
  '删除' = '-1',
}
declare interface IBasicStore {
  isLoading: boolean;
  userInfo: TUserInfo; // 用户信息
}

/**
 * 用户信息
 */
declare interface IUserInfo {
  'id': string; //  "1",
  'phone': string; // : '18200000000';
  'uid': string; // : '1';
  'head': string; // : '';
  'nickname': string; // : '';
  'belongto': string; // ': 1;
  'token': string; // : 'a7e4c034944a91d417eea01787bbf7ab';
  'expired': number; // : 1653136994;
  'isverify': string; // : 1653136994;isverify

}


declare interface IBasicState {
  userInfo: TUserInfo;
  history: any;
  areas: { id: string; aname: string; city: string; describe: string; status: string }[];
}

/**
 * redux基础模板
 */
declare namespace BaseStore {

  /**
   * action的参数
   * @param { T extends TState } T  模块定义的state
   */
  interface IActionParams<T extends TState, Q extends any> {
    dispatch: {
      [key: string]: ReturnType<TActions<T, Q>> & { getState: IParams<T>['getState']; setState: (params: Partial<T>) => void };
    } & {
      basic: IBasicStore & {
        state: any;
      };
    };
    getState: () => {
      [key: string]: T;
    };
  }

  /**
   * 基础state
   * @param { Q extends Dictionary<any> } Q 查询项类型
   * @param { T extends Dictionary<any> } T 列表成员项类型
   */
  type TState<Q extends Dictionary<any>, T extends Dictionary<any>> = {
    /**
     * 查询项参数
     */
    query?: Q;
    /**
     * 列表数据
     */
    tableList?: T[];
    /**
     * 列表总条数
     */
    listTotal?: number;
    /**
     * 脱敏数据
     */
    desensitNamespace?: { [key: string]: any; view: string };
    /**
     * 列表加载状态
     */
    listLoading?: boolean;
    modalInfo?: TModalData;
  };

  /**
   * 基础action
   * @param  { T extends TState } T 模块定义的state
   * @param  { Q extends TState } Q 自定义的action
   */
  type TActions<T extends TState, Q extends any> = (params: IActionParams<T, Q>) => Omit<{
    state: () => T;
    /**
     * 获取查询项
     */
    getQuery?: () => T['query'] & TDeFlag;
    /**
     * 更新列表
     * `@param {T['tableList']} T 范型T的tableList属性
     */
    updateTableList?: (payload: T['tableList']) => void;
    /**
     *更新列表总条数
     */
    updateListTotal?: (payload: T['listTotal']) => void;
    /**
     *更新列表查询参数
     */
    updateQuery?: (payload: T['query']) => void;
    /**
     *更新列表加载状态
     */
    updateListLoading: (payload: T['listLoading']) => void;
    updateModalInfo?: (payload: T['modalInfo']) => void;
    /**
     *列表查询按执行action
     */
    onSearch?: (params?: T['query']) => void;
    /**
     *翻页action
     */
    onNav?: (params: number) => void;
    /**
     *重制查询项action
     */
    onReset?: () => void;
    /**
     *请求列表数据action
     */
    getList?: () => void;
    postCreate?: (params: any) => void;
    postModify?: (params: any) => void;
    postDel?: (params: any) => void;
  }, keyof Q> & Q;

  /**
   * 基础redluce
   */
  type TReducers = {
    setState: (state: any, store: any) => any;
  }
}



type TUserInfo = {
  belongto: string;// "0"
  expired: string;//1655918925
  head: string;// ""
  id: string;//"10"
  nickname: string;// "zcy"
  phone: string;// "18516900822"
  token: string;//"9685b3f58de6b6589910e0ccfa0adcf4"
  uid: string;//"10"
  isreadagreement: '0'  | '1';//"10"  是否阅读协议
  handssign: string;//"10" 手写签名
  card: string;//银行卡号
  isverify: '0' | '1' | '2';//银行卡号
  editbank: '1' | '2';//k可编辑
}

// // 审核
// export enum ESveify {
//   '未审核' = '0',
//   '审核未通过' = '1',
//   '审核通过' = '2',
// }