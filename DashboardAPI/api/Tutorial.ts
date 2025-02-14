import Express, {
    ExpressRequest,
    ExpressResponse,
    ExpressRouter,
} from 'CommonServer/utils/Express';
const router: ExpressRouter = Express.getRouter();

import UserService from '../services/userService';

const getUser: $TSFixMe = require('../middlewares/user').getUser;
import {
    sendErrorResponse,
    sendItemResponse,
} from 'CommonServer/Utils/response';
import Exception from 'Common/Types/Exception/Exception';

router.get('/', getUser, async (req: ExpressRequest, res: ExpressResponse) => {
    try {
        const userId: $TSFixMe = req.user ? req.user.id : null;
        const user: $TSFixMe = await UserService.findOneBy({
            query: { _id: userId },
            select: '_id tutorial',
        });
        const tutorialObj: $TSFixMe = {
            _id: user._id,
            data: { ...user.tutorial },
        };

        return sendItemResponse(req, res, tutorialObj);
    } catch (error) {
        return sendErrorResponse(req, res, error as Exception);
    }
});

router.put('/', getUser, async (req: ExpressRequest, res: ExpressResponse) => {
    try {
        const userId: $TSFixMe = req.user ? req.user.id : null;
        let user: $TSFixMe = await UserService.findOneBy({
            query: { _id: userId },
            select: 'tutorial _id',
        });
        // Validate that project ID is passed
        const projectId: $TSFixMe = req.body.projectId;
        if (!projectId) {
            return sendErrorResponse(req, res, {
                code: 400,
                message: "Project ID can't be null",
            });
        }
        user = await UserService.closeTutorialBy(
            { _id: userId },
            req.body.type,
            user.tutorial,
            projectId // Project ID is always needed
        );

        const tutorialObj: $TSFixMe = {
            _id: user._id,
            data: { ...user.tutorial },
        };

        return sendItemResponse(req, res, tutorialObj);
    } catch (error) {
        return sendErrorResponse(req, res, error as Exception);
    }
});

export default router;
