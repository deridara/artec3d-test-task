import React from 'react'
import styled from 'styled-components'

const TextStub = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

export default ({children, ...props}) => <TextStub {...props}>{children}</TextStub>