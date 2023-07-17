import { useEffect, useState } from 'react'
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
  const [earthDate, setEarthDate] = useState(new Date())
  const [martianDate, setMartianDate] = useState(1500)

  // updates the earth date when changed
  const handleEarthDateChange = (date) => {
    setEarthDate(date)
    dispatch(setDateSelected(date))
  }

  // updates the martian date when changed
  const handleMartianDateChange = (e) => {
    const value = e.target.value
    // Check if the value is a valid number and within the range
    if (!isNaN(value) && value >= 0 && value <= 9999) {
      setMartianDate(value)
    }
  }

  // triggers the dispatch when the user blur the martian date input
  const handleMartianDateBlur = () => {
    dispatch(setDateSelected(martianDate))
  }

  // triggers the dispatch when the user press Enter on the martian date input
  const handleMartianDateKeyPress = async (event) => {
    if (event.key === 'Enter') {
      dispatch(setDateSelected(martianDate))
    }
  }

  // triggers the dispatch when the user changes the date type
  const handleToggleDate = () => {
    if (!isEarthDate) {
      dispatch(setDateSelected(earthDate))
    } else {
      dispatch(setDateSelected(martianDate))
    }

    setIsEarthDate(!isEarthDate)
  }

  // opens the sidebar menu
  const openNav = () => {
    setSidebarOpened((sidebarOpened) => !sidebarOpened)
  }

  // closes the sidebar menu
  const closeNav = () => {
    setSidebarOpened(false)
  }

  // triggers the dispatch when the user select a rover, sets cameras on null
  const selectRover = ({ rover }) => {
    dispatch(setRoverSelected(rover))
    dispatch(setCameraSelected(null))
  }

  // triggers the dispatch when the user select a camera
  const selectCamera = ({ camera }) => {
    dispatch(setCameraSelected(camera))
  }

  // resets the saved api key
  const forgetAPIKey = () => {
    localStorage.removeItem('API_KEY')
    dispatch(setApiKey(null))
  }

  // saves the current config
  const saveConfig = () => {
    localStorage.setItem('roverSelected', JSON.stringify(general.roverSelected))
    localStorage.setItem('cameraSelected', JSON.stringify(general.cameraSelected))
    localStorage.setItem('dateSelected', general.dateSelected)
    localStorage.setItem('isEarthDate', isEarthDate)
  }

  // loads the config saved
  const loadConfig = () => {
    // eslint-disable-next-line no-debugger
    debugger
    const roverSelected = localStorage.getItem('roverSelected')
    const cameraSelected = localStorage.getItem('cameraSelected')
    const dateSelected = localStorage.getItem('dateSelected')
    const isED = localStorage.getItem('isEarthDate')

    // since we're using the same var for earth and martian date, checks which one is saved
    if ((isED === 'true')) {
      setIsEarthDate(true)
      setEarthDate(new Date(dateSelected + 'T00:00:00'))
      dispatch(setDateSelected(new Date(dateSelected + 'T00:00:00')))
    } else {
      setIsEarthDate(false)
      setMartianDate(Number(dateSelected))
      dispatch(setDateSelected(Number(dateSelected)))
    }

    dispatch(setRoverSelected(JSON.parse(roverSelected)))
    dispatch(setCameraSelected(JSON.parse(cameraSelected)))
  }

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
                    <button className='btn-apikey btn btn-success' onClick={saveConfig}>Save Configuration</button>
                    <button className='mt-2 btn btn-info' onClick={loadConfig}>Load Configuration</button>
                </div>
                <button className='btn-apikey btn btn-danger' onClick={forgetAPIKey}>Forget API KEY</button>

            </div>

            <div className={`sidebar-button ${sidebarOpened ? 'sidebar-button-opened' : 'sidebar-button-closed'}`}>
                <button className="openbtn" onClick={openNav}>☰ Configurations</button>
            </div>
        </>
  )
}
