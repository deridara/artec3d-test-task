import React from 'react'
import styled from "styled-components";

const StyledButton = styled.div`
  background: ${props => props.light ? 'white' : '#ccc'};
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #ccc;

  &:hover {
    background: #ddd;
  }
`;

const Button = ({ onClick, children, ...props }) => {
  return <StyledButton onClick={onClick} {...props}>{children}</StyledButton>;
};

export default Button;