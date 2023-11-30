// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, onClicked} = props
  const {id, type,title,  amount} = details
  const isTrue = type === 'INCOME'
  const displayText = isTrue ? 'Income' : 'Expenses'

  return (
    <li className="the-list">
      <p className="list">{title}</p>
      <p className="list">{amount}</p>
      <p className="list">{displayText}</p>
      <button className="delete-btn" data-testid="delete" onClick={onClicked}>
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
