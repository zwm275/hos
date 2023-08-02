// 医院模块接口
import request from "@/utils/request";

import {
  HospitalDetail,
  DeparmentResponseData,
  HospitalWordData,
  DoctorResponseData,
} from "./type";
import { LocationQueryValue } from "vue-router";
// 通过枚举请求接口地址
enum API {
  HOSPITALDETAIL_URL = "/hosp/hospital",
  HOSPITALDEPARTMENT_URL = "/hosp/hospital/department",
  HOSPITALWORK_URL = "/hosp/hospital/auth/getBookingScheduleRule",
  HOSPITALDOCTOR_URL = "/hosp/hospital/auth/findScheduleList",
  GETUSER_URL = "/user/patient/auth/findAll",
  HOSPITALDOCTORINFO_URL = "/hosp/hospital/getSchedule",
}
// 获取医院详情接口;
export const reqHospitalDetail = async (
  hoscode: LocationQueryValue[] | LocationQueryValue
) =>
  await request.get<any, HospitalDetail>(
    API.HOSPITALDETAIL_URL + `/${hoscode}`
  );
// 获取医院科室
export const reqHospitalDepartment = async (
  hoscode: LocationQueryValue[] | LocationQueryValue
) =>
  await request.get<any, DeparmentResponseData>(
    API.HOSPITALDEPARTMENT_URL + `/${hoscode}`
  );
// 获取医院科室预约挂号数据
export const reqHospitalWork = async (
  page: number,
  limit: number,
  hoscode: string,
  depcode: string
) =>
  await request.get<any, HospitalWordData>(
    API.HOSPITALWORK_URL + `/${page}/${limit}/${hoscode}/${depcode}`
  );
// 获取科室医生排班数据
export const reqHospitalDoctor = async (
  hoscode: string,
  depcode: string,
  workDate: string
) =>
  await request.get<any, DoctorResponseData>(
    API.HOSPITALDOCTOR_URL + `/${hoscode}/${depcode}/${workDate}`
  );
// 获取一个账号下就诊人数据
export const reqGetUser = async () => await request.get<any>(API.GETUSER_URL);
// 获取医生的详细信息
export const reqDoctorInfo = async (scheduleId: string) =>
  await request.get<any>(API.HOSPITALDOCTORINFO_URL + `/${scheduleId}`);
