import { Toast } from 'antd-mobile'
import { serviceGetGoodsDetail, serviceGetMyAddress } from './services';
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
    goodsItem: {},
    addrList: [],
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
      updateTableList: (payload) => {
        store.setState({ tableList: payload });
      },
      updateListTotal: (payload) => {
        store.setState({ listTotal: payload });
      },
      updateListLoading: (payload) => {
        store.setState({ listLoading: payload });
      },
      updateGoodsItem: (payload) => {
        store.setState({ goodsItem: payload });
      },
      updateAddrList: (payload) => {
        store.setState({ addrList: payload });
      },
      getGoodsItem: async (params:any) => {
       try {
         store.updateListLoading(true);
         const data = await serviceGetGoodsDetail(params);
         store.updateListLoading(false);
         if (data) {
           store.updateGoodsItem(data);
         }else{
          store.updateGoodsItem(({} as any));
         }
       } catch (err) {
        store.updateGoodsItem(({} as any));
         console.log(err);
       }
      },
      getAddrList: async (params:any) => {
        try {
          store.updateListLoading(true);
          const data = await serviceGetMyAddress(params);
          store.updateListLoading(false);
          if (data && data.addresses &&  Array.isArray(data.addresses)) {
            store.updateAddrList(data.addresses);
          }
        } catch (err) {
          console.log(err);
        }
       },
    };
  },
};

export default { [NAMESPACE]: model };
