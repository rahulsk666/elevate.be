import { jwtPayload } from 'src/types/jwtPayload.types';

export type RequestWithUser = Request & { user?: jwtPayload };
