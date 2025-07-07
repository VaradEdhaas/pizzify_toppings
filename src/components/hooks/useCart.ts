import apiService from '@/helper/apiService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useCart(userId: string) {
    const queryClient = useQueryClient();

    const { data: cart, isLoading } = useQuery({
        queryKey: ['cart', userId],
        queryFn: () => apiService.getCart(userId),
        enabled: !!userId,
    });

    const addMutation = useMutation({
        mutationFn: ({ userId, productId, quantity }: { userId: string; productId: string; quantity: number; silent?: boolean; }) =>
            apiService.addToCart({ userId, productId, quantity }),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] });
            if (!variables?.silent) {
                toast.success("Product added to cart");
            }
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

    const incrementMutation = useMutation({
        mutationFn: (productId: string) => apiService.incrementCartItem(userId, productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] });
        },
        onError: () => {
            toast.error("Failed to increment quantity.");
        }
    });

    const decrementMutation = useMutation({
        mutationFn: (productId: string) => apiService.decrementCartItem(userId, productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] });
        },
        onError: () => {
            toast.error("Failed to decrement quantity.");
        }
    });

    return {
        cart,
        isLoading,
        addToCart: addMutation.mutate,
        removeFromCart: removeMutation.mutate,
        clearCartMutation: clearCartMutation.mutate,
        incrementQuantity: incrementMutation.mutate,
        decrementQuantity: decrementMutation.mutate,
    };
}
