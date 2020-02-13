import { getByTestId } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { exampleDom } from '../exampleDom'

describe('testing DOM', () => {
  let container: HTMLElement | null = null
  beforeEach(() => {
    container = exampleDom()
  })

  afterEach(() => {
    container!.remove()
    container = null
  })

  it('remove Node', async () => {
    const button = getByTestId(container!, 'clicked-test')
    button.click()
    expect(button).not.toBeInTheDocument()
  })
  it('add Node with some text', () => {
    const button = getByTestId(container!, 'clicked-test')
    const text = 'To stop or start the animation click on it...'
    button.click()
    expect(getByTestId(container!, 'btn-less__count')).toBeTruthy()
    expect(getByTestId(container!, 'btn-less__count')).toHaveTextContent(text)
  })
})
