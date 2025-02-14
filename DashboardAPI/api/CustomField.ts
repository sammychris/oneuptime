import Express, {
    ExpressRequest,
    ExpressResponse,
    ExpressRouter,
} from 'CommonServer/utils/Express';

import { isAuthorized } from '../middlewares/authorization';
import BadDataException from 'Common/Types/Exception/BadDataException';
import { getUser } from '../middlewares/user';
import {
    sendErrorResponse,
    sendItemResponse,
    sendListResponse,
} from 'CommonServer/Utils/response';
import Exception from 'Common/Types/Exception/Exception';

import CustomFieldService from '../services/customFieldService';

const router: ExpressRouter = Express.getRouter();

router.post(
    '/:projectId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const { projectId }: $TSFixMe = req.params;
            const { fieldName, fieldType, uniqueField }: $TSFixMe = req.body;

            if (!fieldName || !fieldName.trim()) {
                throw new BadDataException('Field name is required');
            }

            if (!fieldType || !fieldType.trim()) {
                throw new BadDataException('Field type is required');
            }

            const populateCustomField: $TSFixMe = [
                { path: 'projectId', select: 'name' },
            ];
            const selectCustomField: $TSFixMe =
                'fieldName fieldType projectId uniqueField';
            let customField: $TSFixMe = await CustomFieldService.findOneBy({
                query: { projectId, fieldName },
                populate: populateCustomField,
                select: selectCustomField,
            });
            if (customField) {
                const error: $TSFixMe = new Error(
                    'Custom field with this name already exist'
                );

                error.code = 400;
                throw error;
            }

            customField = await CustomFieldService.create({
                projectId,
                fieldName,
                fieldType,
                uniqueField,
            });
            return sendItemResponse(req, res, customField);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

router.get(
    '/:projectId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const { projectId }: $TSFixMe = req.params;
            const { limit, skip }: $TSFixMe = req.query;
            const populateCustomField: $TSFixMe = [
                { path: 'projectId', select: 'name' },
            ];
            const selectCustomField: $TSFixMe =
                'fieldName fieldType projectId uniqueField';
            const [customFields, count]: $TSFixMe = await Promise.all([
                CustomFieldService.findBy({
                    query: {
                        projectId,
                    },
                    limit,
                    skip,
                    populate: populateCustomField,
                    select: selectCustomField,
                }),
                CustomFieldService.countBy({
                    projectId,
                }),
            ]);

            return sendListResponse(req, res, customFields, count);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

router.put(
    '/:projectId/:customFieldId',
    getUser,
    isAuthorized,
    async (req: $TSFixMe, res: $TSFixMe): void => {
        try {
            const { projectId, customFieldId }: $TSFixMe = req.params;
            const { fieldName, fieldType, uniqueField }: $TSFixMe = req.body;

            if (!fieldName || !fieldName.trim()) {
                throw new BadDataException('Field name is required');
            }

            if (!fieldType || !fieldType.trim()) {
                throw new BadDataException('Field type is required');
            }

            const populateCustomField: $TSFixMe = [
                { path: 'projectId', select: 'name' },
            ];
            const selectCustomField: $TSFixMe =
                'fieldName fieldType projectId uniqueField';
            let customField: $TSFixMe = await CustomFieldService.findOneBy({
                query: { projectId, fieldName },
                select: selectCustomField,
                populate: populateCustomField,
            });
            if (
                customField &&
                String(customField._id) !== String(customFieldId)
            ) {
                const error: $TSFixMe = new Error(
                    'Custom field with this name already exist'
                );

                error.code = 400;
                throw error;
            }

            customField = await CustomFieldService.updateOneBy(
                { _id: customFieldId, projectId },
                {
                    fieldName,
                    fieldType,
                    uniqueField,
                }
            );
            return sendItemResponse(req, res, customField);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

router.delete(
    '/:projectId/:customFieldId',
    getUser,
    isAuthorized,
    async (req: ExpressRequest, res: ExpressResponse) => {
        try {
            const { projectId, customFieldId }: $TSFixMe = req.params;

            const deletedCustomField: $TSFixMe =
                await CustomFieldService.deleteBy({
                    _id: customFieldId,
                    projectId,
                });

            return sendItemResponse(req, res, deletedCustomField);
        } catch (error) {
            return sendErrorResponse(req, res, error as Exception);
        }
    }
);

export default router;
