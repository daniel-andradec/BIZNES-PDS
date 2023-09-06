import { PayloadParams } from '../../src/domains/users/types/PayloadParams'; 

declare global {
    namespace Express {
        interface Request{
            user?: PayloadParams
        }
    }
}