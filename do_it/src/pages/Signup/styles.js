import styled, { keyframes } from "styled-components";

import SignupImage from "../../assets/signup.png";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

export const Background = styled.div`
  @media (min-width: 1100px) {
    flex: 1;
    background: url(${SignupImage}) no-repeat center, var(--black);
    background-size: contain;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
from {
    opacity: 0;
    transform: translateX(50px);
}

to {
    opacity: 1;
    transform: translateX(0px);
}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromRight} 1s;

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 32px;
    }

    > div {
      margin-top: 16px;
    }

    p {
      margin-top: 8px;

      a {
        font-weight: bold;
        color: var(--orange);
      }
    }
  }
`;
