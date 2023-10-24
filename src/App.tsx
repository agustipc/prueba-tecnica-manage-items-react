import './App.css'
import { Item } from './components/Item'
import { useItems } from './hooks/useItems'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`
export interface Item {
  id: ItemId // format of UUID
  text: string
  timestamp: number
}

function App() {
  const { items, addItem, removeItem } = useItems()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget
    const input = elements.namedItem('item')

    const isInput = input instanceof HTMLInputElement
    if (!isInput || input === null) return

    addItem(input.value)

    input.value = ''
  }

  const createHandleRemoveItem = (id: ItemId) => () => {
    removeItem(id)
  }

  return (
    <main>
      <aside>
        <h1>Prueba técnica React</h1>
        <h2>Add items to list</h2>
        <form aria-label="Add item to list" onSubmit={handleSubmit}>
          <label htmlFor="">
            Elemento a introducir:
            <input type="text" name="item" required placeholder="Wake up..." />
          </label>
          <button>Add item</button>
        </form>
      </aside>
      <section>
        <h2>List of Items</h2>
        {items.length === 0 ? (
          <p>No items</p>
        ) : (
          <ul>
            {items.map((item) => {
              return (
                <Item
                  handleClick={createHandleRemoveItem(item.id)}
                  {...item}
                  key={item.id}
                />
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
