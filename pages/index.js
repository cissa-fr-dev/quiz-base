import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import QuizLogo from '../src/components/QuizLogo'
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBrackground';


const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.contrastText};
`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>The legend of zelda</h1>
          </Widget.Header>

          <Widget.Content>
            <form onSubmit={function (e) {
              e.preventDefault();

              router.push(`/quiz?name=${name}`);
            }}>
              <input
                onChange={function (e) {
                  setName(e.target.value);
                }}
                placeholder="Manda a braba"
              />
              <button type="submit" disabled={name.length === 0}>
                Bora Jogar {name}
              </button>
            </form>
          </Widget.Content>

        </Widget>
        <Widget>
          <Widget.Content>
            <h1>The legend of zelda</h1>
            <p>lorem ipsum color sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/cissa-fr-dev" />
    </ QuizBackground>
  )
}
