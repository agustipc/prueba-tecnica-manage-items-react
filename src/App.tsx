import { useState } from 'react'
import './App.css'

type ItemId = `${string}-${string}-${string}-${string}-${string}`
interface Item {
  id: ItemId // format of UUID
  text: string
  timestamp: number
}

// const ITEMS_MOCK: Item[] = [
//   {
//     id: crypto.randomUUID(),
//     text: 'Elemento 1',
//     timestamp: Date.now()
//   },
//   {
//     id: crypto.randomUUID(),
//     text: 'Elemento 2',
//     timestamp: Date.now()
//   },
//   {
//     id: crypto.randomUUID(),
//     text: 'Elemento 3',
//     timestamp: Date.now()
//   },
//   {
//     id: crypto.randomUUID(),
//     text: 'Elemento 4',
//     timestamp: Date.now()
//   }
// ]

function App() {
  const [items, setItems] = useState<Item[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget
    const input = elements.namedItem('item')

    const isInput = input instanceof HTMLInputElement
    if (!isInput || input === null) return

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now()
    }

    setItems((prevItems) => [...prevItems, newItem])
    input.value = ''
  }

  const createHandleRemoveItem = (id: ItemId) => () => {
    setItems((prevItems) => {
      return prevItems.filter((currentItem) => currentItem.id !== id)
    })
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
            {items.map((item) => (
              <li key={item.id}>
                {item.text}
                <button onClick={createHandleRemoveItem(item.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
