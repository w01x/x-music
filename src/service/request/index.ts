import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig } from './type'

class HYRequest {
  instance: AxiosInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // 给 instance 每个实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    // 针对特定的 HYRequest 实例，添加拦截器
    this.instance.interceptors.request.use(
      config.interceptor?.requestSuccessFn as undefined,
      config.interceptor?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptor?.responseSuccessFn,
      config.interceptor?.responseFailureFn
    )
  }
  request<T = any>(config: HYRequestConfig<T>) {
    // 单词请求成功的拦截处理
    if (config.interceptor?.requestSuccessFn) {
      config = config.interceptor?.requestSuccessFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptor?.responseSuccessFn) {
            res = config.interceptor.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
