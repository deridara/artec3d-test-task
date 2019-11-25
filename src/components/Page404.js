import React from "react";
import history from "../history";
import styled from "styled-components";
import Button from "./common/Button";

const Wrapper = styled.div`
  width: 50%;
  height: 50%;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: scale(1) translate(-50%, -50%);
`;

const Page404 = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <Button onClick={() => history.goBack()}>Back</Button>
    </Wrapper>
  );
};

export default Page404;
