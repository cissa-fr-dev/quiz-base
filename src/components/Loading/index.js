import styled from 'styled-components';

const Loading = styled.div`   
    display: inline-block;
    width: 7rem;
    height: 7rem;
   
    &:after {
        content: " ";
        display: inline-block;
        padding: 10px;
        width: 64px;
        height: 64px;
        margin: 10px;
        border-radius: 50%;
        border: 5px solid;
        border-color: #ff6e3e transparent #ff6e3e transparent;
        animation: spin 1.2s linear infinite;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;


export default Loading;