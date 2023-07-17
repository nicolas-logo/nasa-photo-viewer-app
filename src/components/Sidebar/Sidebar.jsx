import { useEffect, useState } from 'react';
import { Rovers } from '../../utils/configData';
import { setRoverSelected, setCameraSelected, setDateSelected } from '../../redux/generalSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.scss';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Sidebar = () => {
    const [sidebarOpened, setSidebarOpened] = useState(false);
    const dispatch = useDispatch();
    const general = useSelector((state) => state.general);
    const [isEarthDate, setIsEarthDate] = useState(true);
    const [earthDate, setEarthDate] = useState(new Date('01/01/2020'));
    const [martianDate, setMartianDate] = useState(1500);

    const handleEarthDateChange = (date) => {
        setEarthDate(date);
        dispatch(setDateSelected(date));
    };

    const handleMartianDateChange = (e) => {
        const value = e.target.value;
        // Check if the value is a valid number and within the range
        if (!isNaN(value) && value >= 0 && value <= 9999) {
            setMartianDate(value);
            dispatch(setDateSelected(value));
        }
      };

    const handleToggleDate = () => {
        if (!isEarthDate) {
            dispatch(setDateSelected(earthDate));
        }
        else {
            dispatch(setDateSelected(martianDate));
        }

        setIsEarthDate(!isEarthDate);
    }

    const openNav = () => {
        setSidebarOpened((sidebarOpened) => !sidebarOpened);
    }
    
    const closeNav = () => {
        setSidebarOpened(false);
    }

    const selectRover = ({rover}) => {
        dispatch(setRoverSelected(rover));
        dispatch(setCameraSelected(null));
    }

    const selectCamera = ({camera}) => {
        dispatch(setCameraSelected(camera));
    }

    useEffect(() => {
        //set default rover
        if (!general.roverSelected.name) {
            dispatch(setRoverSelected(Rovers.find(rover => rover.name === 'Curiosity')));
        }
    }, [])

    return (
        <>
            <div className={`sidebar ${ sidebarOpened ? 'sidebar-opened' : 'sidebar-closed' }`}>
                <span  className="closebtn" onClick={closeNav}>×</span>
                <span><b>Select Rover:</b></span>
                {
                    Rovers.map((rover, index) => (
                        <span className={`options ${ general.roverSelected && general.roverSelected.name === rover.name ? 'span-selected' : '' }`} 
                                key={index} 
                                onClick={() => selectRover({rover})}>{rover.name}</span>
                    ))
                }
                <span className='title'>{general.roverSelected && general.roverSelected.cameras.length > 0 && <b>Select Camera:</b>}</span>
                {   
                    general.roverSelected && (general.roverSelected.cameras.map((camera, index) => <span onClick={() => selectCamera({camera})} className={`options ${ general.cameraSelected && general.cameraSelected.name === camera.name ? 'span-selected' : '' }`} key={index}>{camera.name}</span>))
                }

                <Form>
                    <div className="d-flex align-items-center">
                        <div className='col-md-8'>
                        <span className="me-2">{isEarthDate ? "Earth Date" : "Martian Date"}</span>
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
                    isEarthDate ?
                        <DatePicker
                            selected={earthDate}
                            onChange={handleEarthDateChange}
                            dateFormat="MM-dd-yyyy"
                        />
                    : <input
                        type="number"
                        value={martianDate}
                        onChange={handleMartianDateChange}
                        max={9999}
                    />
                    }
                    
                </div>      
            </div>
            
            <div className={`sidebar-button ${ sidebarOpened ? 'sidebar-button-opened' : 'sidebar-button-closed' }`}>
                <button className="openbtn" onClick={openNav}>☰ Configurations</button>  
            </div>
        </>
    )
}