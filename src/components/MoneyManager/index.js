import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
    objs: [],
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
    objs: [],
  },
]

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    title: '',
    amount: 0,
    type: '',
    transactionDetails: [],
  }

  removeData = id => {
    const {transactionDetails, balance, income, expenses} = this.state
    const theObj = transactionDetails.find(each => {
      if (each.id === id) {
        return true
      }
    })
    const updatedDetails = transactionDetails.filter(each => each !== theObj)
    if (theObj.type === 'EXPENSES') {
      this.setState({
        balance: theObj.amount + balance,
        expenses: expenses - theObj.amount,
      })
    }
    if (theObj.type === 'INCOME') {
      this.setState({
        balance: balance - theObj.amount,
        income: income - theObj.amount,
      })
    }
  }

  addBalance = () => {
    const {income, expenses} = this.state
    this.setState({balance: income - expenses})
  }
  addData = event => {
    event.preventDefault()
    const {title, amount, type} = this.state

    const newData = {
      id: uuidv4(),
      type: type,
      title: title,
      amount: amount,
    }

    if (type === 'INCOME') {
      this.setState(prevState => ({income: prevState.income + amount}))
    }
    if (type === 'EXPENSES') {
      this.setState(prevState => ({expenses: prevState.expenses + amount}))
    }

    if (title !== '' && amount !== '' && type !== '') {
      this.setState(prevState => ({
        transactionDetails: [...prevState.transactionDetails, newData],
      }))
      this.setState({
        title: '',
        amount: 0,
        type: '',
      })
    }
    this.addBalance()
  }

  addTitle = event => {
    const theTitle = event.target.value
    this.setState({title: theTitle})
  }
  addAmount = event => {
    const theAmount = event.target.value
    this.setState({amount: theAmount})
  }
  addType = event => {
    const theType = event.target.value
    this.setState({type: theType})
  }

  render() {
    const {balance, income, expenses, transactionDetails} = this.state

    return (
      <div className="the-cont">
        <div className="upper">
          <h1 className="user">Hi Richard</h1>
          <p className="welcome-note">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>

        <MoneyDetails balance={balance} income={income} expenses={expenses} />

        <div className="lower-cards">
          <div className="form-elem">
            <form onSubmit={this.addData}>
              <h1 className="heading">Add Transaction</h1>

              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                className="bar"
                placeholder="TITLE"
                id="title"
                onChange={this.addTitle}
              />

              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <input
                type="text"
                className="bar"
                placeholder="AMOUNT"
                id="amount"
                onChange={this.addAmount}
              />

              <label htmlFor="options" className="label">
                TYPE
              </label>
              <select id="options" onChange={this.addType}>
                <option value="INCOME" selected>
                  Income
                </option>
                <option value="EXPENSES">Expenses</option>
              </select>

              <button type="submit" className="submit-btn">
                Add
              </button>
            </form>
          </div>

          <div className="history-elem">
            <h1 className="heading">History</h1>
            <div className="data-elem">
              <div className="titles">
                <p className="title">Title</p>
                <p className="title">Amount</p>
                <p className="title">Type</p>
              </div>
              <ul className="lists">
                {transactionDetails.map(each => (
                  <TransactionItem
                    details={each}
                    key={each.id}
                    onClicked={this.removeData}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
