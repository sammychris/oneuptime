import Express, {
    ExpressRequest,
    ExpressResponse,
    ExpressRouter,
} from 'CommonServer/utils/Express';
const getUser: $TSFixMe = require('../middlewares/user').getUser;

import { isAuthorized } from '../middlewares/authorization';
import {
    sendErrorResponse,
    sendItemResponse,
    sendListResponse,
} from 'CommonServer/Utils/response';
import Exception from 'Common/Types/Exception/Exception';

import IncomingRequestService from '../services/incomingRequestService';

const router: ExpressRouter = Express.getRouter();

router.get(
    '/:projectId/all-incoming-request',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const { projectId }: $TSFixMe = req.params;
            const { limit, skip }: $TSFixMe = req.query;
            const select: $TSFixMe =
                'name projectId monitors isDefault selectAllMonitors createIncident acknowledgeIncident resolveIncident updateIncidentNote updateInternalNote noteContent incidentState url enabled incidentTitle incidentType incidentPriority incidentDescription customFields filterMatch filters createSeparateIncident post_statuspage deleted';

            const populate: $TSFixMe = [
                {
                    path: 'monitors.monitorId',
                    select: 'name customFields componentId deleted',
                    populate: [{ path: 'componentId', select: 'name' }],
                },
                { path: 'projectId', select: 'name' },
            ];
            const [allIncomingRequest, count]: $TSFixMe = await Promise.all([
                IncomingRequestService.findBy({
                    query: {
                        projectId,
                    },
                    limit,
                    skip,
                    select,
                    populate,
                }),
                IncomingRequestService.countBy({
                    projectId,
                }),
            ]);

            return sendListResponse(req, res, allIncomingRequest, count);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

router.post(
    '/:projectId/create-request-url',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const { projectId }: $TSFixMe = req.params;
            const data: $TSFixMe = req.body;

            if (!data.name || !data.name.trim()) {
                const error: $TSFixMe = new Error(
                    'Please specify a name for the incoming request'
                );

                error.code = 400;
                throw error;
            }
            const select: $TSFixMe =
                'name projectId monitors isDefault selectAllMonitors createIncident acknowledgeIncident resolveIncident updateIncidentNote updateInternalNote noteContent incidentState url enabled incidentTitle incidentType incidentPriority incidentDescription customFields filterMatch filters createSeparateIncident post_statuspage deleted';

            const populate: $TSFixMe = [
                {
                    path: 'monitors.monitorId',
                    select: 'name customFields componentId deleted',
                    populate: [{ path: 'componentId', select: 'name' }],
                },
                { path: 'projectId', select: 'name' },
            ];
            let incomingRequest: $TSFixMe =
                await IncomingRequestService.findOneBy({
                    query: { name: data.name, projectId },
                    select,
                    populate,
                });
            if (incomingRequest) {
                const error: $TSFixMe = new Error(
                    'Incoming request with this name already exist'
                );

                error.code = 400;
                throw error;
            }

            data.projectId = projectId;
            incomingRequest = await IncomingRequestService.create(data);
            // RequestUrl contains the whole incoming request object with the updated url
            const requestUrl: $TSFixMe =
                await IncomingRequestService.getRequestUrl(
                    projectId,
                    incomingRequest._id
                );

            return sendItemResponse(req, res, requestUrl);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

router.put(
    '/:projectId/update/:requestId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const { projectId, requestId }: $TSFixMe = req.params;
            const data: $TSFixMe = req.body;

            if (!data.name || !data.name.trim()) {
                const error: $TSFixMe = new Error(
                    'Please specify a name for the incoming request'
                );

                error.code = 400;
                throw error;
            }
            const select: $TSFixMe =
                'name projectId monitors isDefault selectAllMonitors createIncident acknowledgeIncident resolveIncident updateIncidentNote updateInternalNote noteContent incidentState url enabled incidentTitle incidentType incidentPriority incidentDescription customFields filterMatch filters createSeparateIncident post_statuspage deleted';

            const populate: $TSFixMe = [
                {
                    path: 'monitors.monitorId',
                    select: 'name customFields componentId deleted',
                    populate: [{ path: 'componentId', select: 'name' }],
                },
                { path: 'projectId', select: 'name' },
            ];

            let incomingRequest: $TSFixMe =
                await IncomingRequestService.findOneBy({
                    query: { name: data.name, projectId },
                    select,
                    populate,
                });
            if (
                incomingRequest &&
                String(incomingRequest._id) !== String(requestId)
            ) {
                const error: $TSFixMe = new Error(
                    'Incoming request with this name already exist'
                );

                error.code = 400;
                throw error;
            }

            incomingRequest = await IncomingRequestService.updateOneBy(
                { requestId, projectId },
                data
            );
            return sendItemResponse(req, res, incomingRequest);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

router.delete(
    '/:projectId/remove/:requestId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const { projectId, requestId }: $TSFixMe = req.params;

            const incomingRequest: $TSFixMe =
                await IncomingRequestService.deleteBy({
                    _id: requestId,
                    projectId,
                });
            return sendItemResponse(req, res, incomingRequest);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

// Process incoming http request from post request
router.post(
    '/:projectId/request/:requestId',
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            // Request object for use in variables
            const request: $TSFixMe = {
                body: { ...req.body },
                query: { ...req.query },
                headers: { ...req.headers },
            };

            const { projectId, requestId }: $TSFixMe = req.params;
            const data: $TSFixMe = { projectId, requestId, request };

            const response: $TSFixMe =
                await IncomingRequestService.handleIncomingRequestAction(data);
            return sendItemResponse(req, res, response);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

// Process incoming http request from get request
router.get(
    '/:projectId/request/:requestId',
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            /*
             * Request object for use in variables
             * Request body won't be available for a get request
             */
            const request: $TSFixMe = {
                query: { ...req.query },
                headers: { ...req.headers },
            };

            const { projectId, requestId }: $TSFixMe = req.params;
            const data: $TSFixMe = { projectId, requestId, request };

            const response: $TSFixMe =
                await IncomingRequestService.handleIncomingRequestAction(data);
            return sendItemResponse(req, res, response);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

router.post(
    '/:projectId/toggle/:requestId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const { projectId, requestId }: $TSFixMe = req.params;
            const data: $TSFixMe = req.body;
            const select: $TSFixMe =
                'name projectId monitors isDefault selectAllMonitors createIncident acknowledgeIncident resolveIncident updateIncidentNote updateInternalNote noteContent incidentState url enabled incidentTitle incidentType incidentPriority incidentDescription customFields filterMatch filters createSeparateIncident post_statuspage deleted';

            const populate: $TSFixMe = [
                {
                    path: 'monitors.monitorId',
                    select: 'name customFields componentId deleted',
                    populate: [{ path: 'componentId', select: 'name' }],
                },
                { path: 'projectId', select: 'name' },
            ];

            let incomingRequest: $TSFixMe =
                await IncomingRequestService.findOneBy({
                    query: { name: data.name, projectId },
                    select,
                    populate,
                });
            if (
                incomingRequest &&
                String(incomingRequest._id) !== String(requestId)
            ) {
                const error: $TSFixMe = new Error(
                    'Incoming request with this name already exist'
                );

                error.code = 400;
                throw error;
            }

            incomingRequest = await IncomingRequestService.updateOneBy(
                { requestId, projectId },
                data
            );
            return sendItemResponse(req, res, incomingRequest);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

export default router;
