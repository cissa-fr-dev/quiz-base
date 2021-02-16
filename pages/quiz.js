import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Loading from '../src/components/Loading';
import { useRouter } from 'next/router'


function ResultWidget({ results, name }) {
  return (
    <Widget>
      <Widget.Header>
        <h3>{`Resultado da ${name}`}</h3>
      </Widget.Header>

      <Widget.Content>
        <p>
          {`Você acertou ${results.filter((x) => x).length} perguntas!`}
        </p>

        <ul>
          {results.map((result, index) => {
            return (
              <li key={`result__${result}`}>
                {` # ${index + 1}:  ${result === true ? 'Acertou' : "Errou"}`}
              </li>
            )
          })}
        </ul>

      </Widget.Content>
    </Widget>
  );
};

function LoadingWidget() {
  return (
    <Widget
      style={{ textAlign: 'center' }}
    >
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Loading />
    </Widget>
  );
};

function QuestionWidget({ // as variáveis não precisam ser em ordem
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult }
) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorret = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative != undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorret);
              onSubmit();
              setQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 1000)
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorret ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>
          {isQuestionSubmited && isCorret && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorret && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const router = useRouter()
  const name = router.query.name;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} name={name} />}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/cissa-fr-dev" />
    </QuizBackground>
  );
}