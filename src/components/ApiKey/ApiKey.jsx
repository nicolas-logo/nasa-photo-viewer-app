import './ApiKey.scss'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useCallback, useRef, useState, useEffect } from 'react'
import { validateAPIKey } from '../../services/nasaService'
import { useDispatch } from 'react-redux'
import { setApiKey } from '../../redux/generalSlice'

export const ApiKey = () => {
  const dispatch = useDispatch()
  const spanInput = useRef(null)
  const [apiKeyValue, setApiKeyValue] = useState('')
  const [validateState, setValidateState] = useState('')

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let animationFrameId = null
  let intervalId = null

  // Animation loop for the title letters
  const letterAnimation = useCallback(() => {
    let iteration = 0

    const animate = () => {
      if (spanInput.current) {
        spanInput.current.innerText = spanInput.current.dataset.value
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return spanInput.current.dataset.value[index]
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join('')

        if (iteration >= spanInput.current.dataset.value.length) {
          iteration = 0 // Reset the iteration for continuous animation
        } else {
          animationFrameId = requestAnimationFrame(animate)
          iteration += 1 / 3
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate)
  }, [letters])

  // Start the animation loop on component mount
  useEffect(() => {
    intervalId = setInterval(() => {
      letterAnimation()
    }, 5000)

    return () => {
      // Clean up the animation frames and interval on component unmount
      clearInterval(intervalId)
      cancelAnimationFrame(animationFrameId)
    }
  }, [letterAnimation])

  // checks if the user pressed Enter to validate the key
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      setValidateState('Validating')
      const { error } = await validateAPIKey(apiKeyValue)

      if (error) {
        setValidateState('Error')
      } else {
        localStorage.setItem('API_KEY', apiKeyValue)
        dispatch(setApiKey(apiKeyValue))
      }
    }
  }

  // updates the api key whenever the user press a key
  const handleChange = (event) => {
    setApiKeyValue(event.target.value)
  }

  return (
    <div className="apiKey">
      <h1 id="title" className="centered">
        Welcome to <span className="fancy"><b>Mars</b></span>
      </h1>
      <div className='row'>
        <div className='col-md-8 offset-md-2 mt-5'>
          <span className='spanInput'
            ref={spanInput}
            data-value="Enter your API KEY">Enter your API KEY</span>
          <input
            type='text'
            className="form-control apiInput"
            placeholder="API Key..."
            maxLength="50"
            value={apiKeyValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}></input>
          {validateState === 'Error' && <span className='validate-text text-danger'>Wrong API KEY</span>}
          {validateState === 'Validating' && <span className='validate-text text-warning'>Validating...</span>}
        </div>
      </div>
      <div className='span-generate'><span>Don&apos;t have it? Please generate one visiting <a href='https://api.nasa.gov/' target='_blank' rel="noreferrer">https://api.nasa.gov/</a></span></div>
    </div>
  )
}
