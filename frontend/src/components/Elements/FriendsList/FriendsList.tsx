import React from 'react';
import { isEmpty } from 'lodash';
import { rem } from 'polished';
import styled from 'styled-components';

import { User } from 'src/types/user';

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: ${rem(5)};
  }
`;

const Nick = styled.span`
  margin-right: ${rem(5)};
`;

interface Props {
  friends: User[];
  renderControls?: (friend: User) => React.ReactElement;
}

export const FriendsList = ({ friends, renderControls }: Props) => {
  return (
    <List>
      {isEmpty(friends) ? (
        <ListItem>List is empty</ListItem>
      ) : (
        friends.map(friend => (
          <ListItem key={friend.id}>
            <Nick>
              <strong>Nick:</strong> {friend.nick}
            </Nick>
            {renderControls && renderControls(friend)}
          </ListItem>
        ))
      )}
    </List>
  );
};
