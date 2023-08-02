// 医院模块接口
import request from "@/utils/request";

// 通过枚举请求接口地址
enum API {
  // 验证码
  USERCODE_URL = "/sms/send",
  // 用户登录
  USERLOGIN_URL = "/user/login",
  // 获取微信登录参数
  USERWxLOGIN_URL = "/user/weixin/getLoginParam",
}
// 获取验证码接口;
export const reqUserCode = async (phone: string) =>
  await request.get<any>(API.USERCODE_URL + `/${phone}`);
// 用户登录
export const reqUserLogin = async (data: any) => {
  let result: any = await request.post<any>(API.USERLOGIN_URL, data);
  if (result.code) {
    return result;
  } else {
    return Promise.reject(new Error(result.message));
  }
};
// 获取微信登录参数
export const reqWxLogin = async (wxRedirectUri: string) =>
  await request.get<any>(
    API.USERWxLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`
  );
