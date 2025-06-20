"use client"

import { useQuery } from "@tanstack/react-query"
import apiService from "@/helper/apiService"

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: apiService.getAllProducts,
  })
}
