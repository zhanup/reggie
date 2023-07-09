import request from '@/utils/request'

export function getMemberList(params) {
  return request({
    url: '/api/employee/page',
    method: 'get',
    params,
  })
}

// 修改---启用禁用接口
export function enableOrDisableEmployee(params) {
  return request({
    url: '/api/employee',
    method: 'put',
    data: { ...params },
  })
}

// 新增---添加员工
export function addEmployee(params) {
  return request({
    url: '/api/employee',
    method: 'post',
    data: { ...params },
  })
}

// 修改---添加员工
export function editEmployee(params) {
  return request({
    url: '/api/employee',
    method: 'put',
    data: { ...params },
  })
}

// 修改页面反查详情接口
export function queryEmployeeById(id) {
  return request({
    url: `/api/employee/${id}`,
    method: 'get',
  })
}
