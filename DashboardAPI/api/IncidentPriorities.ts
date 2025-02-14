import Express, {
    ExpressRequest,
    ExpressResponse,
    ExpressRouter,
} from 'CommonServer/utils/Express';
const router: ExpressRouter = Express.getRouter();
const getUser: $TSFixMe = require('../middlewares/user').getUser;
import BadDataException from 'Common/Types/Exception/BadDataException';
import { isAuthorized } from '../middlewares/authorization';
import {
    sendErrorResponse,
    sendListResponse,
    sendItemResponse,
} from 'CommonServer/Utils/response';
import Exception from 'Common/Types/Exception/Exception';
import IncidentPrioritiesService from '../services/incidentPrioritiesService';

router.get(
    '/:projectId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        const { projectId }: $TSFixMe = req.params;
        const { skip = 0, limit = 10 }: $TSFixMe = req.query;
        if (!projectId) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Project Id must be present')
            );
        }
        try {
            const selectIncPriority: $TSFixMe =
                'projectId name color createdAt deletedAt deleted deletedByUser';
            const [IncidentPriorities, count]: $TSFixMe = await Promise.all([
                IncidentPrioritiesService.findBy(
                    { query: { projectId }, select: selectIncPriority },

                    limit,
                    skip
                ),
                IncidentPrioritiesService.countBy({ projectId }),
            ]);
            return sendListResponse(req, res, IncidentPriorities, count);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

router.post(
    '/:projectId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        const { projectId }: $TSFixMe = req.params;
        const { name, color }: $TSFixMe = req.body;
        if (!projectId) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Project Id must be present.')
            );
        }
        if (!name) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Name must be present')
            );
        }
        if (!color) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Color must be present')
            );
        }

        try {
            const IncidentPriorities: $TSFixMe =
                await IncidentPrioritiesService.create({
                    projectId,
                    name,
                    color,
                });
            return sendItemResponse(req, res, IncidentPriorities);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

router.put(
    '/:projectId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        const { projectId }: $TSFixMe = req.params;
        const { _id, name, color }: $TSFixMe = req.body;

        if (!projectId) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Project Id must be present.')
            );
        }

        if (!_id) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Id must be present.')
            );
        }

        if (!name) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Name must be present')
            );
        }

        if (!color) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Color must be present')
            );
        }

        try {
            const IncidentPriorities: $TSFixMe =
                await IncidentPrioritiesService.updateOne(
                    { projectId, _id },
                    { name, color }
                );
            return sendItemResponse(req, res, IncidentPriorities);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

router.delete(
    '/:projectId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        const { projectId }: $TSFixMe = req.params;
        const { _id }: $TSFixMe = req.body;

        if (!projectId) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Project Id must be present.')
            );
        }

        if (!_id) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Id must be present.')
            );
        }

        try {
            const IncidentPriority: $TSFixMe =
                await IncidentPrioritiesService.deleteBy({
                    projectId,
                    _id,
                });
            if (IncidentPriority) {
                return sendItemResponse(req, res, IncidentPriority);
            }
            return sendErrorResponse(req, res, {
                message: 'Incident priority not found',
            });
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);
export default router;
