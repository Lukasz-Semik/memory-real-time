import React from 'react';
import { toast, ToastOptions } from 'react-toastify';

export const notifySuccess = (
  msg: React.ReactNode,
  config: ToastOptions = {}
) =>
  toast(msg, {
    ...config,
    type: 'success',
  });

export const notifyError = (
  msg: React.ReactNode = 'Something went wrong',
  config: ToastOptions = {}
) =>
  toast(msg, {
    ...config,
    type: 'error',
  });

export const notifyWarning = (
  msg: React.ReactNode = 'Hm...',
  config: ToastOptions = {}
) =>
  toast(msg, {
    ...config,
    type: 'warning',
  });
