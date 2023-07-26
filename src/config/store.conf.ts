import createStore from '@/store/createStore';
import basic from '@/basic/model';
import H5demo from '@/pages/H5demo/model';
import Qg from '@/pages/Qg/model';
import Me from '@/pages/Me/model';
import Login from '@/pages/Login/model';
import Goods from '@/pages/Goods/model';
import GoodsDetail from '@/pages/GoodsDetail/model';
import OrderBuy from '@/pages/OrderBuy/model';
import BuyWarehouse from '@/pages/BuyWarehouse/model';
import SaleWarehouse from '@/pages/SaleWarehouse/model';
import MyAddress from '@/pages/MyAddress/model';
import Qr from '@/pages/Qr/model';
import RegisterForQr from '@/pages/RegisterForQr/model';
import WeiTuo from '@/pages/WeiTuo/model';
import Singature from '@/pages/Singature/model';
import Bank from '@/pages/Bank/model';
import Success from '@/pages/Success/model';
import Readxieyi from '@/pages/Readxieyi/model';
import Orders from '@/pages/Orders/model';
import Income from '@/pages/Income/model';
import MyStore from '@/pages/MyStore/model';
import MyStoreSet from '@/pages/MyStoreSet/model';


const models = {
  basic,
  ...Login,
  ...H5demo,
  ...Qg,
  ...Me,
  ...Goods,
  ...GoodsDetail,
  ...OrderBuy,
  ...BuyWarehouse,
  ...SaleWarehouse,
  ...MyAddress,
  ...Qr,
  ...RegisterForQr,
  ...WeiTuo,
  ...Singature,
  ...Bank,
  ...Success,
  ...Readxieyi,
  ...Orders,
  ...Income,
  ...MyStore,
  ...MyStoreSet
};

export default createStore(models);
