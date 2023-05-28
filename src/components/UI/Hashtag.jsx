import styled from "styled-components";

const Hashtag = styled.button`
    border: none;
    background: var(--secondary-grey);
    color: var(--black);
    opacity: 0.6;
    border-radius: 0.4em;
    padding: 0.3em 0.5em;
    outline: none;
    display: inline-block;
    width: auto;
    text-align: center;
    transition-duration: 350ms;
    cursor: pointer;

    &:hover{
        opacity: 0.8;


    }


`

export default Hashtag;