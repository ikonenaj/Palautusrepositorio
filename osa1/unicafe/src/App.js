import { useState } from 'react'

const Display = props => {
  return ( 
  <div>
    <h1>{props.value}</h1>
  </div>
  );
};

const Button = ({ handleClick, text }) => {
  return (
  <button onClick={ handleClick }>
    { text }
  </button>
  );
};

const StatisticLine = ({ text, value }) => {
  if (text !== "positive") {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  );
  }
  return (
    <tr>
      <td>{text} {value} %</td>
    </tr>
  );
};

const Statistics = ({good,neutral,bad}) => {
  if (good+neutral+bad === 0) {
    return (
      <div>
        <Display value="Statistics" />
        No feedback given
      </div>
    );
  };

  return (
    <div>
      <Display value="Statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good+neutral+bad} />
          <StatisticLine text="average" value={(good+bad)/(good+neutral+bad)} />
          <StatisticLine text="positive" value={(good/(good+neutral+bad))*100 } />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display value="Give feedback" />
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App