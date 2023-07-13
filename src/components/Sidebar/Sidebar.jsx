import { useState } from 'react';
import { Rovers } from '../../utils/configData';
import './Sidebar.scss';

export const Sidebar = () => {
    const [sidebarOpened, setSidebarOpened] = useState(false);
    const [roverFilter, setRoverFilter] = useState(null);
    const [cameraFilter, setCameraFilter] = useState(null);

    const openNav = () => {
        setSidebarOpened((sidebarOpened) => !sidebarOpened);
    }
    
    const closeNav = () => {
        setSidebarOpened(false);
    }

    const selectRover = ({rover}) => {
        setRoverFilter(rover);
        setCameraFilter(null);
    }

    const selectCamera = ({camera}) => {
        setCameraFilter(camera);
    }

    return (
        <>
            <div className={`sidebar ${ sidebarOpened ? 'sidebar-opened' : 'sidebar-closed' }`}>
                <span  className="closebtn" onClick={closeNav}>×</span>
                <span><b>Select Rover:</b></span>
                {
                    Rovers.map((rover, index) => (
                        <span className={`options ${ roverFilter && roverFilter.name === rover.name ? 'span-selected' : '' }`} 
                                key={index} 
                                onClick={() => selectRover({rover})}>{rover.name}</span>
                    ))
                }
                <span className='title'>{roverFilter && roverFilter.cameras.length > 0 && <b>Select Camera:</b>}</span>
                {   
                    roverFilter && (roverFilter.cameras.map((camera, index) => <span onClick={() => selectCamera({camera})} className={`options ${ cameraFilter && cameraFilter.name === camera.name ? 'span-selected' : '' }`} key={index}>{camera.name}</span>))
                }                
            </div>
            
            <div className={`sidebar-button ${ sidebarOpened ? 'sidebar-button-opened' : 'sidebar-button-closed' }`}>
                <button className="openbtn" onClick={openNav}>☰ Configurations</button>  
            </div>
        </>
    )
}