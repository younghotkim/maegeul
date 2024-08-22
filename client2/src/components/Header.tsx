//src/components/Header.tsx
import React from 'react';
import styled from 'styled-components';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>📂MAEGEUL LOGO</Logo>
      <Nav>
        <NavItem>홈</NavItem>
        <NavItem>버튼</NavItem>
        <NavItem>버튼</NavItem>
        <NavItem>버튼</NavItem>
        <NavItem>버튼</NavItem>
      </Nav>
      <Login>로그인</Login>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 2rem;
  background-color: #f4f4f4;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: #6c6783;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavItem = styled.a`
  color: #6c6783;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = styled.button`
  background-color: #6c6783;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #5a5770;
  }
`;
