import { Employee } from './Employee.model';
/* eslint-disable @typescript-eslint/naming-convention */
export interface Department {
    id?: number;
    status?: boolean;
    name?: string;
    description?: string;
    phone?: string;
    id_enterprise?: number;
    employees?: Employee[];
}
