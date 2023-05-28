import styled from 'styled-components';

const Link = styled.a`
  display: inline-block;
  color: ${props => props.color || 'var(--Black)'};
  text-decoration: none;
  cursor: pointer;
  font-size: ${props => props.fontSize || '1rem'};
  cursor: pointer;
  opacity: ${props => props.opacity || '0.40'};
  font-weight: ${props => props.fontWeight || 'var(--font-weight-bold)'};
  text-decoration: ${props => props.textDecoration || 'none'};
  &:hover {
    color: ${props => props.hoverColor || props.color || 'var(--primary-purple)'};
  }

  &.active{
    color: var(--primary-purple);
    font-weight:var(--font-weight-bold);
    text-decoration: underline;
    opacity: 1;
    text-decoration-thickness: 2px;
    text-underline-offset: 8px;
    transform: translateY(-4px);
    transition: transform 0.2s ease;
  }
`;

export default Link;