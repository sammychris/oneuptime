import Express, {
    ExpressRequest,
    ExpressResponse,
    ExpressRouter,
} from 'CommonServer/utils/Express';
const router: ExpressRouter = Express.getRouter();

import { IS_SAAS_SERVICE } from '../config/server';
import { sendItemResponse } from 'CommonServer/Utils/response';

//This API is used to get the backend response if it's a consumer service deployed on OneUptime Cloud or an Enterprise Service deployed on Enterprise customer's cloud.
router.get('/is-saas-service', (req: ExpressRequest, res: ExpressResponse) => {
    if (IS_SAAS_SERVICE) {
        return sendItemResponse(req, res, { result: true });
    }
    return sendItemResponse(req, res, { result: false });
});

router.get('/hosts', (req: ExpressRequest, res: ExpressResponse) => {
    return sendItemResponse(req, res, {
        api: global.apiHost,

        home: global.homeHost,

        accounts: global.accountsHost,

        dashboard: global.dashboardHost,
    });
});

export default router;
