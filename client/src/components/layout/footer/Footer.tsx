import { FaGithub, FaLinkedin } from "react-icons/fa";

import React from "react";
import styled from "styled-components";

const FooterStyles = styled.footer`
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  background-color: #000000b6;
  color: white;
  height: 10vh;
  margin-top: 10vh;
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  transition: color 0.3s ease-in-out;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    color: #47eaff;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterStyles>
      <IconLink
        href="https://www.saks.digital"
        target="_blank"
        rel="noopener noreferrer"
      >
        © 2024 Elar Saks
      </IconLink>

      <IconLink
        href="https://github.com/elarsaks/SWAPI"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <FaGithub size="20px" />
        <span>GitHub</span>
      </IconLink>

      <IconLink
        href="https://www.linkedin.com/in/elarsaks/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedin size="20px" />
        <span>LinkedIn</span>
      </IconLink>
    </FooterStyles>
  );
};

export default Footer;
