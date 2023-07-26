import { Toast } from 'antd-mobile'
import { serviceGetGoods, serviceGetStore } from './services';
import { NAMESPACE, DESENSIT_NAMESPACE } from './constants';
import { TModel } from './types';

const initQuery: TModel['state']['query'] = {
  page_no: 0,
  page_size: 20,
};

const model: TModel = {
  state: {
    query: initQuery,
    tableList: [],
    listTotal: 0,
    desensitNamespace: DESENSIT_NAMESPACE,
    listLoading: false,
    modalInfo: { type: 'create', data: {}, show: true },
    storeInfo:{},
    goods:[]
  },
  reducers: {
    setState(state, store) {
      return { ...state, ...store };
    },
  },
  actions: (_params) => {
    const { dispatch, getState } = _params;
    const { basic } = dispatch;
    const store = dispatch[NAMESPACE];
    return {
      state: () => getState()[NAMESPACE],
      getQuery: () => {
        const { query } = store.state();
        return { ...query };
      },
      updateListLoading: (payload) => {
        store.setState({ listLoading: payload });
      },
      updateTableList: (payload) => {
        store.setState({ tableList: payload });
      },
      updateStoreInfo:(payload) => {
        store.setState({ storeInfo: payload });
      },
      updateGoods:(payload) => {
        store.setState({ goods: payload });
      },
      getStoreInfo:(params) => {
        serviceGetStore(params).then((d:any) => {
          store.updateStoreInfo(d);
        })
      },
      getGoods:(params) => {
        serviceGetGoods(params).then((d:any) => {
          if(d && d.goods){
            store.updateGoods(d.goods);
          }
        })
      }

    };
  },
};

export default { [NAMESPACE]: model };
