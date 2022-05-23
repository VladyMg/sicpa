/* eslint-disable @typescript-eslint/naming-convention */
import { Department } from './Department.model';

export interface Employee {
    id?: number;
    status?: boolean;
    age?: number;
    mail?: string;
    name?: string;
    surnam?: string;
    position?: string;
    user?: string;
    departments?: Department[];
}
