import React from 'react';
import Modal from 'react-modal';
import { rem, rgba } from 'polished';
import styled from 'styled-components';

import { styles } from 'src/styles';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const ModalStyled = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const customStyles = {
  overlay: {
    backgroundColor: rgba(styles.colors.mainOrange, 0.9),
  },
  content: {
    border: 'none',
  },
};

interface ModalInnerProps {
  minWidth?: string;
}

const ModalInner = styled.div<ModalInnerProps>`
  ${({ minWidth }) => minWidth && `min-width: ${minWidth}`};
  position: relative;
  padding: ${rem(30)};
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.4);
  background-color: ${styles.colors.white};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${rem(10)};
  right: ${rem(10)};
  color: #888;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${rem(30)};
`;

interface Props extends ModalInnerProps {
  isOpen: boolean;
  close: () => void;
  title?: string;
  isCancelButtonHidden?: boolean;
}

export const ModalElement = ({
  isOpen,
  close,
  children,
  minWidth,
  title,
  isCancelButtonHidden,
}: React.PropsWithChildren<Props>) => {
  return (
    <ModalStyled style={customStyles} isOpen={isOpen} onRequestClose={close}>
      <ModalInner minWidth={minWidth}>
        {!isCancelButtonHidden && <CloseButton onClick={close}>X</CloseButton>}
        {title && <Title>{title}</Title>}
        {children}
      </ModalInner>
    </ModalStyled>
  );
};
