import fetch from '@/utils/fetch';
import { TQuery, TTableItem } from './types';


/**
.22  获取小店抢购商品列表Goods/usergoods
Goods/usergoods
参数：
       必需参数：
              token登录成功返回token
       非必需参数：
              uid用户id

 */
export const serviceGetGoods = (params: {uid?:any}) => fetch('/index.php/WebApi/Goods/usergoods', { params});

// .10 用户小店信息User/userstore
// User/userstore
// 参数：
//        必需参数：
//               token登录成功返回token
//        非必需参数：
//               uid用户id
// 返回
// {
//     "res": "succ",
//     "data": {
//         "id": "85",
//         "nickname": "彭xixi",
//         "head": "",
//         "storename": ""
//     }
// }
export const serviceGetStore = (params: {uid?:any}) => fetch('/index.php/WebApi/User/userstore', { params});

export default {};
