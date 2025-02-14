import React, { Component } from 'react';

import { Translate } from 'react-auto-translate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Markdown from 'markdown-to-jsx';
import ShouldRender from './ShouldRender';
import moment from 'moment';
import { capitalize } from '../config';

const AffectedResources: Function = ({
    event,
    monitorState,
    colorStyle
}: $TSFixMe) => {
    const affectedMonitors: $TSFixMe = [];
    let monitorCount = 0;

    const eventMonitors: $TSFixMe = [];
    // populate the ids of the event monitors in an array
    event &&
        event.monitors &&
        event.monitors.map((monitor: $TSFixMe) => {
            eventMonitors.push(String(monitor.monitorId._id));
            return monitor;
        });

    monitorState.map((monitor: $TSFixMe) => {
        if (eventMonitors.includes(String(monitor._id))) {
            affectedMonitors.push(monitor);
            monitorCount += 1;
        }
        return monitor;
    });
    // check if the length of monitors on status page equals the monitor count
    // if they are equal then all the monitors in status page is in a particular scheduled event
    if (monitorCount === monitorState.length) {
        return (
            <>
                <span
                    className="ongoing__affectedmonitor--title"
                    style={
                        colorStyle !== 'white'
                            ? { color: 'rgba(76, 76, 76, 0.8)' }
                            : {}
                    }
                >
                    <Translate>Resources Affected:</Translate>
                </span>{' '}
                <span
                    className="ongoing__affectedmonitor--content"
                    style={
                        colorStyle !== 'white'
                            ? { color: 'rgba(0, 0, 0, 0.5)' }
                            : {}
                    }
                >
                    <Translate>All resources are affected</Translate>
                </span>
            </>
        );
    } else {
        return <>
            <span
                className="ongoing__affectedmonitor--title"
                style={
                    colorStyle !== 'white'
                        ? { color: 'rgba(76, 76, 76, 0.8)' }
                        : {}
                }
            >
                <Translate>Resources Affected</Translate>:{' '}
            </span>
            <span
                className="ongoing__affectedmonitor--content"
                style={
                    colorStyle !== 'white'
                        ? { color: 'rgba(0, 0, 0, 0.5)' }
                        : {}
                }
            >
                {affectedMonitors

                    .map(monitor => capitalize(monitor.name))
                    .join(', ')
                    .replace(/, ([^,]*)$/, ' and $1')}
            </span>
        </>;
    }
};

interface NewThemeEventProps {
    events?: unknown[];
    filteredEvents?: object;
    noteBackgroundColor?: object;
    monitorState?: unknown[];
    statusPageSlug?: string;
    history?: object;
}

class NewThemeEvent extends Component<ComponentProps> {
    override render() {
        const checkDuplicateDates: Function = (items: $TSFixMe) => {
            const track: $TSFixMe = {};

            const result: $TSFixMe = [];

            for (const item of items) {
                const date: $TSFixMe = String(item.createdAt).slice(0, 10);


                if (!track[date]) {
                    item.style = true;

                    track[date] = date;
                } else {
                    item.style = false;
                }

                result.push(item);
            }

            return result;
        };

        const formatMsg: Function = (data: $TSFixMe) => {
            const result: $TSFixMe = data.reduce(function (r: $TSFixMe, a: $TSFixMe) {
                r[a.event_state] = r[a.event_state] || [];
                r[a.event_state].push(a);
                return r;
            }, Object.create({}));

            return result;
        };


        const data: $TSFixMe = this.props.filteredEvents.success

            ? this.props.filteredEvents.events

            : this.props.events;


        const noteBackgroundColor: $TSFixMe = this.props.noteBackgroundColor;

        const currentTime: $TSFixMe = moment();

        return data && data.length > 0 ? (
            checkDuplicateDates(data).map((event, i) => {
                return (
                    <div
                        className="incident-object"
                        style={{
                            backgroundColor:
                                noteBackgroundColor.background ===
                                    'rgba(247, 247, 247, 1)'
                                    ? 'rgba(255,255,255,1)'
                                    : noteBackgroundColor.background,
                        }}
                        key={i}
                    >
                        <ShouldRender if={event.style}>
                            <div className="date-big" style={{ margin: 10 }}>
                                {moment(event.createdAt).format('LL')}
                            </div>
                        </ShouldRender>
                        <ShouldRender if={!event.style}>
                            <div className="border-width-90"></div>
                        </ShouldRender>
                        {event.name ? (
                            <span
                                style={{ margin: 10, display: 'inline-block' }}
                            >
                                <div className="list_k">
                                    <b
                                        id={`event-name-${event.name}`}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>

                                            this.props.history.push(

                                                `/StatusPage/${this.props.statusPageSlug}/scheduledEvent/${event.slug}`
                                            )
                                        }
                                    >
                                        {event.name}
                                    </b>
                                    {event.cancelled ? (
                                        <div
                                            style={{
                                                marginLeft: 15,
                                            }}
                                            className="Badge Badge--color--red Box-root Flex-inlineFlex Flex-alignItems--center Padding-horizontal--8 Padding-vertical--2"
                                        >
                                            <span className="Badge-text Text-color--red Text-display--inline Text-fontSize--12 Text-fontWeight--bold Text-lineHeight--16 Text-typeface--upper Text-wrap--noWrap">
                                                <span id="ongoing-event">
                                                    <Translate>
                                                        Cancelled
                                                    </Translate>
                                                </span>
                                            </span>
                                        </div>
                                    ) : event.resolved ? (
                                        <div
                                            style={{
                                                marginLeft: 15,
                                            }}
                                            className="Badge Badge--color--green Box-root Flex-inlineFlex Flex-alignItems--center Padding-horizontal--8 Padding-vertical--2"
                                        >
                                            <span className="Badge-text Text-color--green Text-display--inline Text-fontSize--12 Text-fontWeight--bold Text-lineHeight--16 Text-typeface--upper Text-wrap--noWrap">
                                                <span id="ongoing-event">
                                                    <Translate>
                                                        Completed
                                                    </Translate>
                                                </span>
                                            </span>
                                        </div>
                                    ) : currentTime >=
                                        moment(event.startDate) &&
                                        currentTime < moment(event.endDate) ? (
                                        <div
                                            style={{
                                                marginLeft: 15,
                                            }}
                                            className="Badge Badge--color--yellow Box-root Flex-inlineFlex Flex-alignItems--center Padding-horizontal--8 Padding-vertical--2"
                                        >
                                            <span className="Badge-text Text-color--yellow Text-display--inline Text-fontSize--12 Text-fontWeight--bold Text-lineHeight--16 Text-typeface--upper Text-wrap--noWrap">
                                                <span id="ongoing-event">
                                                    <Translate>
                                                        Ongoing
                                                    </Translate>
                                                </span>
                                            </span>
                                        </div>
                                    ) : currentTime <
                                        moment(event.startDate) ? (
                                        <div
                                            style={{
                                                marginLeft: 15,
                                            }}
                                            className="Badge Badge--color--blue Box-root Flex-inlineFlex Flex-alignItems--center Padding-horizontal--8 Padding-vertical--2"
                                        >
                                            <span className="Badge-text Text-color--default Text-display--inline Text-fontSize--12 Text-fontWeight--bold Text-lineHeight--16 Text-typeface--upper Text-wrap--noWrap">
                                                <span id="ongoing-event">
                                                    <Translate>
                                                        Scheduled
                                                    </Translate>
                                                </span>
                                            </span>
                                        </div>
                                    ) : (
                                        currentTime >=
                                        moment(event.endDate) && (
                                            <div
                                                style={{
                                                    marginLeft: 15,
                                                }}
                                                className="Badge Badge--color--green Box-root Flex-inlineFlex Flex-alignItems--center Padding-horizontal--8 Padding-vertical--2"
                                            >
                                                <span className="Badge-text Text-color--green Text-display--inline Text-fontSize--12 Text-fontWeight--bold Text-lineHeight--16 Text-typeface--upper Text-wrap--noWrap">
                                                    <span id="ongoing-event">
                                                        <Translate>
                                                            Ended
                                                        </Translate>
                                                    </span>
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <ShouldRender if={event.description}>
                                    <div
                                        className="incident_desc"
                                        id={`event-description-${event.description}`}
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {event.description
                                            .split('\n')
                                            .map((elem: $TSFixMe, index: $TSFixMe) => (
                                                <Markdown
                                                    key={`${elem}-${index}`}
                                                    options={{
                                                        forceBlock: true,
                                                    }}
                                                >
                                                    {elem}
                                                </Markdown>
                                            ))}
                                    </div>
                                </ShouldRender>
                                {AffectedResources({
                                    event,

                                    monitorState: this.props.monitorState,
                                    colorStyle: {},
                                })}
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '12px',
                                    }}
                                >
                                    <div
                                        className="incident-date"
                                        id="event-date"
                                    >
                                        {event.cancelled ? (
                                            <span>
                                                {moment(
                                                    event.cancelledAt
                                                ).format('LLL')}
                                            </span>
                                        ) : (
                                            <span>
                                                {moment(event.startDate).format(
                                                    'LLL'
                                                )}{' '}
                                                -{' '}
                                                {moment(event.endDate).format(
                                                    'LLL'
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {event &&
                                    event.notes &&
                                    event.notes.length > 0 &&
                                    Object.keys(formatMsg(event.notes)).map(
                                        (key, index) => {
                                            return (
                                                <div
                                                    className="new-mb-12"
                                                    key={index}
                                                >
                                                    <div className="items_dis">
                                                        <div className="incident-info">
                                                            <span className="list_k">
                                                                {key}
                                                            </span>
                                                            -{' '}
                                                        </div>
                                                        <div className="list_items">
                                                            {formatMsg(
                                                                event.notes
                                                            )[key].map(
                                                                (item: $TSFixMe, i: $TSFixMe) => {
                                                                    return (
                                                                        <div
                                                                            className="incident-brief"
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            {formatMsg(
                                                                                event.notes
                                                                            )[
                                                                                key
                                                                            ]
                                                                                .length >
                                                                                1 && (
                                                                                    <span className="big_dot">
                                                                                        &#9679;
                                                                                    </span>
                                                                                )}
                                                                            {
                                                                                item.content
                                                                            }
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="incident-date">
                                                        <span>
                                                            {formatMsg(
                                                                event.notes
                                                            )[key].map(
                                                                (time: $TSFixMe, i: $TSFixMe) => {
                                                                    return (
                                                                        <>
                                                                            {i ===
                                                                                0 && (
                                                                                    <div
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                    >
                                                                                        {moment(
                                                                                            time.createdAt
                                                                                        ).format(
                                                                                            'LLL'
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                        </>
                                                                    );
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                            </span>
                        ) : (
                            <div
                                className="bs-no-report"
                                style={{ margin: 10, display: 'inline-block' }}
                            >
                                <Translate>No Event added</Translate>
                            </div>
                        )}
                    </div>
                );
            })
        ) : (
            <>

                <ShouldRender if={this.props.filteredEvents.date}>
                    <div className="date-big ma-t-20">

                        {moment(this.props.filteredEvents.date).format('LL')}
                    </div>
                </ShouldRender>
                <div className="no_monitor">
                    <Translate>No event available</Translate>
                </div>
            </>
        );
    }
}


NewThemeEvent.displayName = 'NewThemeEvent';


NewThemeEvent.propTypes = {
    events: PropTypes.array,
    filteredEvents: PropTypes.object,
    noteBackgroundColor: PropTypes.object,
    monitorState: PropTypes.array,
    statusPageSlug: PropTypes.string,
    history: PropTypes.object,
};

const mapStateToProps: Function = (state: RootState, ownProps: $TSFixMe) => {
    const { type }: $TSFixMe = ownProps;
    const futureEvents: $TSFixMe = state.status.futureEvents.events;
    const pastEvents: $TSFixMe = state.status.pastEvents.events;
    const ongoing: $TSFixMe =
        state.status &&
        state.status.ongoing &&
        state.status.ongoing.ongoing &&
        state.status.ongoing.ongoing.filter(
            (ongoingSchedule: $TSFixMe) => !ongoingSchedule.cancelled
        );
    const events: $TSFixMe =
        type === 'future'
            ? futureEvents
            : type === 'past'
                ? pastEvents
                : ongoing;
    return {
        events,
        filteredEvents: state.status.individualEvents,
        monitorState: state.status.statusPage.monitorsData,
    };
};

export default connect(mapStateToProps, null)(NewThemeEvent);
