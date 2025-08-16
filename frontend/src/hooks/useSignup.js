import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { signup } from '../lib/api';

const useSignup = () => {
  const queryClient = useQueryClient();
  
    const {mutate, isPending, error} = useMutation({
      mutationFn: signup,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["authUser"]})
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    });

    return {isPending: isPending, error: error, signupMutation: mutate};
}

export default useSignup
