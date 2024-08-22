//src/components/Footer.tsx
import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>© 2023 SEYANG PARK. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem 0;
  background-color: #f4f4f4;
  text-align: center;
`;

const FooterText = styled.p`
  color: #8c8c8c;
  font-size: 0.875rem;
`;
