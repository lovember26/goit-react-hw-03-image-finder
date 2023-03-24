import styled from 'styled-components';

export const Backdrop = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
`;

export const ModalWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
