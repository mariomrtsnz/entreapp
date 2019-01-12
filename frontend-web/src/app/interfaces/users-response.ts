
import { UserResponse } from './user-response';

export interface UsersResponse {
    count: number;
    rows: UserResponse[];
}
