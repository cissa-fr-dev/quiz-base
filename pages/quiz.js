import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.success};
`;

export default function QuizPage() {
    return (
        <Title>pagina quiz</Title>
    );
};