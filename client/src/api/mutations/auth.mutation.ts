import { api } from '../api';
import { useMutation } from '@tanstack/react-query';
import { toastTrigger } from '../../lib/utils';
import { TLoginType } from '../../schemas/login';
import { useNavigate } from 'react-router';
import { TRegisterType, TVerifyEmailSchema } from '../../schemas/register';

export const useLoginMutation = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (data: TLoginType) => api.post('/auth/login', data),

    onSuccess: (data) => {
      localStorage.setItem('authToken', data.data.data.authToken);
      toastTrigger('Login successful', undefined, 'success');
      if (data.data.data.user_type === 'admin') {
        navigate('/');
      } else {
        navigate('/student');
      }
    },
    onError: () => {
      toastTrigger(
        'Login failed: Invalid Email or password.',
        undefined,
        'error'
      );
    },
  });
  return loginMutation;
};

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
export const useVerifyEmail = () => {
  const navigate = useNavigate();
  const emailVerifyMutation = useMutation({
    mutationFn: (data: TVerifyEmailSchema) =>
      api.post('auth/forget-password', data),
    onSuccess: () => {
      toastTrigger('Email verification successful', undefined, 'success');
      navigate('/verify/otp');
    },
    onError: () => {
      toastTrigger('Registration failed', undefined, 'error');
    },
  });
  return emailVerifyMutation;
};
export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const verifyOtp = useMutation({
    mutationFn: (data: TVerifyEmailSchema) => api.post('auth/verify-otp', data),
    onSuccess: () => {
      toastTrigger('OTP verification successful', undefined, 'success');
      navigate('/change-password');
    },
    onError: () => {
      toastTrigger('Registration failed', undefined, 'error');
    },
  });
  return verifyOtp;
};
export const useResetPassword = () => {
  const navigate = useNavigate();
  const reserPassword = useMutation({
    mutationFn: (data: TVerifyEmailSchema) =>
      api.post('auth/reset-password', data),
    onSuccess: () => {
      toastTrigger('Password reset successful', undefined, 'success');
      navigate('/');
    },
    onError: () => {
      toastTrigger('Reset failed', undefined, 'error');
    },
  });
  return reserPassword;
};
