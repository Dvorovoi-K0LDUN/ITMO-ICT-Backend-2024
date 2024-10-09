import { User } from '../../../../app/src/models/user.ts'

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                isAdmin: boolean;
            }
        }
    }
}
