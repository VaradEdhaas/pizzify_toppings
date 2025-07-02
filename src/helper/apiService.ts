import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./constantProperties";
import { useContext } from "react";
import AuthContext from "@/components/context/AuthContext";

interface User {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  zipcode?: string;
  role: string;
}

interface CreateUserResponse {
  message: string;
  token: string;
  user: {
    id: string;
    fullname: string;
    email: string;
    role: string;
  };
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  category?: string;
  rating?: number;
  review?: number;
}

interface Cart {
  userId: string;
  products: {
    productId: Product;
    quantity: number;
  }[];
}
interface AddToCartPayload {
  userId: string;
  productId: string;
  quantity: number;
}

interface RazorpayOrderResponse {
  success: boolean;
  order: {
    id: string;
    amount: number;
    currency: string;
  };
}

interface PaymentVerificationPayload {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface OrderCreationPayload {
  amount: number;
  paymentId: string;
  userId: string;
  products: {
    productId: Product;
    quantity: number;
  }[];
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
interface Order {
  _id: string;
  user: string;
  items: {
    product: Product;
    quantity: number;
    priceAtPurchase: number;
    name: string;
    image: string;
  }[];
  totalAmount: number;
  paymentId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentStatus: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("currentUser");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    return currentUser?.token || null;
  }
  return null;
}

const apiService = {
  // ==================== User APIs ====================

  getAllUsers: async (): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await axios.get(
      `${BASE_URL}/api/getAllUsers`,
      { withCredentials: true }
    );
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response: AxiosResponse<User> = await axios.get(
      `${BASE_URL}/api/getuserById/${id}`
    );
    return response.data;
  },

  createUser: async (userData: Partial<User>): Promise<CreateUserResponse> => {
    const response: AxiosResponse<CreateUserResponse> = await axios.post(
      `${BASE_URL}/api/createUser`,
      userData
    );
    return response.data;
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const token = getToken();
    const response: AxiosResponse<User> = await axios.put(
      `${BASE_URL}/api/updateUser/${id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    const token = getToken();
    const response: AxiosResponse<{ message: string }> = await axios.delete(
      `${BASE_URL}/api/deleteUser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  loginUser: async (userData: Partial<User>): Promise<CreateUserResponse> => {
    const response: AxiosResponse<CreateUserResponse> = await axios.post(
      `${BASE_URL}/api/login`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  },

  logoutUser: async (): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await axios.post(
      `${BASE_URL}/api/logout`,
      {},
      { withCredentials: true }
    );
    localStorage.removeItem('currentUser')
    return response.data;
  },

  googleSignIn: async (googleToken: string): Promise<User> => {
    const response: AxiosResponse<User> = await axios.post(
      `${BASE_URL}/api/google-login`,
      { token: googleToken },
      { withCredentials: true }
    );
    return response.data;
  },

  facebookLogin: async (facebookData: object): Promise<User> => {
    const response: AxiosResponse<User> = await axios.post(
      `${BASE_URL}/api/facebook-login`,
      facebookData,
      { withCredentials: true }
    );
    return response.data;
  },

  // ==================== Product APIs ====================

  getAllProducts: async (): Promise<Product[]> => {
    const response: AxiosResponse<Product[]> = await axios.get(
      `${BASE_URL}/api/getAllProducts`,
      { withCredentials: true }
    );
    return response.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response: AxiosResponse<Product> = await axios.get(
      `${BASE_URL}/api/getProductById/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },

  createProduct: async (formData: FormData): Promise<Product> => {
    const response: AxiosResponse<Product> = await axios.post(
      `${BASE_URL}/api/createProduct`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  updateProduct: async (id: string, formData: FormData): Promise<Product> => {
    const response: AxiosResponse<Product> = await axios.put(
      `${BASE_URL}/api/updateProduct/${id}`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  deleteProduct: async (id: string): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await axios.delete(
      `${BASE_URL}/api/deleteProduct/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },

  // ==================== Cart APIs ====================

  addToCart: async ({ userId, productId, quantity }: AddToCartPayload): Promise<Cart> => {
    const response: AxiosResponse<Cart> = await axios.post(
      `${BASE_URL}/api/addToCart/${userId}`,
      { productId, quantity },
      { withCredentials: true }
    );
    return response.data;
  },

  getCart: async (userId: string): Promise<Cart> => {
    const response: AxiosResponse<Cart> = await axios.get(
      `${BASE_URL}/api/getCart/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  },

  removeFromCart: async (userId: string, productId: string): Promise<Cart> => {
    const response: AxiosResponse<Cart> = await axios.delete(
      `${BASE_URL}/api/removeFromCart/${userId}/${productId}`,
      { withCredentials: true }
    );
    return response.data;
  },

  clearCart: async (userId: string): Promise<{ success: boolean; message: string }> => {
    const response: AxiosResponse<{ success: boolean; message: string }> = await axios.delete(
      `${BASE_URL}/api/clearCart/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  },

  // ==================== Payment APIs ====================

  createRazorpayOrder: async (amount: number): Promise<RazorpayOrderResponse> => {
    const token = getToken();
    try {
      const response = await axiosInstance.post(
        "/api/create-order",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      throw error;
    }
  },

  verifyPayment: async (payload: PaymentVerificationPayload): Promise<{ success: boolean }> => {
    const token = getToken();
    const response: AxiosResponse<{ success: boolean }> = await axios.post(
      `${BASE_URL}/api/verify-payment`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );
    return response.data;
  },

  // ==================== Order APIs ====================

  createOrder: async (orderData: OrderCreationPayload): Promise<Order> => {
    const token = getToken();
    const response: AxiosResponse<Order> = await axios.post(
      `${BASE_URL}/api/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );
    return response.data;
  },

  getAllOrders: async (): Promise<Order[]> => {
    const token = getToken();
    const response: AxiosResponse<Order[]> = await axios.get(
      `${BASE_URL}/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );
    return response.data;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const token = getToken();
    const response: AxiosResponse<Order> = await axios.get(
      `${BASE_URL}/api/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );
    return response.data;
  },

  getOrdersByUserId: async (userId: string): Promise<Order[]> => {
    const token = getToken();
    const response: AxiosResponse<Order[]> = await axios.get(
      `${BASE_URL}/api/orders/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );
    return response.data;
  },

  updateOrderStatus: async (
    orderId: string,
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  ): Promise<{ message: string }> => {
    const token = getToken();
    const response: AxiosResponse<{ message: string }> = await axios.put(
      `${BASE_URL}/api/orders/${orderId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );
    return response.data;
  },

  cancelOrder: async (orderId: string): Promise<{ message: string }> => {
    const token = getToken();
    const response: AxiosResponse<{ message: string }> = await axios.put(
      `${BASE_URL}/api/orders/${orderId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );
    return response.data;
  },

  requestRefund: async (
    orderId: string,
    reason: string
  ): Promise<{ message: string }> => {
    const token = getToken();
    const response: AxiosResponse<{ message: string }> = await axios.put(
      `${BASE_URL}/api/orders/${orderId}/refund`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );
    return response.data;
  },

};

export default apiService;
