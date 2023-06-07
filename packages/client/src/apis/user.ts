import request from "@/service/index_defa";

export function login(params: any) {
  return request.post<{ token: string }>("/login", params);
}

// 获取路由表
export function getRoutesApi() {
  return request.get("/menu");
}
