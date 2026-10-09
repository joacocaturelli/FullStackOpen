import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, quantity}) => (
  <tr>
    <td>{text}</td>
    <td>{quantity}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (!good && !neutral && !bad && !total && !average && !positive) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' quantity={good} />
        <StatisticLine text='neutral' quantity={neutral} />
        <StatisticLine text='bad' quantity={bad} />
        <StatisticLine text='all' quantity={total} />
        <StatisticLine text='average' quantity={average != 0 ? average / total : 0} />
        <StatisticLine text='positive' quantity={positive != 0 ? (positive / total * 100) + ' %' : 0 + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAverage(average + 1)
    setPositive(positive + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>  

      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>

      <h2>Statistics</h2>

      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total} 
        average={average} 
        positive={positive} 
      />
    </div>
  )
}

export default App