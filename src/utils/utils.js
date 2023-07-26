import { Toast } from 'antd-mobile';

/* eslint-disable */
/**
 * [设置cookie]
 * @param {[string]} cookie key
 * @param {[string]} cookie value
 * @author lichun
 */

import qs from 'qs';
import wx from 'weixin-js-sdk'

// 获取路由参数
export const getParamsFromUrl = () => {
  const str = window.location.href.split('?')[1] || '';
  return qs.parse(str);
};

export function setCookie(name, value) {
  const now = new Date();
  now.setDate(now.getDate() + 1000 * 60 * 60 * 24 * 30);
  // tslint:disable-next-line: no-console
  console.log('在设置cookie时新增了SameSite=Lax;在某些情况下可能有限制，关注');
  const str = `${name}=${value};expires=${now.toUTCString()};path=/;SameSite=Lax;`;
  document.cookie = str;
}

/**
 * [得到cookie]
 * @param {[string]} cookie key
 * @returns {[string]} value
 * @author lichun
 */
export function getCookie(name) {
  let start;
  let end;

  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(`${name}=`);

    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
}

// customer-project 数据处理 值为code
export const formatAllCustomerProjectInfo = (data) => {
  const allCustomers = data && data.length > 0 ? data : [];
  const entityList = allCustomers.map((item) => ({
    value: item.customer_code,
    label: `(${item.customer_code})${item.customer_name}`,
    children: item.project_list.map((proj) => ({
      value: proj.project_code,
      label: `(${proj.project_code})${proj.project_name}`,
    })),
  }));
  return [{ value: '', label: '全部' }].concat(entityList);
};
// customer-project 数据处理 值为code in ame
export const formatAllCustomerProjectInfo_all = (data) => {
  const allCustomers = data && data.length > 0 ? data : [];
  const entityList = allCustomers.map((item) => {
    const { customer_code, customer_id, customer_name } = item;
    const lv1_val = {
      customer_code,
      customer_id,
      customer_name,
    };
    return {
      value: JSON.stringify(lv1_val),
      label: `(${item.customer_code})${item.customer_name}`,
      children: item.project_list.map((proj) => {
        const { project_code, project_id, project_name } = proj;
        const lv2_val = {
          project_code,
          project_id,
          project_name,
        };
        return {
          value: JSON.stringify(lv2_val),
          label: `(${proj.project_code})${proj.project_name}`,
        };
      }),
    };
  });
  return entityList;
};

// 没有全部
export const formatCustomerProjectInfo = (data) => {
  const allCustomers = data && data.length > 0 ? data : [];
  const entityList = allCustomers.map((item) => ({
    value: item.customer_code,
    label: `(${item.customer_code})${item.customer_name}`,
    children: item.project_list.map((proj) => ({
      value: proj.project_code,
      label: `(${proj.project_code})${proj.project_name}`,
    })),
  }));
  return entityList;
};


// sleep
export const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * Map数据个数转换成数组 [{label:'xxx'},{id:'xx'}]
 * @returns [{label:'xxx'},{id:'xx'}]
 */
export const formatMapToLabel = (obj) => {
  if (obj instanceof Map) {
    return [...obj.entries()].map(([value, label]) => ({
      value,
      label,
    }));
  }
  return [];
};

/**
 * 级联Cascader 忽略大小写检索
 */
export const filter = (inputValue, path) => {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
};


export function uniqueArray (arr) {
  return Array.from(new Set(arr))
}

/**
  * 没有数据的情况返回'-'
  */
 export const renderNull = text => ((text === null || !text) && text !== 0 ? '-' : text);

 /**
   * 1.过滤columns中disable为true的成员
   * 2.配置默认render属性，没有数据的情况返回'-'
   */
 export const filterColumns = columns => (columns.length > 0 ? columns.map(item => {
   const { render } = item;
   item.render = render || renderNull;
   return item;
 }).filter(item => !item.disabled)
   : []);
 
 /**
   * 计算columns的总宽度 没有设置默认100
   */
 export const mathScrollX = columns => columns.map(item => item.width || 100).reduce((sum, num) => sum + num, 0);

 
 export const TODO = () => {
  Toast.show({
    content:'敬请期待'
  })
 }

/**
 * 
 * @param {number} second  秒
 * @returns  string  hh:mm:ss
 */
 export const CountDown = (second) =>{
   if(second<=0){
     return '';
   }
  if (second < 60) {
      if (second < 10) {
          return "00:00:0" + second;
      } else {
          return "00:00:" + second;
      }
  } else {
      var min_total = Math.floor(second / 60);	// 分钟
      var sec = Math.floor(second % 60);	// 余秒
      if (min_total < 60) {
          if (min_total < 10) {
              if (sec < 10) {
                  return "00:0" + min_total + ":0" + sec;
              } else {
                  return "00:0" + min_total + ":" + sec;
              }
          } else {
              if (sec < 10) {
                  return "00:" + min_total + ":0" + sec;
              } else {
                  return "00:" + min_total + ":" + sec;
              }
          }
      } else {
          var hour_total = Math.floor(min_total / 60);	// 小时数
          if (hour_total < 10) {
              hour_total = "0" + hour_total;
          }
          var min = Math.floor(min_total % 60);	// 余分钟
          if (min < 10) {
              min = "0" + min;
          }
          if (sec < 10) {
              sec = "0" + sec;
          }
          return hour_total + ":" + min + ":" + sec;
      }
  }
}



//判断环境:     1小程序,2微信浏览器,3其他浏览器
/**
 * 
//  * @returns {1 | 2 | 3 } //   1小程序,2微信浏览器,3其他浏览器
 * @description 
 * @eg  
  _getIsWxClient ().then(res=>{
  localStorage.envType =res
  console.log(res)
//res:1,2,3
})
 */
export const  _getIsWxClient = () =>  {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let type = '';
    let ua = navigator.userAgent;
    if (ua && ua.indexOf && ua.indexOf('MicroMessenger') !== -1) {
      wx.miniProgram.getEnv((res) => {
        if (res.miniprogram) {
          type = 1;
        } else {
          type = 2;
        }
        resolve(type);
      })
    } else {
      type = 3
      resolve(type);
    }    
  });
  return p;

}


export const toPercent = (point)  => {
  var percent = Number(point*100).toFixed(1);
  percent+='%';
  return percent;
}