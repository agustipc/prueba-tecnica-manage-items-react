import { ItemId } from '../App'

export function Item({
  id,
  text,
  handleClick
}: {
  id: ItemId
  text: string
  handleClick: () => void
}) {
  return (
    <li key={id}>
      {text}
      <button onClick={handleClick}>Delete</button>
    </li>
  )
}
