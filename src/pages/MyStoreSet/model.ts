import { Toast } from 'antd-mobile'
import {
  serviceGetDetail,
  serviceGetTableList, servicePostCreate, servicePostDel, servicePostLogin,
} from './services';
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
      },
      getList: async () => {
        try {
          store.updateListLoading(true);
          const data = await serviceGetTableList({});
          store.updateListLoading(false);
          if (data && Array.isArray(data.showings)) {
            store.updateTableList(data.showings);
            store.updateListTotal(data.total);
          }
        } catch (err) {
          console.log(err);
        }
      },
      postPostLogin(params: any) {
        return servicePostLogin(params).then((d: any) => {
          (basic as any).updateUserInfo(d);
        });
      },
    };
  },
};

export default { [NAMESPACE]: model };
