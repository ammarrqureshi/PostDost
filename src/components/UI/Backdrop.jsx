import styled from 'styled-components';

 const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Backdrop;