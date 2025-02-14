import React from 'react';

import { Link } from 'react-router-dom';
import moment from 'moment';

const UserList: Function = ({
    users
}: $TSFixMe) =>
    users.map((user: $TSFixMe, k: $TSFixMe) => {
        return (
            <Link
                id={
                    user.deleted
                        ? `deleted__${user.email && user.email.split('@')[0]}`
                        : `${user.email && user.email.split('@')[0]}`
                }
                to={`/admin/users/${user._id}`}
                key={k}
                className="bs-ObjectList-row db-UserListRow db-UserListRow--withName"
            >
                <div className="bs-ObjectList-cell bs-u-v-middle">
                    <div className="bs-ObjectList-cell-row bs-ObjectList-copy bs-is-highlighted">
                        {user.name}
                    </div>
                    <div className="bs-ObjectList-row db-UserListRow db-UserListRow--withNamebs-ObjectList-cell-row bs-is-muted">
                        {user.email || (
                            <span className="db-ListViewItem-text Text-color--red Text-display--inline Text-fontSize--13 Text-fontWeight--medium Text-lineHeight--20  Text-wrap--wrap">
                                <span>Email Not Found</span>
                            </span>
                        )}
                    </div>
                </div>
                <div className="bs-ObjectList-cell bs-u-v-middle">
                    <div className="bs-ObjectList-cell-row">
                        {`${user.projects && user.projects[0]
                                ? user.projects[0].name
                                : 'Not Added Yet'
                            }`}{' '}
                        {user.projects && user.projects.length - 1 > 0
                            ? user.projects.length - 1 > 1
                                ? `and ${user.projects.length - 1} others`
                                : 'and 1 other'
                            : ''}
                    </div>
                </div>
                <div className="bs-ObjectList-cell bs-u-v-middle">
                    {user.deleted ? (
                        <div className="Badge Badge--color--red Box-root Flex-inlineFlex Flex-alignItems--center Padding-horizontal--8 Padding-vertical--2">
                            <span className="Badge-text Text-color--red Text-display--inline Text-fontSize--12 Text-fontWeight--bold Text-lineHeight--16 Text-typeface--upper Text-wrap--noWrap">
                                <span>Deleted</span>
                            </span>
                        </div>
                    ) : user.isBlocked ? (
                        <div className="Badge Badge--color--yellow Box-root Flex-inlineFlex Flex-alignItems--center Padding-horizontal--8 Padding-vertical--2">
                            <span className="Badge-text Text-color--yellow Text-display--inline Text-fontSize--12 Text-fontWeight--bold Text-lineHeight--16 Text-typeface--upper Text-wrap--noWrap">
                                <span>Blocked</span>
                            </span>
                        </div>
                    ) : user.isAdminMode ? (
                        <div className="Badge Badge--color--red Box-root Flex-inlineFlex Flex-alignItems--center Padding-horizontal--8 Padding-vertical--2">
                            <span className="Badge-text Text-color--red Text-display--inline Text-fontSize--12 Text-fontWeight--bold Text-lineHeight--16 Text-typeface--upper Text-wrap--noWrap">
                                <span>AdminMode</span>
                            </span>
                        </div>
                    ) : (
                        <div className="Badge Badge--color--green Box-root Flex-inlineFlex Flex-alignItems--center Padding-horizontal--8 Padding-vertical--2">
                            <span className="Badge-text Text-color--green Text-display--inline Text-fontSize--12 Text-fontWeight--bold Text-lineHeight--16 Text-typeface--upper Text-wrap--noWrap">
                                <span>
                                    {user.name
                                        ? 'Online ' +
                                        moment(user.lastActive).fromNow()
                                        : 'Invitation Sent'}
                                </span>
                            </span>
                        </div>
                    )}
                </div>
                <div className="bs-ObjectList-cell bs-u-v-middle"></div>
                <div className="bs-ObjectList-cell bs-u-right bs-u-shrink bs-u-v-middle Flex-alignContent--spaceBetween">
                    <div></div>
                </div>
            </Link>
        );
    });

UserList.displayName = 'UserList';

export default UserList;
