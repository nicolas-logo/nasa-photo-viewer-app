import { useEffect, useState } from 'react';
import { Rovers } from '../../utils/configData';
import { setRoverSelected, setCameraSelected } from '../../redux/generalSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.scss';

export const Sidebar = () => {
    const [sidebarOpened, setSidebarOpened] = useState(false);
    const dispatch = useDispatch();
    const general = useSelector((state) => state.general);

    const openNav = () => {
        setSidebarOpened((sidebarOpened) => !sidebarOpened);
    }
    
    const closeNav = () => {
        setSidebarOpened(false);
    }

    const selectRover = ({rover}) => {debugger;
        dispatch(setRoverSelected(rover));
        dispatch(setCameraSelected(null));
    }

    const selectCamera = ({camera}) => {
        dispatch(setCameraSelected(camera.name));
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
                    general.roverSelected && (general.roverSelected.cameras.map((camera, index) => <span onClick={() => selectCamera({camera})} className={`options ${ general.cameraSelected && general.cameraSelected === camera.name ? 'span-selected' : '' }`} key={index}>{camera.name}</span>))
                }                
            </div>
            
            <div className={`sidebar-button ${ sidebarOpened ? 'sidebar-button-opened' : 'sidebar-button-closed' }`}>
                <button className="openbtn" onClick={openNav}>☰ Configurations</button>  
            </div>
        </>
    )
}