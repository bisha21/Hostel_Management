import { api } from '../api';
import { useMutation } from '@tanstack/react-query';
import { toastTrigger } from '../../lib/utils';
import { TLoginType } from '../../schemas/login';
import { data, useNavigate } from 'react-router';
import { TRegisterType } from '../../schemas/register';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

    const loginMutation = useMutation({
        mutationFn: (data:TLoginType) => api.post('/auth/login', data),
        onSuccess: (data) => {
            localStorage.setItem('authToken', data.data.authToken);
            toastTrigger('Login successful', undefined,'success');
            if(data.data.user_type==="admin") {
                navigate('/');
            }
            navigate('/student');
        },
        onError: () => {
            toastTrigger('Login failed: Invalid Email or password.',undefined, 'error');
        }
    }
    )
    return loginMutation
}

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: (data: TRegisterType) => api.post('auth/register', data),
    onSuccess: () => {
      toastTrigger('Registration successful', undefined, 'success');
      navigate('/');
    },
    onError: () => {
      toastTrigger('Registration failed', undefined, 'error');
    },
  });
  return registerMutation;
};
