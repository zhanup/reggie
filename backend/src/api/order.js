import request from '@/utils/request'

// 查询列表页接口
export const getOrderDetailPage = (params) => {
  return request({
    url: '/api/order/page',
    method: 'get',
    params,
  })
}

// 查看接口
export const queryOrderDetailById = (id) => {
  return request({
    url: `/api/orderDetail/${id}`,
    method: 'get',
  })
}

// 取消，派送，完成接口
export const editOrderDetail = (params) => {
  return request({
    url: '/api/order',
    method: 'put',
    data: { ...params },
  })
}
