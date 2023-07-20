import { useEffect, useState, useCallback } from 'react'
import { Rovers } from '../../utils/configData'
import { setRoverSelected, setCameraSelected, setDateSelected, setApiKey } from '../../redux/generalSlice'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import { Tooltip } from 'react-tooltip'

import './Sidebar.scss'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-tooltip/dist/react-tooltip.css'

export const Sidebar = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const dispatch = useDispatch()
  const general = useSelector((state) => state.general)
  const [isEarthDate, setIsEarthDate] = useState(true)
  const [earthDate, setEarthDate] = useState(new Date('2020-01-22T00:00:00'))
  const [martianDate, setMartianDate] = useState(1500)
  const [saveButtonText, setSaveButtonText] = useState('Save Configuration')

  // updates the earth date when changed
  const handleEarthDateChange = useCallback((date) => {
    setEarthDate(date)
    dispatch(setDateSelected(date))
  }, [dispatch])

  // updates the martian date when changed
  const handleMartianDateChange = useCallback((e) => {
    const value = e.target.value
    if (!isNaN(value) && value >= 0 && value <= 9999) {
      setMartianDate(value)
    }
  }, [])

  // triggers the dispatch when the user blur the martian date input
  const handleMartianDateBlur = useCallback(() => {
    dispatch(setDateSelected(martianDate))
  }, [dispatch, martianDate])

  // triggers the dispatch when the user press Enter on the martian date input
  const handleMartianDateKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        dispatch(setDateSelected(martianDate))
      }
    },
    [dispatch, martianDate]
  )

  // triggers the dispatch when the user changes the date type
  const handleToggleDate = useCallback(() => {
    if (!isEarthDate) {
      dispatch(setDateSelected(earthDate))
    } else {
      dispatch(setDateSelected(martianDate))
    }
    setIsEarthDate(!isEarthDate)
  }, [dispatch, earthDate, isEarthDate, martianDate])

  // opens the sidebar menu
  const openNav = useCallback(() => {
    setSidebarOpened(true)
  }, [])

  // closes the sidebar menu
  const closeNav = useCallback(() => {
    setSidebarOpened(false)
  }, [])

  // triggers the dispatch when the user select a rover, sets cameras on null
  const selectRover = useCallback(
    ({ rover }) => {
      dispatch(setRoverSelected(rover))
      dispatch(setCameraSelected(null))
    },
    [dispatch]
  )

  // triggers the dispatch when the user select a camera
  const selectCamera = useCallback(
    ({ camera }) => {
      dispatch(setCameraSelected(camera))
    },
    [dispatch]
  )

  // resets the saved api key
  const forgetAPIKey = useCallback(() => {
    localStorage.removeItem('API_KEY')
    dispatch(setApiKey(null))
  }, [dispatch])

  // saves the current config
  const saveConfig = useCallback(() => {
    const config = {
      roverSelected: general.roverSelected,
      cameraSelected: general.cameraSelected,
      dateSelected: isEarthDate ? earthDate : martianDate,
      isEarthDate
    }
    localStorage.setItem('config', JSON.stringify(config))
    setSaveButtonText('Configuration Saved!')
  }, [general.cameraSelected, general.roverSelected, earthDate, isEarthDate, martianDate])

  // loads the config saved
  const loadConfig = useCallback(() => {
    const config = JSON.parse(localStorage.getItem('config'))
    if (!config) return

    dispatch(setRoverSelected(config.roverSelected))
    dispatch(setCameraSelected(config.cameraSelected))
    setIsEarthDate(config.isEarthDate)

    if (config.isEarthDate) {
      setEarthDate(new Date(config.dateSelected))
      dispatch(setDateSelected(new Date(config.dateSelected)))
    } else {
      setMartianDate(Number(config.dateSelected))
      dispatch(setDateSelected(Number(config.dateSelected)))
    }
  }, [dispatch])

  // reset the button text on configuration change
  useEffect(() => {
    setSaveButtonText('Save Configuration')
  }, [
    general.roverSelected,
    general.cameraSelected,
    isEarthDate,
    earthDate,
    martianDate
  ])

  useEffect(() => {
    // set default rover
    if (!general.roverSelected.name) {
      dispatch(setRoverSelected(Rovers.find(rover => rover.name === 'Curiosity')))
    }
  }, [])

  return (
        <>
            <div className={`sidebar ${sidebarOpened ? 'sidebar-opened' : 'sidebar-closed'}`}>
                <div className='rovers-cameras-filters'>
                    <span className="closebtn" onClick={closeNav}>×</span>
                    <span><b>Select Rover:</b></span>
                    {
                        Rovers.map((rover, index) => (
                            // if the rover is the selected one, is highlighted
                            <span className={`options ${general.roverSelected && general.roverSelected.name === rover.name ? 'span-selected' : ''}`}
                                    key={index}
                                    onClick={() => selectRover({ rover })}>{rover.name}</span>
                        ))
                    }
                    <span className='title'>{general.roverSelected && general.roverSelected.cameras.length > 0 && <b>Select Camera:</b>}</span>
                    {
                        // if the camera is the selected one, is highlighted
                        general.roverSelected && (general.roverSelected.cameras.map((camera, index) => <span onClick={() => selectCamera({ camera })} className={`options ${general.cameraSelected && general.cameraSelected.name === camera.name ? 'span-selected' : ''}`} key={index}>{camera.name}</span>))
                    }
                </div>
                <div className='date-filter'>
                    <Form>
                        <div className="d-flex align-items-center">
                            <div className='col-md-8'>
                                {
                                    isEarthDate
                                      ? <span className="me-2">Earth Date</span>
                                      : <span
                                            className="me-2"
                                            data-tooltip-id="martian-tooltip"
                                            data-tooltip-content="Days from rover landing"
                                            data-tooltip-place="top">Martian Date</span>
                                }
                                <Tooltip id='martian-tooltip' />
                            </div>
                            <div className='col-md-4'>
                            <Form.Check
                                type="switch"
                                id="toggle-switch"
                                label=""
                                checked={isEarthDate}
                                onChange={handleToggleDate}
                            />
                            </div>
                        </div>
                    </Form>
                    <div> {
                        isEarthDate
                          ? <DatePicker
                                selected={earthDate}
                                showYearDropdown
                                onChange={handleEarthDateChange}
                                dateFormat="yyyy-MM-dd"
                            />
                          : <input
                            type="number"
                            value={martianDate}
                            onChange={handleMartianDateChange}
                            onBlur={handleMartianDateBlur}
                            onKeyDown={handleMartianDateKeyPress}
                            max={99999}
                        />
                        }
                    </div>
                    <button className='btn-apikey btn btn-success' onClick={saveConfig}>{saveButtonText}</button>
                    <button className='mt-2 btn btn-secondary' onClick={loadConfig}>Load Configuration</button>
                </div>
                <button className='btn-apikey btn btn-danger' onClick={forgetAPIKey}>Forget API KEY</button>

            </div>

            <div className={`sidebar-button ${sidebarOpened ? 'sidebar-button-opened' : 'sidebar-button-closed'}`}>
                <button className="openbtn" onClick={openNav}>☰ Configurations</button>
            </div>
        </>
  )
}
