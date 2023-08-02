// 医院模块接口
import request from "@/utils/request";

// 通过枚举请求接口地址
enum API {
  // 获取订单号
  SUBMITORDER_URL = "/order/orderInfo/auth/submitOrder",
  ORDER_URL = "/order/orderInfo/auth/getOrderInfo",
  CANCELORDER_URL = "/order/orderInfo/auth/cancelOrder",
  WXQRCODE_URL = "/order/weixin/createNative",
  QUERYPAYSTATUS_URL = "/order/weixin/queryPayStatus",
  USERINFO_URL = "/user/auth/getUserInfo",
  CERTIFICATESTYPE_URL = "/cmn/dict/findByDictCode/CertificatesType",
  USERAUAH_URL = "/user/auth/userAuah",
  USERORDER_URL = "/order/orderInfo/auth",
  ALLUSER_URL = "/user/patient/auth/findAll",
  ALLSTATUS_URL = "/order/orderInfo/auth/getStatusList",
  USER_URL = "/user/patient/auth/get",
  CITY_URL = "/cmn/dict/findByParentId",
  ADDUSER_URL = "/user/patient/auth/save",
  UPDATEUSER_URL = "/user/patient/auth/update",
  DELETEUSER_URL = "/user/patient/auth/remove",
}
// 获取订单号
export const reqSubmitOrder = async (
  hoscode: string,
  scheduleId: string,
  patientId: number
) =>
  await request.post<any>(
    API.SUBMITORDER_URL + `/${hoscode}/${scheduleId}/${patientId}`
  );
// 获取订单
export const reqOrder = async (id: number) =>
  await request.get<any>(API.ORDER_URL + `/${id}`);
// 取消订单
export const reqCancelOrder = async (id: number) =>
  await request.get<any>(API.CANCELORDER_URL + `/${id}`);
// 获取微信支付二维码
export const reqQRCode = async (id: number) =>
  await request.get<any>(API.WXQRCODE_URL + `/${id}`);
// 查询支付状态
export const reqQueryPayStatus = async (id: number) =>
  await request.get<any>(API.QUERYPAYSTATUS_URL + `/${id}`);
// 获取用户信息
export const reqUserInfo = async () => await request.get<any>(API.USERINFO_URL);
// 获取身份证信息
export const reqCertificatesType = async () =>
  await request.get<any>(API.CERTIFICATESTYPE_URL);
// 用户认证
export const reqUserAuah = async (userAuthVo: any) =>
  await request.post<any>(API.USERAUAH_URL, userAuthVo);
// 获取用户订单
export const reqUserOrder = async (
  page: number,
  limit: number,
  patientId: string,
  orderStatus: string
) =>
  await request.get<any>(
    API.USERORDER_URL +
      `/${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`
  );
// 获取所有就诊人
export const reqAllUser = async () => await request.get<any>(API.ALLUSER_URL);
// 获取所有订单状态
export const reqAllStatus = async () =>
  await request.get<any>(API.ALLSTATUS_URL);
// 获取指定用户信息
export const reqUser = async (id: number) =>
  await request.get<any>(API.USER_URL + `/${id}`);
// 获取城市信息
export const reqCity = (parentId: string) =>
  request.get<any>(API.CITY_URL + `/${parentId}`);
// 新增就诊人
export const reqAddUser = (patient: any) =>
  request.post<any>(API.ADDUSER_URL, patient);
// 修改就诊人
export const reqUpdateUser = (patient: any) =>
  request.put<any>(API.UPDATEUSER_URL, patient);
// 删除就诊人
export const reqDeleteUser = async (id: number) =>
  await request.delete<any>(API.DELETEUSER_URL + `/${id}`);
