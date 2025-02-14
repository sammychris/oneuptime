import chai, { expect } from 'chai';
import chaihttp from 'chai-http';
chai.use(chaihttp);

import decode from 'urldecode';

const methods: $TSFixMe = {
    getAuthorizationHeader: ({ jwtToken }: $TSFixMe) => {
        return `Basic ${jwtToken}`;
    },
    login: async ({ request, email, password }: $TSFixMe) => {
        return await request.post('/user/login').send({
            email,
            password,
        });
    },
    ssoLogin: async ({ request, email }: $TSFixMe) => {
        return await request.get(`/api/user/sso/login?email=${email}`);
    },
    /**
     * Example of payload:
     *const payload: $TSFixMe = {
     *  projectId,
     *  name: "test",
     *  criteria: {},
     *  data: {},
     *}
     */
    createComponent: async ({
        request,
        authorization,
        projectId,
        payload,
    }: $TSFixMe) => {
        return await request
            .post(`/component/${projectId}`)
            .set('Authorization', authorization)
            .send(payload);
    },
    /**
     * Example of payload:
     *const payload: $TSFixMe = {
     *  componentId,
     *  projectId,
     *  type: "device",
     *  name: "test monitor ",
     *  data: { deviceId: "abcdef" },
     *  deviceId: "abcdef",
     *  criteria: {},
     *}
     */
    createMonitor: async ({
        request,
        authorization,
        projectId,
        payload,
    }: $TSFixMe) => {
        return await request
            .post(`/monitor/${projectId}`)
            .set('Authorization', authorization)
            .send(payload);
    },
    /**
     * Example of payloads:
     *const payload: $TSFixMe = {
     *  alertVia: "sms",
     *  contactPhone: "9173976235",
     *  countryCode: "us",
     *};
     *const payload1: $TSFixMe = {
     *  alertVia: "email",
     *  contactEmail: "test@hackerbay.io"
     *}
     */
    addSubscriberToMonitor: async ({
        request,
        authorization,
        projectId,
        monitorId,
        payload,
    }: $TSFixMe) => {
        return await request
            .post(`/subscriber/${projectId}/subscribe/${monitorId}`)
            .set('Authorization', authorization)
            .send(payload);
    },
    rechargeBalance: async ({
        request,
        authorization,
        projectId,
        rechargeBalanceAmount,
    }: $TSFixMe) => {
        return await request
            .post(`/stripe/${projectId}/addBalance`)
            .set('Authorization', authorization)
            .send({ rechargeBalanceAmount });
    },
    createSchedule: async ({
        request,
        authorization,
        projectId,
        name,
    }: $TSFixMe) => {
        return await request
            .post(`/schedule/${projectId}`)
            .set('Authorization', authorization)
            .send({ name });
    },
    /**
     * Example of a payload
     *const payload: $TSFixMe = { monitorIds: [monitorId] };
     */
    updateSchedule: async ({
        request,
        authorization,
        projectId,
        scheduleId,
        payload,
    }: $TSFixMe) => {
        return await request
            .put(`/schedule/${projectId}/${scheduleId}`)
            .set('Authorization', authorization)
            .send(payload);
    },
    /**
     * Example of a payload:
     *const payload= [{
     *  callReminders: "1",
     *  smsReminders: "1",
     *  emailReminders: "1",
     *  email: false,
     *  sms: true,
     *  call: true,
     *  teams: [
     *    {
     *      teamMembers:
     *        [
     *          {
     *            member: "",
     *            timezone: "",
     *            startTime: "",
     *            endTime: "",
     *            userId
     *          }
     *        ]
     *    }
     *  ]
     *}]
     */
    addEscalation: async ({
        request,
        authorization,
        projectId,
        scheduleId,
        payload,
    }: $TSFixMe) => {
        return await request
            .post(`/schedule/${projectId}/${scheduleId}/addescalation`)
            .set('Authorization', authorization)
            .send(payload);
    },
    getSubscribersAlerts: async ({
        request,
        authorization,
        projectId,
        incidentId,
        skip = 0,
        limit = 999,
    }: $TSFixMe) => {
        return await request
            .get(
                `/subscriberAlert/${projectId}/incident/${incidentId}?skip=${skip}&limit=${limit}`
            )
            .set('Authorization', authorization);
    },
    getChargedAlerts: async ({
        request,
        authorization,
        projectId,
        skip = 0,
        limit = 999,
    }: $TSFixMe) => {
        return await request
            .get(
                `/alert/${projectId}/alert/charges?skip=${skip}&limit=${limit}`
            )
            .set('Authorization', authorization);
    },
    getOnCallAlerts: async ({
        request,
        authorization,
        projectId,
        incidentId,
        skip = 0,
        limit = 999,
    }: $TSFixMe) => {
        return await request
            .get(
                `/alert/${projectId}/incident/${incidentId}?skip=${skip}&limit=${limit}`
            )
            .set('Authorization', authorization);
    },
    verifyToken: async ({ request, token }: $TSFixMe) => {
        return await request.get(`/user/confirmation/${token}`).redirects(0);
    },
    /**
     * Example of payload
     *const payload: $TSFixMe = {
     *  monitors: [monitorId],
     *  projectId,
     *  title: "test monitor  is offline.",
     *  incidentType: "offline",
     *  description: 'Incident description',
     *};
     */
    createIncident: async ({
        request,
        authorization,
        projectId,
        payload,
    }: $TSFixMe) => {
        return await request
            .post(`/incident/${projectId}/create-incident`)
            .set('Authorization', authorization)
            .send(payload);
    },
    markIncidentAsAcknowledged: async ({
        request,
        authorization,
        projectId,
        incidentId,
    }: $TSFixMe) => {
        return await request
            .post(`/incident/${projectId}/acknowledge/${incidentId}`)
            .set('Authorization', authorization);
    },
    markSubprojectIncidentAsAcknowledged: async ({
        request,
        authorization,
        subProjectId,
        incidentId,
    }: $TSFixMe) => {
        return await request
            .post(`/incident/${subProjectId}/acknowledge/${incidentId}`)
            .set('Authorization', authorization);
    },
    markIncidentAsResolved: async ({
        request,
        authorization,
        projectId,
        incidentId,
    }: $TSFixMe) => {
        return await request
            .post(`/incident/${projectId}/resolve/${incidentId}`)
            .set('Authorization', authorization);
    },
    markSubprojectIncidentAsResolved: async ({
        request,
        authorization,
        subProjectId,
        incidentId,
    }: $TSFixMe) => {
        return await request
            .post(`/incident/${subProjectId}/resolve/${incidentId}`)
            .set('Authorization', authorization);
    },
    /**
     * Payload = {
     *  planId: 'ID' // for example "plan_GoWKiTdQ6NiQFw",
     *  projectName: 'PROJECT_NAME'
     * }
     */
    createProject: async ({ request, authorization, payload }: $TSFixMe) => {
        return await request
            .post(`/api/project/create`)
            .set('Authorization', authorization)
            .send(payload);
    },
    fetchProject: async ({ request, authorization, projectId }: $TSFixMe) => {
        return await request
            .get(`/api/project/projects/${projectId}`)
            .set('Authorization', authorization);
    },
    deleteProject: async ({ request, authorization, id }: $TSFixMe) => {
        return await request
            .delete(`/api/project/${id}/deleteProject`)
            .set('Authorization', authorization);
    },
    /**
     *  ExamplePayload = {
     *      'saml-enabled':
     *          true,
     *      domain:
     *          'tests.hackerbay.io',
     *      samlSsoUrl:
     *          'http://localhost:9876/simplesaml/saml2/idp/SSOService.php',
     *      remoteLogoutUrl:
     *          'http://localhost:9876/logout',
     *  }
     */
    createSso: async ({ request, authorization, payload }: $TSFixMe) => {
        return await request
            .post(`/api/sso/`)
            .set('Authorization', authorization)
            .send(payload);
    },
    deleteSso: async ({ request, authorization, id }: $TSFixMe) => {
        return await request
            .delete(`/api/sso/${id}`)
            .set('Authorization', authorization);
    },
    /**
     *  ExamplePayload = {
     *      domain: "6017d3105299cd0725598155",
     *      project: "600fcb791450c01eab741764",
     *      role: "Viewer",
     *  }
     */
    createSsoDefaultRole: async ({
        request,
        authorization,
        payload,
    }: $TSFixMe) => {
        return await request
            .post(`/api/ssoDefaultRoles/`)
            .set('Authorization', authorization)
            .send(payload);
    },
    updateSsoDefaultRole: async ({
        request,
        authorization,
        id,
        payload,
    }: $TSFixMe) => {
        return await request
            .put(`/api/ssoDefaultRoles/${id}`)
            .set('Authorization', authorization)
            .send(payload);
    },
    fetchSsoDefaultRoles: async ({ request, authorization }: $TSFixMe) => {
        return await request
            .get(`/api/ssoDefaultRoles/`)
            .set('Authorization', authorization);
    },
    fetchSsoDefaultRole: async ({ request, authorization, id }: $TSFixMe) => {
        return await request
            .get(`/api/ssoDefaultRoles/${id}`)
            .set('Authorization', authorization);
    },
    deleteSsoDefaultRole: async ({ request, authorization, id }: $TSFixMe) => {
        return await request
            .delete(`/api/ssoDefaultRoles/${id}`)
            .set('Authorization', authorization);
    },
    fetchIdpSAMLResponse: async ({
        SAMLRequest,
        username,
        password,
    }: $TSFixMe) => {
        let firstIdpResponse: $TSFixMe;
        try {
            const response: $TSFixMe = await chai

                .request(SAMLRequest)
                .get('')
                .redirects(0);
            expect(response).to.have.status(302);
            firstIdpResponse = response;
        } catch (error) {
            expect(error.response).to.have.status(302);
            firstIdpResponse = error.response;
        }

        const {
            headers: { location, 'set-cookie': cookies },
        } = firstIdpResponse;
        const [postSubmissionUrl, AuthState]: $TSFixMe =
            location.split('AuthState=');

        const samlResponsePage: $TSFixMe = await chai

            .request(postSubmissionUrl)
            .post('')
            .set('Referer', SAMLRequest)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Cookie', cookies[0])
            .send({
                username,
                password,
                AuthState: decode(AuthState),
            });

        const {
            res: { text: html },
        } = samlResponsePage;

        import { parse } from 'node-html-parser';
        const root: $TSFixMe = parse(html);
        const input: $TSFixMe = root.querySelectorAll('input')[1];
        const value: $TSFixMe = input.rawAttrs.split(' ')[2];
        const SAMLResponse: $TSFixMe = value.split('"')[1];
        return SAMLResponse;
    },
};

const proxy: $TSFixMe = new Proxy(methods, {
    shared: {},
    setShared: function (args: $TSFixMe): void {
        this.shared = { ...this.shared, ...args };
        return this.shared;
    },
    unsetShared: function (attribute: $TSFixMe): void {
        if (this.shared[attribute]) {
            delete this.shared[attribute];
        }
        return this.shared;
    },
    get: (target: $TSFixMe, prop: $TSFixMe): void => {
        if (this[prop]) {
            return (args: $TSFixMe = {}) => {
                return this[prop](args);
            };
        }

        return (args: $TSFixMe = {}) => {
            return target[prop]({ ...this.shared, ...args });
        };
    },
});

export default proxy;
