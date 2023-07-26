import { Toast } from 'antd-mobile'
import {
  serviceGetDetail,
  serviceGetTableList, servicePostCreate, servicePostDel, servicePostLogin,
} from './services';
import { NAMESPACE, DESENSIT_NAMESPACE } from './constants';
import { TModel } from './types';

const initQuery: TModel['state']['query'] = {
  page: 1,
  count: 20,
};

const model: TModel = {
  state: {
    query: initQuery,
    tableList: [],
    listTotal: 0,
    desensitNamespace: DESENSIT_NAMESPACE,
    listLoading: false,
    modalInfo: { type: 'create', data: {}, show: true },
    type:'login'
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
      updateTableList: (payload) => {
        store.setState({ tableList: payload });
      },
      updateListTotal: (payload) => {
        store.setState({ listTotal: payload });
      },
      updateListLoading: (payload) => {
        store.setState({ listLoading: payload });
      },
      updateType: (payload) => {
        store.setState({ type: payload });
      }, updateQuery: (payload) => {
        store.setState({ query: { ...payload } });
      },

      postPostLogin(params: any) {
        return servicePostLogin(params).then((d: any) => {
          (basic as any).updateUserInfo(d);
        });
      },
      onSearch: (query) => {
        const params = {
          ...initQuery,
          ...query,
        };
        store.updateQuery(params || initQuery);
        store.getList();
      },
      onNav: async  (page) => {
        const { query,goodsList } = (store.state() as  any);
        store.updateQuery({ ...query, page});
        store.getList();
      },
      getList: async () => {
        const params = store.getQuery && store.getQuery();
        try {
          store.updateListLoading(true);
          const data = await serviceGetTableList(params);
          store.updateListLoading(false);
          if (data && Array.isArray(data.incomes)) {
            store.updateTableList(data.incomes);
            store.updateListTotal(data.total);
          }else{
            store.updateTableList([]);
            store.updateListTotal(0);
          }
        } catch (err) {
          console.log(err);
          store.updateTableList([]);
          store.updateListTotal(0);
        }
      },
    };
  },
};

export default { [NAMESPACE]: model };
