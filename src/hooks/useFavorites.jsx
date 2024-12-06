import React from 'react'
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useFavorites = () => {
    const { user } = useAuth();
    const token = localStorage.getItem('access-token');

    const { refetch, data: favorites = [] } = useQuery({
        queryKey: ['favorites', user?.email],
        queryFn: async () => {
            if (!token) return []; // If no token, return an empty array
            const res = await fetch(`https://backend-restaurant-b5d2.onrender.com/favorites?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return res.json();
        },
        enabled: !!token,
    });
    return [favorites, refetch];
}

export default useFavorites