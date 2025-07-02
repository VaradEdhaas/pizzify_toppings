import apiService from '@/helper/apiService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface AddToCartPayload {
    userId: string;
    productId: string;
    quantity: number;
}

export function useCart(userId: string) {
    const queryClient = useQueryClient();

    const { data: cart, isLoading } = useQuery({
        queryKey: ['cart', userId],
        queryFn: () => apiService.getCart(userId),
        enabled: !!userId,
    });

    const addMutation = useMutation({
        mutationFn: ({ userId, productId, quantity }: AddToCartPayload) =>
            apiService.addToCart({ userId, productId, quantity }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] });
            toast.success('Product added to cart!');
        },
    });

    const removeMutation = useMutation({
        mutationFn: (productId: string) => apiService.removeFromCart(userId, productId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart', userId] }),
    });

    const clearCartMutation = useMutation({
        mutationFn: () => apiService.clearCart(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] });
            toast.success('Cart cleared!');
        },
        onError: () => {
            toast.error('Failed to clear cart.');
        },
    });

    return {
        cart,
        isLoading,
        addToCart: addMutation.mutate,
        removeFromCart: removeMutation.mutate,
        clearCartMutation: clearCartMutation.mutate
    };
}
