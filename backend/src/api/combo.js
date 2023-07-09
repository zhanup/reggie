import request from '@/utils/request'

// 查询列表数据
export const getSetmealPage = (params) => {
  return request({
    url: '/api/setmeal/page',
    method: 'get',
    params,
  })
}

// 删除数据接口
export const deleteSetmeal = (ids) => {
  return request({
    url: '/api/setmeal',
    method: 'delete',
    params: { ids },
  })
}

// 修改数据接口
export const editSetmeal = (params) => {
  return request({
    url: '/api/setmeal',
    method: 'put',
    data: { ...params },
  })
}

// 新增数据接口
export const addSetmeal = (params) => {
  return request({
    url: '/api/setmeal',
    method: 'post',
    data: { ...params },
  })
}

// 查询详情接口
export const querySetmealById = (id) => {
  return request({
    url: `/api/setmeal/${id}`,
    method: 'get',
  })
}

// 批量起售禁售
export const setmealStatusByStatus = (params) => {
  return request({
    url: `/api/setmeal/status/${params.status}`,
    method: 'post',
    params: { ids: params.ids },
  })
}
