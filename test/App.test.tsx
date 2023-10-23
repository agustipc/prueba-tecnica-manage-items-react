import React from 'react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App', () => {
  test('should render', () => {
    render(<App />)

    const title = screen.getByText('Prueba técnica React')

    expect(title).toBeDefined()
  })

  test('should add a new item and remove the item', async () => {
    const user = userEvent.setup()
    // render(<App />)

    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()

    const form = screen.getByRole('form')
    expect(form).toBeDefined()

    const button = form.querySelector('button')
    expect(button).toBeDefined()

    const text1 = 'Element test'
    const text2 = 'Element test 2'

    await user.type(input, text1)
    await user.click(button!)
    await user.type(input, text2)
    await user.click(button!)

    const list = screen.getByRole('list')
    expect(list).toBeDefined()
    expect(list.children.length).toBe(2)

    const item = screen.getByText(text1)
    const removeButton = item.querySelector('button')
    expect(removeButton).toBeDefined()

    await user.click(removeButton!)
    expect(list.children.length).toBe(1)
  })
})
