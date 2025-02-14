import PerformanceTrackerService from '../Services/performanceTrackerService';
import { sendErrorResponse } from 'CommonServer/Utils/Response';
import BadDataException from 'Common/Types/Exception/BadDataException';
import {
    ExpressResponse,
    ExpressRequest,
    NextFunction,
} from 'CommonServer/Utils/Express';
const _this: $TSFixMe = {
    isValidAPIKey: async function (
        req: ExpressRequest,
        res: ExpressResponse,
        next: NextFunction
    ): void {
        const { key }: $TSFixMe = req.params;
        if (!key) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Please provide an api key to continue')
            );
        }

        // Check if there's a performance tracker with the key
        const performanceTrackerCount: $TSFixMe =
            await PerformanceTrackerService.countBy({
                key,
            });
        if (performanceTrackerCount === 0) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('API key is not valid')
            );
        }

        // Everything is fine at this point
        return next();
    },
};

export default _this;
