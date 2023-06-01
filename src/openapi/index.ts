/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { Cemeteries } from './models/Cemeteries';
export type { CemeteryOut } from './models/CemeteryOut';
export type { HTTPValidationError } from './models/HTTPValidationError';
export type { Metadata } from './models/Metadata';
export type { SoldierOut } from './models/SoldierOut';
export type { Soldiers } from './models/Soldiers';
export type { ValidationError } from './models/ValidationError';

export { ApiService } from './services/ApiService';
export { CemeteriesService } from './services/CemeteriesService';
export { SoldiersService } from './services/SoldiersService';
