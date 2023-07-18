import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { InfoMessages } from '../../../components/InfoMessages/InfoMessages'
import renderer from 'react-test-renderer'

afterEach(() => {
  cleanup()
})

describe('InfoMessages tests', () => {
  it('should renders error message when `apiErrorMessage` prop is not null', () => {
    const apiErrorMessage = 'Error: Unable to retrieve photos.'
    const { getByText } = render(<InfoMessages apiErrorMessage={apiErrorMessage} />)
    const errorMessageElement = getByText(apiErrorMessage)
    expect(errorMessageElement).toBeInTheDocument()
    expect(errorMessageElement).toHaveClass('text-danger')
  })

  it('should renders "No photos retrieved" message when `imagesLength` is 0 and not loading', () => {
    const imagesLength = 0
    const loading = false
    const { getByText } = render(<InfoMessages imagesLength={imagesLength} loading={loading} />)
    const noPhotosMessage = getByText('No photos retrieved')
    expect(noPhotosMessage).toBeInTheDocument()
    expect(noPhotosMessage).toHaveClass('text-warning')
  })

  it('should renders "Loading..." message when `loading` prop is true', () => {
    const loading = true
    const { getByText } = render(<InfoMessages loading={loading} />)
    const loadingMessage = getByText('Loading...')
    expect(loadingMessage).toBeInTheDocument()
    expect(loadingMessage).toHaveClass('text-white')
  })

  it('should does not render any message when all props are null or false', () => {
    const { queryByText } = render(<InfoMessages />)
    expect(queryByText('Error: Unable to retrieve photos.')).toBeNull()
    expect(queryByText('No photos retrieved')).toBeNull()
    expect(queryByText('Loading...')).toBeNull()
  })

  it('should should match the snapshot', () => {
    const tree = renderer.create((<InfoMessages loading={false} imagesLength={0} />)).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
