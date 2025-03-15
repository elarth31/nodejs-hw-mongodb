import { json, Router } from 'express';
import { validateBody } from './../middlewares/validateBody.js';
import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
    loginUserController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
    '/register',
    json(),
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

authRouter.post(
    '/login',
    json(),
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
