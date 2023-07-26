import { serviceGetUserInfo } from './services';

const DEFAULT_USERINFO: Partial<IUserInfo> = {
  id: '', // '1',
  phone: '',
  uid: '',
  head: '',
  nickname: '',
  belongto: '',
  token: '',// 'a7e4c034944a91d417eea01787bbf7ab',

};

const model = {
  state: {
    isLoading: false,
    userInfo: { ...DEFAULT_USERINFO }, // 用户信息
  },
  reducers: {
    setState(state: any, partialState: any) {
      return { ...state, ...partialState };
    },
  },
  actions: (params: { dispatch: { [key: string]: any }; getState: Function }) => {
    const { dispatch: { basic }, getState } = params;
    return {
      state() {
        return getState().basic;
      },
      updateUserInfo(params: IUserInfo & { token?: string }) {
        basic.setState({ userInfo: { ...params } });
        if (params.token) {
          localStorage.setItem('token', params.token);
        }
      },
      async checkLogin() {
        basic.setState({ isLoading: true });
        try {
          const d: IUserInfo = await serviceGetUserInfo();
          if (d) {
            basic.updateUserInfo({ ...d });
          }
          basic.setState({ isLoading: false });
        } catch (e) {
          basic.setState({ isLoading: false });
        }
      },
      async checkLoginWithOutLoading() {
        try {
          const d: IUserInfo = await serviceGetUserInfo();
          if (d) {
            basic.updateUserInfo({ ...d });
          }
        } catch (e) {
        }
      },
    };
  }
};

export default model;
