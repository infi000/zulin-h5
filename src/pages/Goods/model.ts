import { Toast } from 'antd-mobile'
import {
  serviceGetGoods,
  serviceGetTableList, servicePostCreate, servicePostDel, servicePostModify,
} from './services';
import { NAMESPACE, DESENSIT_NAMESPACE } from './constants';
import { TModel } from './types';

const initQuery: TModel['state']['query'] = {
  page: 1,
  count: 10,
};



const model: TModel = {
  state: {
    query: initQuery,
    tableList: [],
    goodsList: [],
    listTotal: 0,
    goodsTotal: 0,
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
      onReset: () =>{
        store.setState({
          query: initQuery,
          tableList: [],
          goodsList: [],
          listTotal: 0,
          goodsTotal: 0,
          desensitNamespace: DESENSIT_NAMESPACE,
          listLoading: false,
          modalInfo: { type: 'create', data: {}, show: true },
        })
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
      updateGoodsList: (payload) => {
        store.setState({ goodsList: payload });
      },
      updateGoodsTotal: (payload) => {
        store.setState({ goodsTotal: payload });
      },
      updateQuery: (payload) => {
        store.setState({ query: { ...payload } });
      },
      getList: async () => {
        try {
          store.updateListLoading(true);
          const data = await serviceGetTableList(({}  as any));
          store.updateListLoading(false);
          if (data && Array.isArray(data.showings)) {
            store.updateTableList(data.showings);
            store.updateListTotal(data.total);
          }
        } catch (err) {
          console.log(err);
        }
      },
      onSearch: (query) => {
        const params = {
          ...initQuery,
          ...query,
        };
        store.updateQuery(params || initQuery);
        store.getGoodsList();
      },
      onNav: async  (page) => {
        const { query,goodsList } = (store.state() as  any);
        store.updateQuery({ ...query, page});
        store.getGoodsList();
      },
      getGoodsList: async () => {
        const params = store.getQuery && store.getQuery();
        try {
          store.updateListLoading(true);
          const data = await serviceGetGoods(params);
          store.updateListLoading(false);
          if (data && Array.isArray(data.goods)) {
            store.updateGoodsList(data.goods);
            store.updateGoodsTotal(data.total);
          }else{
            store.updateGoodsList([]);
            store.updateGoodsTotal(0);
          }
        } catch (err) {
          console.log(err);
          store.updateGoodsList([]);
          store.updateGoodsTotal(0);
        }
      },
    };
  },
};

export default { [NAMESPACE]: model };
