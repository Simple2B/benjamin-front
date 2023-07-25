/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { Cemeteries } from './models/Cemeteries';
export type { CemeteryOut } from './models/CemeteryOut';
export type { Grave } from './models/Grave';
export type { HTTPValidationError } from './models/HTTPValidationError';
export type { Metadata } from './models/Metadata';
export type { Rank } from './models/Rank';
export type { SoldierCard } from './models/SoldierCard';
export type { SoldierCardWithPhoto } from './models/SoldierCardWithPhoto';
export type { SoldierFilters } from './models/SoldierFilters';
export type { SoldierMessageCreate } from './models/SoldierMessageCreate';
export type { SoldierMessageOut } from './models/SoldierMessageOut';
export { SoldierMessageType } from './models/SoldierMessageType';
export type { SoldierOut } from './models/SoldierOut';
export type { Soldiers } from './models/Soldiers';
export type { SoldiersFiltered } from './models/SoldiersFiltered';
export type { SoldierStoneCreate } from './models/SoldierStoneCreate';
export type { SoldierStoneOut } from './models/SoldierStoneOut';
export type { ValidationError } from './models/ValidationError';

export { ApiService } from './services/ApiService';
export { CemeteriesService } from './services/CemeteriesService';
export { MessagesService } from './services/MessagesService';
export { SoldiersService } from './services/SoldiersService';
export { StonesService } from './services/StonesService';

import { OpenAPI } from './core/OpenAPI';

OpenAPI.BASE = process.env.BACKEND_URL || '';
