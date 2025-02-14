import React, { ReactElement, FunctionComponent, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import TopbarMenu from 'CommonUI/src/Components/Dashboard/TopBar/TopbarMenu/TopbarMenu';
import MenuLinkItem from 'CommonUI/src/Components/Dashboard/TopBar/TopbarMenu/MenuLinkItem';
import { MenuIconButton } from 'CommonUI/src/Components/Dashboard/TopBar/TopbarMenuButton/MenuButton';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import UserInfo from './UserInfo';

const UserProfileButton: FunctionComponent = (): ReactElement => {
    const [showProfile, setShowProfile] = useState(false);
    const toggle = () => setShowProfile(!showProfile);

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                if (showProfile) {
                    toggle();
                }
            }}
        >
            <MenuIconButton
                icon={faUser}
                showModal={showProfile}
                action={toggle}
                modalContent={
                    <TopbarMenu
                        items={[
                            <UserInfo
                                name="Caleb Okpara"
                                role="Administrator"
                            />,
                            <MenuLinkItem text="Profile" />,
                            <MenuLinkItem text="Sign out" />,
                        ]}
                    />
                }
            />
        </OutsideClickHandler>
    );
};

export default UserProfileButton;
