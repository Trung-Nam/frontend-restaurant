import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            if (!token) return []; // If no token, return an empty array
            const res = await fetch(`https://backend-restaurant-b5d2.onrender.com/carts?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return res.json();
        },
        enabled: !!token,
    });

    return [cart, refetch];
};

export default useCart;
