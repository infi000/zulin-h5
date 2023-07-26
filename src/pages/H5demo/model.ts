import { Toast } from 'antd-mobile'
import {
  serviceGetDetail,
  serviceGetTableList, servicePostCreate, servicePostDel, servicePostModify,
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
    };
  },
};

export default { [NAMESPACE]: model };
