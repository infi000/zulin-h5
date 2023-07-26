import * as React from 'react';
// import { get, debounce } from 'lodash';
// import { get, debounce } from 'lodash';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import { isObject } from 'util';
import { MERCHANT_INFO_LIST } from '@/constants';
import { filterColumns, _getIsWxClient } from './utils';
import { TColumnsItem } from '@/types';

const { useState, useRef, useEffect, useReducer, useMemo, useContext, useCallback } = React;

type Columns<T=any> =Array<Omit<TColumnsItem<T>, 'width'> & { width?: number}>;

const mathScrollX = (columns: Columns) => columns.map(item => item.width || 100).reduce((sum, num) => sum + num, 0);
/**
 * 功能1:过滤columns中的disabled为true的项目
 * 功能2:配置默认render属性，没有数据的情况返回'-'
 */
// eslint-disable-next-line arrow-parens
export const useTableRenderNull = <T extends any>(columns: Columns<T>, libs: React.DependencyList) => {
  const [newColumns, setNewColumns] = useState<[] | Columns<T>>([]);
  useEffect(() => {
    setNewColumns(filterColumns(columns));
  }, libs);
  return newColumns;
};

/**
 *
 * @param {antd.columns} columns
 * @param { React.DependencyList} libs
 * @return {number}
 */
export const useTableScrollX = (columns: Columns, libs: React.DependencyList): number => {
  const [scrollX, setScrollX] = useState(0);
  useEffect(() => {
    setScrollX(() => (Array(columns) && columns.length > 0 ? mathScrollX(columns.filter(item => !item.disabled)) : 0));
  }, libs);
  return scrollX;
};

/**
 * 防止依赖数组初始化就执行useEffect内的回调函数。
 * @param fn 回调函数
 * @param dep 依赖，不能为空
 */

export const useDepEffect = (fn: Function, dep: Array<any>) => {
  const renderCount = useRef(0);
  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    if (renderCount.current++) {
      fn();
    }
  }, [...dep]);
};

/**
 * 返回state和action，可以注入到夫组件的context中，子组件可直接调用action和state，也可以直接dispatch
 * 支持异步action
 * @param actions {actionName1:()=>{},actionName2:()=>{},}
 * @param reducer
 * @param initialState 初始值
 * @param init 初始化方法
 * @type A action类型
 * @type S state类型
 */

export const useReducerStore = function a<S, A>(
  actions: Dictionary<any>,
  reducer: React.Reducer<any, any>,
  initialState: S,
  init?: () => S
) {
  const [state, dispatch]: [S, any] = useReducer(reducer, initialState, init || (() => { }));
  const action: A = useMemo(() => {
    const filterAction = (fn: Function, payload: object) => {
      // eslint-disable-next-line no-underscore-dangle
      const _fn = fn(payload);
      // 同步action直接派发
      if (typeof _fn == 'object') {
        dispatch(_fn);
      } else {
        // 异步action,执行此方法
        _fn(dispatch, state);
      }
    };
    return Object.keys(actions).reduce<any>((res, actionName) => {
      const fn = (payload: object) => { filterAction(actions[actionName], payload); };
      res[actionName] = fn;
      return res;
    }, {});
  }, []);
  return { state, dispatch, action };
};

export const StoreContext = React.createContext<{ getState?: () => object }>({});

export const useStore = () => {
  const { getState = () => ({}) } = useContext(StoreContext);
  const store: { basic?: { powerInfo?: {}; merchantId?: string } } = getState() || {};
  return store;
};

/**
 * 返回商户id
 */
export const useMerchantId = () => {
  const store = useStore();
  const merchantId = useMemo(() => Number(get(store, ['basic', 'merchantId'], 0)), [store]);
  return merchantId;
};

/**
 *
 * @param key1 一级权限
 * @param key2 二级权限
 * @return {} 权限对象
 * @eg
 * const power = usePower('pricing','standard');
 *
 * power; // {add:1,detail:1};
 */

export const usePower = (key1: string, key2: string): { [key: string]: 0 | 1 } => {
  const store = useStore();
  const power = useMemo(() => get(store, ['basic', 'powerInfo', key1, key2], {}), [store]);
  return power;
};

/**
 *
 * @param alowArr - array  需要校验是否属于的商户数组
 * @return boolean 当前商户是否属于商户数组中
 * @eg
 *
 * const foo = useMerchantIdVerify(['系统商户','OTMS']);
 * foo; // true
 */
export const useMerchantIdVerify = (alowArr: any[]) => {
  const merchantId = useMerchantId();
  return alowArr.map(name => MERCHANT_INFO_LIST.get(name)).includes(merchantId);
};

/**
 * @param fn 函数
 * @param depen 依赖项
 * @param t 间隔
 * @eg
 * const power = useDebounce(fn, [count]);
 */

export const useDebounce = (fn: (params: any) => any, depen: Array<any>, t?: number) => {
  const time = t || 1000;
  return useCallback(
    debounce(fn, time, { leading: true, trailing: false }), [...depen]
  );
};

/**
 * @overview 传入条件判断数组 返回布尔值
 * @param { Array<{type: any; fn: () => boolean;}>} arr - 条件判断数组
 * @param {React.DependencyList} libs - 依赖
 * @return {boolean} 返回布尔值
 * @eg  const arr:MerchantShowArr = [
      {type:'OTMS',
       fn:() => {if(xxx){
 *        return true
 *            }
 *         }
 *        },
 *        {type:'DSC-运输',
 *        fn:() => {if(xxx){
 *        return true
 *            }
 *         }
 *        }]
 *      const isShow = useMerchantIdShow(arr, [tempType]);
 */

export const useMerchantIdShow = (arr: {
  type: any;
  fn: () => boolean;
}[], libs: React.DependencyList) => {
  const merchantId = useMerchantId();
  const res = useMemo(() => {
    const target = arr.find(item => MERCHANT_INFO_LIST.get(item.type) === merchantId);
    return target === undefined ? false : (target.fn() || false);
  }, [merchantId, libs]);
  return res;
};

/**
 * 计价配置的编辑和查看中是否展示流向或城市选择
 * @param secondFee 二类收费项
 * @param complexHide 是否是子计价模式
 */
export const useShowCitySelector = (secondFee: string, isComplexHide = false) => {
  const targetMerchant = useMerchantIdVerify(['TS-仓储']);
  return !targetMerchant && secondFee !== 'cascade' && !isComplexHide;
};


/**
 * 
 * 判断环境:     1小程序,2微信浏览器,3其他浏览器
 */
export const useEnv = () => {
  const [ env, setEnv ] = useState<1 | 2 | 3 | null>(null); 
  let ua = navigator.userAgent;

  useEffect(() => {
    (async function name() {
      const  res = await _getIsWxClient();
      setEnv(res);
    })()
  }, [ua]);

  return env;
}