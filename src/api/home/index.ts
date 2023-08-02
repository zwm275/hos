// 首页模块接口
import request from "@/utils/request";

import {
  HospitalResponseData,
  HospitalLevelAndRegionResponseData,
  HospitalInfo,
} from "@/api/home/type";
// 通过枚举类型管理首页接口地址
enum API {
  HOSPITAL_URL = "/hosp/hospital",
  HOSPITALLEVELANDREGION_URL = "/cmn/dict/findByDictCode",
  // 搜索框
  HOSPITALINFO_URL = "/hosp/hospital/findByHosname",
}
// 获取医院的数据
export const reqHospital = async (
  page: number,
  limit: number,
  hostype: string,
  districtCode: string
) =>
  await request.get<any, HospitalResponseData>(
    API.HOSPITAL_URL +
      `/${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
  );
// 获取医院等级或地区数据
export const reqHospitalLevelAndRegion = async (dictCode: string) =>
  await request.get<any, HospitalLevelAndRegionResponseData>(
    API.HOSPITALLEVELANDREGION_URL + `/${dictCode}`
  );
// 搜索框
export const reqHospitalInfo = async (hosName: string) =>
  await request.get<any, HospitalInfo>(API.HOSPITALINFO_URL + `/${hosName}`);
