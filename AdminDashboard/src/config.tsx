import React from 'react';

import isEmail from 'sane-email-validation';

import validUrl from 'valid-url';
import valid from 'card-validator';

import FileSaver from 'file-saver';

import { emaildomains } from './constants/emaildomains';
import booleanParser from './utils/booleanParser';

export const env: Function = (value: $TSFixMe) => {

    const { _env }: $TSFixMe = window;
    return (
        (_env && _env[`REACT_APP_${value}`]) ||
        process.env[`REACT_APP_${value}`]
    );
}

let apiUrl = window.location.origin + '/api';
let dashboardUrl = window.location.origin + '/dashboard';
let adminDashboardUrl = window.location.origin + '/admin';
let accountsUrl = window.location.origin + '/accounts';
let helmChartUrl = window.location.origin + '/chart';
let docsUrl = window.location.origin + '/docs';
const licensingUrl: $TSFixMe = env('LICENSE_URL');

if (
    window &&
    window.location &&
    window.location.host &&
    (window.location.host.includes('localhost:') ||
        window.location.host.includes('0.0.0.0:') ||
        window.location.host.includes('127.0.0.1:'))
) {
    const address: $TSFixMe = window.location.host.includes('localhost:')
        ? 'localhost'
        : window.location.host.includes('0.0.0.0:')
            ? '0.0.0.0'
            : '127.0.0.1';
    apiUrl = window.location.protocol + `//${address}:3002`;
    dashboardUrl = window.location.protocol + `//${address}:3000/dashboard`;
    adminDashboardUrl = window.location.protocol + `//${address}:3100/admin`;
    accountsUrl = window.location.protocol + `//${address}:3003/accounts`;
    helmChartUrl = window.location.protocol + `//${address}:3423`;
    docsUrl = window.location.protocol + `//${address}:1445`;
}

export const API_URL: $TSFixMe = apiUrl;

export const DASHBOARD_URL: $TSFixMe = dashboardUrl;

export const ACCOUNTS_URL: $TSFixMe = accountsUrl;

export const ADMIN_DASHBOARD_URL: $TSFixMe = adminDashboardUrl;

export const HELM_CHART_URL: $TSFixMe = helmChartUrl;

export const API_DOCS_URL: $TSFixMe = docsUrl;

export const IS_SAAS_SERVICE: $TSFixMe = booleanParser(env('IS_SAAS_SERVICE'));

export const IS_INTERNAL_SMTP_DEPLOYED: $TSFixMe = booleanParser(
    env('INTERNAL_SMTP_SERVER')
);

export const IS_THIRD_PARTY_BILLING: $TSFixMe =
    env('IS_THIRD_PARTY_BILLING') === 'true' ? true : false;

export const LICENSING_URL: $TSFixMe = licensingUrl;

export const VERSION: $TSFixMe = process.env.VERSION || env('VERSION');

export const User: $TSFixMe = {
    getAccessToken() {
        return localStorage.getItem('access_token');
    },

    setAccessToken(token: $TSFixMe) {
        localStorage.setItem('access_token', token);
    },

    isCardRegistered() {
        return localStorage.getItem('cardRegistered');
    },

    setCardRegistered(value: $TSFixMe) {
        localStorage.setItem('cardRegistered', value);
    },

    setUserId(id: $TSFixMe) {
        localStorage.setItem('id', id);
    },

    getUserId() {
        return localStorage.getItem('id');
    },

    getName() {
        return localStorage.getItem('name');
    },

    setName(name: $TSFixMe) {
        localStorage.setItem('name', name);
    },

    getEmail() {
        return localStorage.getItem('email');
    },

    setEmail(email: $TSFixMe) {
        localStorage.setItem('email', email);
    },
    initialUrl() {
        return sessionStorage.getItem('initialUrl');
    },
    setProject(project: $TSFixMe) {
        localStorage.setItem('project', project);
    },

    getProject() {
        return localStorage.getItem('project');
    },

    clear() {
        localStorage.clear();
    },

    removeUserId() {
        localStorage.removeItem('id');
    },

    removeAccessToken() {
        localStorage.removeItem('token');
    },

    isLoggedIn() {
        return localStorage.getItem('access_token') ? true : false;
    },
};

//Data validation Util goes in here.
export const Validate: $TSFixMe = {
    isDomain(domain: $TSFixMe) {
        return domain.search(/\./) >= 0;
    },

    url(url: URL) {
        return validUrl.isUri(url);
    },

    text(text: $TSFixMe) {
        if (!text || text.trim() === '') {
            return false;
        }

        return true;
    },

    number(number: $TSFixMe) {
        if (number && number.length && !isNaN(number)) {
            return true;
        } else {
            return false;
        }
    },

    isValidNumber(number: $TSFixMe) {
        if (number.match('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')) {
            return true;
        }
        return false;
    },
    numberGreaterThanZero(number: $TSFixMe) {
        if (typeof number === 'string' && number.length === 0) {
            return false;
        }

        if (number && !isNaN(number) && number > 0) {
            return true;
        } else {
            return false;
        }
    },

    isStrongPassword(password: $TSFixMe) {
        if (password.match('^(?=.{8,})')) {
            return true;
        }
        return false;
    },

    email(email: $TSFixMe) {
        if (this.text(email)) return isEmail(email);
        return false;
    },

    isValidBusinessEmail(email: $TSFixMe) {
        return emaildomains.test(email);
    },
    isValidBusinessEmails(emails: $TSFixMe) {
        for (const email of emails) {
            if (!emaildomains.test(email)) return false;
        }
        return true;
    },

    compare(text1: $TSFixMe, text2: $TSFixMe) {
        return text1 === text2;
    },

    card(cardNumber: $TSFixMe) {
        const numberValidation: $TSFixMe = valid.number(cardNumber);

        if (!numberValidation.isPotentiallyValid) {
            return false;
        }

        return true;
    },

    cardExpiration(expiry: $TSFixMe) {
        const numberValidation: $TSFixMe = valid.expirationDate(expiry);

        if (!numberValidation.isPotentiallyValid) {
            return false;
        }

        return true;
    },

    cvv(cvv: $TSFixMe) {
        const numberValidation: $TSFixMe = valid.cvv(cvv);

        if (!numberValidation.isPotentiallyValid) {
            return false;
        }

        return true;
    },

    postalCode(postalCode: $TSFixMe) {
        const numberValidation: $TSFixMe = valid.postalCode(postalCode);

        if (!numberValidation.isPotentiallyValid) {
            return false;
        }

        return true;
    },

    isValidName(name: $TSFixMe) {
        // eslint-disable-next-line
        if (name.match('[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{1,20}$')) {
            return true;
        }
        return false;
    },
};

export const ValidateField: $TSFixMe = {
    required: (value: $TSFixMe) => value && value.length ? undefined : 'This field is required',

    select: (value: $TSFixMe) => value && value.length && value.trim() !== ''
        ? undefined
        : 'Please select a value',

    maxValue10000: (value: $TSFixMe) => value && value.length && value < 10000
        ? undefined
        : `input value should be less than ${10000}`,

    isDomain: (domain: $TSFixMe) => domain.search(/\./) >= 0 ? undefined : 'Please enter a valid Domain',

    url: (url: URL) => validUrl.isUri(url) ? undefined : 'Please enter a valid Url',

    text: (text: $TSFixMe) => !text || text.trim() === ''
        ? 'This field cannot be left blank'
        : undefined,

    number: (number: $TSFixMe) => number && number.length && !isNaN(number)
        ? undefined
        : 'Please enter a valid number',


    email: (email: $TSFixMe) => this.text(email) && isEmail(email)
        ? undefined
        : 'Please enter a valid email',

    compare: (text1: $TSFixMe, text2: $TSFixMe) =>
        text1 === text2 ? undefined : 'These texts donot match',

    password6: (password: $TSFixMe) => !password || !password.length
        ? 'Password cannot be blank'
        : password.length < 6
            ? 'Password must be a minimum of 6 characters'
            : undefined,
};

export const PricingPlan: $TSFixMe = {
    getPlans() {
        if (
            env('STRIPE_PUBLIC_KEY') &&
            env('STRIPE_PUBLIC_KEY').startsWith('pk_test')
        ) {
            return [
                {
                    category: 'Startup',
                    planId: 'plan_GoWIYiX2L8hwzx',
                    type: 'month',
                    amount: 25,
                    details: '$25 / Month / User',
                },
                {
                    category: 'Startup',
                    planId: 'plan_GoWIqpBpStiqQp',
                    type: 'annual',
                    amount: 264,
                    details: '$22/mo per user paid annually. ',
                },
                {
                    category: 'Growth',
                    planId: 'plan_GoWKgxRnPPBJWy',
                    type: 'month',
                    amount: 59,
                    details: '$59 / Month / User',
                },
                {
                    category: 'Growth',
                    planId: 'plan_GoWKiTdQ6NiQFw',
                    type: 'annual',
                    amount: 588,
                    details: '$49/mo per user paid annually. ',
                },
                {
                    category: 'Scale',
                    planId: 'plan_H9Iox3l2YqLTDR',
                    type: 'month',
                    amount: 99,
                    details: '$120 / Month / User',
                },
                {
                    category: 'Scale',
                    planId: 'plan_H9IlBKhsFz4hV2',
                    type: 'annual',
                    amount: 1188,
                    details: '$99/mo per user paid annually. ',
                },
            ];
        } else {
            return [
                {
                    category: 'Startup',
                    planId: 'plan_GoVgVbvNdbWwlm',
                    type: 'month',
                    amount: 25,
                    details: '$25 / Month / User',
                },
                {
                    category: 'Startup',
                    planId: 'plan_GoVgJu5PKMLRJU',
                    type: 'annual',
                    amount: 264,
                    details: '$22/mo per user paid annually. ',
                },
                {
                    category: 'Growth',
                    planId: 'plan_GoVi9EIa6MU0fG',
                    type: 'month',
                    amount: 59,
                    details: '$59 / Month / User',
                },
                {
                    category: 'Growth',
                    planId: 'plan_GoViZshjqzZ0vv',
                    type: 'annual',
                    amount: 588,
                    details: '$49/mo per user paid annually. ',
                },
                {
                    category: 'Scale',
                    planId: 'plan_H9Ii6Qj3HLdtty',
                    type: 'month',
                    amount: 99,
                    details: '$120 / Month / User',
                },
                {
                    category: 'Scale',
                    planId: 'plan_H9IjvX2Flsvlcg',
                    type: 'annual',
                    amount: 1188,
                    details: '$99/mo per user paid annually. ',
                },
            ];
        }
    },

    getPlanById(id: $TSFixMe) {
        const plans: $TSFixMe = this.getPlans();
        if (id) return plans.find(plan => plan.planId === id);
        else return plans[0];
    },
};

export const tutorials: $TSFixMe = {
    getMonitorTutorials() {
        return [
            {
                id: 's1',
                title: 'What are Monitors',
                icon: 'bell',
                description: (
                    <p>
                        You can add web and API server address to to monitor.
                        <br />
                        It allows you monitor the health status of your API
                    </p>
                ),
            },
            {
                id: 's2',
                title: 'What are Incidents',
                icon: 'bell',
                description: (
                    <p>
                        You can use this feature to acknowledge an incident that
                        occurred on a monitor
                        <br /> and mark the incident as resolved after resolving
                        the issue on your api or server
                    </p>
                ),
            },
            {
                id: 's3',
                title: 'Acknowledge/Resolve Incidents',
                icon: 'bell',
                description: (
                    <p>
                        You can use this feature to acknowledge an incident that
                        occurred on a monitor
                        <br /> and mark the incident as resolved after resolving
                        the issue on your api or server
                    </p>
                ),
            },
            {
                id: 's4',
                title: 'Status Metrics',
                icon: 'bell',
                description: (
                    <p>
                        Get detailed metrics of all incidents that occurred{' '}
                        <br />
                        on connected monitors and with date and time it was
                        resolved
                    </p>
                ),
            },
            {
                id: 's5',
                title: 'Better Status Handling',
                icon: 'bell',
                description: (
                    <p>
                        After adding monitors for your API, you won&apos;t miss
                        out on any
                        <br />
                        downtime on your servers, Just let OneUptime alert
                        notify you
                    </p>
                ),
            },
        ];
    },
};

export const getQueryVar: Function = (variable: $TSFixMe, url: URL) => {
    if (!url) return null;
    variable = variable.replace(/[[\]]/g, '\\$&');
    const regex: $TSFixMe = new RegExp('[?&]' + variable + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const saveFile: Function = (content: $TSFixMe, filename: $TSFixMe) => {
    const blob: $TSFixMe = new Blob([content], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, filename);
}

export const makeCriteria: Function = (val: $TSFixMe) => {
    const val2: $TSFixMe = {};
    const and: $TSFixMe = [];
    const or: $TSFixMe = [];

    for (let i = 0; i < val.length; i++) {
        const val3: $TSFixMe = {};
        if (val[i].responseType && val[i].responseType.length) {

            val3.responseType = val[i].responseType;
        }
        if (val[i].filter && val[i].filter.length) {

            val3.filter = val[i].filter;
        }
        if (val[i].field1 && val[i].field1.length) {

            val3.field1 = val[i].field1;
        }
        if (val[i].field2 && val[i].field2.length) {

            val3.field2 = val[i].field2;
        }
        if (val[i].collection && val[i].collection.length) {

            val3.collection = makeCriteria(val[i].collection);
        }
        if (val[0].match && val[0].match.length && val[0].match === 'all') {
            and.push(val3);
        }
        if (val[0].match && val[0].match.length && val[0].match === 'any') {
            or.push(val3);
        }
    }

    val2.and = and;

    val2.or = or;
    return val2;
}

export const mapCriteria: Function = (val: $TSFixMe) => {
    const val2: $TSFixMe = [];
    if (val && val.and && val.and.length) {
        for (let i = 0; i < val.and.length; i++) {
            const val3: $TSFixMe = {};
            if (val.and[i].responseType && val.and[i].responseType.length) {

                val3.responseType = val.and[i].responseType;
            }
            if (val.and[i].filter && val.and[i].filter.length) {

                val3.filter = val.and[i].filter;
            }
            if (val.and[i].field1 && val.and[i].field1.length) {

                val3.field1 = val.and[i].field1;
            }
            if (val.and[i].field2 && val.and[i].field2.length) {

                val3.field2 = val.and[i].field2;
            }
            if (
                val.and[i].collection &&
                (val.and[i].collection.and || val.and[i].collection.or)
            ) {

                val3.field3 = true;

                val3.collection = mapCriteria(val.and[i].collection);
            } else {

                val3.field3 = false;
            }
            if (i === 0) {

                val3.match = 'all';
            }
            val2.push(val3);
        }
        return val2;
    } else if (val && val.or && val.or.length) {
        for (let i = 0; i < val.or.length; i++) {
            const val3: $TSFixMe = {};
            if (val.or[i].responseType && val.or[i].responseType.length) {

                val3.responseType = val.or[i].responseType;
            }
            if (val.or[i].filter && val.or[i].filter.length) {

                val3.filter = val.or[i].filter;
            }
            if (val.or[i].field1 && val.or[i].field1.length) {

                val3.field1 = val.or[i].field1;
            }
            if (val.or[i].field2 && val.or[i].field2.length) {

                val3.field2 = val.or[i].field2;
            }
            if (
                val.or[i].collection &&
                (val.or[i].collection.and || val.or[i].collection.or)
            ) {

                val3.field3 = true;

                val3.collection = mapCriteria(val.or[i].collection);
            } else {

                val3.field3 = false;
            }
            if (i === 0) {

                val3.match = 'any';
            }
            val2.push(val3);
        }
        return val2;
    }
}
