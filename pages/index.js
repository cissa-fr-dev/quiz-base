import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import QuizLogo from '../src/components/QuizLogo'
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import { useRouter } from 'next/router'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.contrastText};
`;

export default function Home() {
  const [name, setName] = React.useState('');
  const router = useRouter();

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header
            name={name}
          >
            <Title>{db.title}</Title>
          </Widget.Header>

          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault();

              router.push(`/quiz?name=${name}`);
              // <Link href={{ pathname: '/quiz', query: { name: name } }} />;
            }}>
              <Input
                name="nomeDoUsuario"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Bora Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>

        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Bora jogar</h1>
            <p>lorem ipsum color sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/cissa-fr-dev" />
    </ QuizBackground >
  )
}
