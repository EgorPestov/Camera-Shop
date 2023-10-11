import { createAction } from '@reduxjs/toolkit';
import { AppRouteType } from '../const';

export const redirectToRoute = createAction('redirectToRoute', (route: AppRouteType | string) => ({payload: route}));
