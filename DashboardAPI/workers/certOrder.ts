import StatusPageService from '../Services/statusPageService';
import CertificateStoreService from '../Services/certificateStoreService';

async function handleFetchingDomains(): void {
    const domainsWithoutCert: $TSFixMe = [];

    const statusPages: $TSFixMe = await StatusPageService.findBy({
        query: {
            'domains.enableHttps': { $eq: true },
            'domains.autoProvisioning': { $eq: true },
            'domains.domain': { $type: 'string' },
        },
        skip: 0,
        limit: 99999,
        select: 'domains',
    });

    for (const statusPage of statusPages) {
        for (const domain of statusPage.domains) {
            if (
                domain.domain &&
                domain.domain.trim() &&
                domain.enableHttps &&
                domain.autoProvisioning
            ) {
                const cert: $TSFixMe = await CertificateStoreService.findOneBy({
                    query: { subject: domain.domain },
                    select: 'id',
                });
                if (!cert) {
                    domainsWithoutCert.push(domain.domain);
                }
            }
        }
    }

    return domainsWithoutCert;
}

export default async function (): void {
    const domains: $TSFixMe = handleFetchingDomains();

    const greenlock: $TSFixMe = global.greenlock;
    if (greenlock) {
        for (const domain of domains) {
            await greenlock.add({
                subject: domain,
                altnames: [domain],
            });
        }
    }
}
