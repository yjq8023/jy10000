import request from '@/common/request';

export const prefix = '';

export const getCityList = () => {
  const url = `${prefix}/cities/list`;
  return request.get(url).then((res: any) => {
    const obj: any = {};
    res.forEach((item: any) => {
      obj[item.id] = item.name;
    });
    return obj;
  });
};
// 学历
export const getSemesterList = () => {
  const url = `${prefix}/specialty/query`;
  return request.get(url).then((res: any) => {
    const obj: any = {};
    res.forEach((item: any) => {
      obj[item.id] = item.specialty_name;
    });
    return obj;
  });
};
// 科目
export const getSubjectList = () => {
  const url = `${prefix}/subject/query`;
  return request.get(url).then((res: any) => {
    const obj: any = {};
    res.forEach((item: any) => {
      obj[item.subject_id] = item.subject_name;
    });
    return obj;
  });
};
// 学校
export const getSchoolList = () => {
  const url = `${prefix}/university/query`;
  return request.get(url).then((res: any) => {
    const obj: any = {};
    res.forEach((item: any) => {
      obj[item.subject_id] = item.subject_name;
    });
    return obj;
  });
};
// 国籍
export const getNationalityList = () => {
  const url = `${prefix}/nationality/query`;
  return request.get(url).then((res: any) => {
    const obj: any = {};
    res.forEach((item: any) => {
      obj[item.subject_id] = item.subject_name;
    });
    return obj;
  });
};
export default { prefix };
