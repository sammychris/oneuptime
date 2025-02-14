import moment from 'moment';

export default {
    calculateHumanReadableDownTime: function (comparedTime: $TSFixMe): void {
        const downTime: $TSFixMe =
            (new Date().getTime() - new Date(comparedTime).getTime()) /
            (1000 * 60);
        let downTimeString: string = `${Math.ceil(downTime)} minutes`;
        if (downTime < 1) {
            downTimeString = 'less than a minute';
        } else if (downTime > 24 * 60) {
            downTimeString = `${Math.floor(
                downTime / (24 * 60)
            )} days ${Math.floor(
                (downTime % (24 * 60)) / 60
            )} hours ${Math.floor(downTime % 60)} minutes`;
        } else if (downTime > 60) {
            downTimeString = `${Math.floor(downTime / 60)} hours ${Math.floor(
                downTime % 60
            )} minutes`;
        }

        return downTimeString;
    },

    getIncidentLength: function (
        createdAt: $TSFixMe,
        actionPerformedAt: $TSFixMe
    ) {
        const downtime: $TSFixMe = moment(actionPerformedAt).diff(
            moment(createdAt),
            'minutes'
        );
        let downtimestring: string = `${Math.ceil(downtime)} minutes`;
        if (downtime < 1) {
            downtimestring = 'less than a minute';
        } else if (downtime > 24 * 60) {
            downtimestring = `${Math.floor(
                downtime / (24 * 60)
            )} days ${Math.floor(
                (downtime % (24 * 60)) / 60
            )} hours ${Math.floor(downtime % 60)} minutes`;
        } else if (downtime > 60) {
            downtimestring = `${Math.floor(downtime / 60)} hours ${Math.floor(
                downtime % 60
            )} minutes`;
        }

        return downtimestring;
    },
};
