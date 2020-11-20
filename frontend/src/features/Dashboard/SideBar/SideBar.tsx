import { rem } from 'polished';
import React from 'react';
import { LinkElement } from 'src/components/Elements/LinkElement/LinkElement';
import { routes } from 'src/constants/routes';
import { useGetCurrentUser } from 'src/store/users/selectors';
import { styles } from 'src/styles';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${rem(300)};
  height: 100%;
  background: ${styles.colors.mainOrange};
  background: linear-gradient(
    to top,
    ${styles.colors.mainOrange},
    ${styles.colors.mainYellow}
  );
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.p`
  padding: ${rem(20)};
  font-size: ${rem(20)};
  text-align: center;
`;

export const SideBar = () => {
  const currentUser = useGetCurrentUser();
  return (
    <Wrapper>
      <UserName>{currentUser.nick}</UserName>
      <div>
        <LinkElement path={routes.dashboardPage}>Main</LinkElement>
      </div>
      <div>
        <LinkElement path={routes.inviteFriend}>InviteFriend</LinkElement>
      </div>
    </Wrapper>
  );
};
