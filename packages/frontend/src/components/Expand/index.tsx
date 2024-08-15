import AnimatedDropdown from 'components/AnimatedDropdown';
import Column from 'components/Column';
import React, { PropsWithChildren, ReactElement } from 'react';
import { ChevronDown } from 'react-feather';
// import styled from 'styled-components/macro'
import { styled } from '@mui/material';

import Row, { RowBetween } from '../Row';

const ButtonContainer = styled(Row)`
  cursor: pointer;
  justify-content: flex-end;
  width: unset;
`;

const ExpandIcon = styled(ChevronDown, {
  shouldForwardProp: (prop) => prop !== '$isOpen',
})<{ $isOpen: boolean }>`
  color: ${({ theme }) => theme.palette.secondary.main};
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease-in-out;
`;
// transition: transform ${({ theme }) => theme.transition.duration.medium};
// TODO: Check on interface

const Content = styled(Column)`
  padding-top: 5px;
`;
// padding-top: ${({ theme }) => theme.grids.md};

export default function Expand({
  header,
  button,
  children,
  testId,
  isOpen,
  onToggle,
}: PropsWithChildren<{
  header: ReactElement;
  button: ReactElement;
  testId?: string;
  isOpen: boolean;
  onToggle: () => void;
}>) {
  return (
    <Column>
      <RowBetween>
        {header}
        <ButtonContainer data-testid={testId} onClick={onToggle} aria-expanded={isOpen}>
          {button}
          <ExpandIcon $isOpen={isOpen} />
        </ButtonContainer>
      </RowBetween>
      <AnimatedDropdown open={isOpen}>
        <Content gap="md">{children}</Content>
      </AnimatedDropdown>
    </Column>
  );
}
