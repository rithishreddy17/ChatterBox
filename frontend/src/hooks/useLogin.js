import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { login } from '../lib/api';
import toast from 'react-hot-toast';

const useLogin = () => {
  const queryClient = useQueryClient();
  const UserLogin = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
      toast.success("Logged in Successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  });
  return {isPending: useLogin.isPending, error: UserLogin.error, loginMutation: UserLogin.mutate};
}

export default useLogin;
