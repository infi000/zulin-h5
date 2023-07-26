export const NAMESPACE = 'BuyWarehouse';

export const DESENSIT_NAMESPACE = { view: `${NAMESPACE}_view` };

export const BUY_STATUS:Record<string, string> = {
  0: '默认',
  1: '待支付',
  2: '待确定',
  3: '已支付',
  4: '待解决',
  5: '已提货',
  6: '上架费未支付',
  7: '已上架',
};

export const BUY_TAG_MAP = [
  {
    title:'我的仓库',
    status:'1,2,3,6'
  },
  {
    title:'确认付款',
    status:'1'
  },
  {
    title:'确认收款',
    status:'2'
  },
  {
    title:'已完成',
    status:'3,6'
  },
]