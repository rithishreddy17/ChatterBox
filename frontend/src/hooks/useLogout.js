import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { logout } from '../lib/api';

const useLogout = () => {
    const queryClient = useQueryClient();
  
    const {mutate, isPending, error} = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["authUser"]});
            toast.success("logged out successfully");
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    return {isPending: isPending, error: error, logoutMutation: mutate};

}

export default useLogout
