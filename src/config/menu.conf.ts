/**
/**
 * menus - 此文件是为了统一 menu 和 路由(两份文件有很多共通之处)。避免新加页面初始配置散落各地。
 * 原menu文件：src/basic/utils/generateMenu.js
 * 原route文件：src/App.js
 *
 * menu
 * @param {string} icon - menu 的 icon 图标
 * @param {string} name - menu 的名称
 * @param {string} path - menu 的地址(也是对应 route 的 path)
 * @param {string} key - menu 的权限
 * @param {boolen} isMenu - 是否是目录(区别目录和router)
 * @param {array} children - menu 的子目录
 *
 * route
 * @param {array} powerArr - route 的权限(menu每层的key可以组成powerArr)
 * @param {node} component - route 渲染的组件
 * @param {boolen} hasPower - route 的权限(没有对应的权限接口时可以用这个控制)
 *
 */
import * as React from 'react';
// load
import Loadable from 'react-loadable';
// base
import Loading from '@/pages/Loading';
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

type TMenuItem = {
  icon?: any;
  name?: string;
  path: string;
  key?: string;
  isMenu: boolean;
  auth?: any;
  platform?: string;
  hasPower?: boolean;
  powerArr?: Array<string>;
  component?: (React.ComponentClass<unknown, any> & Loadable.LoadableComponent) | (React.FunctionComponent<unknown> & Loadable.LoadableComponent);
  children?: Array<childItem>;
}
type childItem = TSomeRequired<TMenuItem, 'component'>;
const load = (loader: any) => Loadable({ loader, loading: Loading });
// export const NotFound = load(() => import('@/pages/NotFound'));
// export const NotPower = load(() => import('@/pages/NotPower'));

// // 首页
// const Demo = load(() => import('@/pages/Demo'));
const Login = load(() => import('@/pages/Login'));
// const CategoryManage = load(() => import('@/pages/CategoryManage'));
// const GoodManage = load(() => import('@/pages/GoodManage'));
// const SaleShowManage = load(() => import('@/pages/SaleShowManage'));
// const WithDarwManage = load(() => import('@/pages/WithDarwManage'));
// const UserManage = load(() => import('@/pages/UserManage'));
// const BuyOrdersManage = load(() => import('@/pages/BuyOrdersManage'));
// const ComplaintsManage = load(() => import('@/pages/ComplaintsManage'));
// const GoodsOrdersManage = load(() => import('@/pages/GoodsOrdersManage'));
// const AgreementsManage = load(() => import('@/pages/AgreementsManage'));
// const ManagePage = load(() => import('@/pages/ManagePage'));
const H5demo = load(() => import('@/pages/H5demo'));
const Qg = load(() => import('@/pages/Qg'));
const Me = load(() => import('@/pages/Me'));
const Goods = load(() => import('@/pages/Goods'));
const GoodsDetail = load(() => import('@/pages/GoodsDetail'));
const OrderBuy = load(() => import('@/pages/OrderBuy'));
const BuyWarehouse = load(() => import('@/pages/BuyWarehouse'));
const SaleWarehouse = load(() => import('@/pages/SaleWarehouse'));
const MyAddress = load(() => import('@/pages/MyAddress'));
const Qr = load(() => import('@/pages/Qr'));
const RegisterForQr = load(() => import('@/pages/RegisterForQr'));
const WeiTuo = load(() => import('@/pages/WeiTuo'));
const Singature = load(() => import('@/pages/Singature'));
const Bank = load(() => import('@/pages/Bank'));
const Success = load(() => import('@/pages/Success'));
const BlankTz = load(() => import('@/pages/BlankTz'));
const BlankTzWx = load(() => import('@/pages/BlankTzWx'));
const BlankZf = load(() => import('@/pages/BlankZf'));
const ReadXieyi = load(() => import('@/pages/Readxieyi'));
const Orders = load(() => import('@/pages/Orders'));
const Income = load(() => import('@/pages/Income'));
const MyStore = load(() => import('@/pages/MyStore'));
const MyStoreSet = load(() => import('@/pages/MyStoreSet'));
const RootManage = load(() => import('@/pages/RootManage'));





// 单独页面 开发工具


export const blankRoutes = [
  {
    path: '/login', // 登陆
    component: Login,
  },
  {
    path: '/rootManage',
    component: RootManage,
  },
  {
    path: '/goods', // 登陆
    component: Goods,
  },
  {
    path: '/goodsDetail', // 登陆
    component: GoodsDetail,
  },
  {
    path: '/orderBuy', // 下单页面
    component: OrderBuy,
  },
  {
    path: '/buyWarehouse', // 买房仓库
    component: BuyWarehouse,
  },
  {
    path: '/saleWarehouse', // 买房仓库
    component: SaleWarehouse,
  },
  {
    path: '/myAddress', // 买房仓库
    component: MyAddress,
  },
  {
    path: '/qr', // 买房仓库
    component: Qr,
  },
  {
    path: '/registerForQr', // 买房仓库
    component: RegisterForQr,
  },
  {
    path: '/weiTuo', // 买房仓库
    component: WeiTuo,
  },
  {
    path: '/singature', // 买房仓库
    component: Singature,
  },
  {
    path: '/bank', // 买房仓库
    component: Bank,
  },
  {
    path: '/success', // 买房仓库
    component: Success,
  },
  {
    path: '/blankTz', // 买房仓库
    component: BlankTz,
  },
  {
    path: '/blankZf', // 买房仓库
    component: BlankZf,
  },
  {
    path: '/readXieyi', // 买房仓库
    component: ReadXieyi,
  },
  {
    path: '/orders', // 买房仓库
    component: Orders,
  },
  {
    path: '/blankTzWx', // 买房仓库
    component: BlankTzWx,
  },
  {
    path: '/income', // 买房仓库
    component: Income,
  },
  {
    path: '/myStore', // 我的小店
    component: MyStore,
  },
  {
    path: '/myStoreSet', // 我的小店
    component: MyStoreSet,
  },
  // {
  //   path: '/h5demo', // h5demo
  //   component: H5demo,
  // },
];


export const menus: TMenuItem[] = [
  {
    path: '/',
    component: Qg,
    isMenu: true,
    icon: AppOutline,
    name: '抢购',
  },
  {
    path: '/me',
    component: Me,
    isMenu: true,
    icon:UserOutline,
    name: '我的',
  },
];

const generateRoute = menus.reduce((arr, item: any) => {
  if (item.children && item.children.length) {
    const childrenItem = item.children.map((el: any) => ({
      ...el,
      powerArr: el.powerArr || [item.key, el.key, 'view'],
    }));
    return arr.concat(childrenItem);
  }
  return arr.concat({
    ...item,
    powerArr: item.powerArr || [item.key, item.key, 'view'],
  });
}, []);

export const routes = generateRoute;
