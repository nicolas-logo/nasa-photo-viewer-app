import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Modal from 'react-modal'
import { GetRequestToken, CancelRequestToken, GetImages } from './../../services/nasaService'
import { useSelector } from 'react-redux'
import { Sidebar } from '../Sidebar/Sidebar'
import { isDateVerifier } from '../../utils/utilFunctions'

import './Galerry.scss'

let requestToken

const Gallery = () => {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [noPhotos, setNoPhotos] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const [modalImageUrl, setModalImageUrl] = useState('')
  const general = useSelector((state) => state.general)

  const openModal = (url) => {
    setModalImageUrl(url)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    requestToken = GetRequestToken()

    fetchImages()

    return () => {
      // canceling flying requests on component unmount
      CancelRequestToken({ requestToken })
    }
  }, [])

  useEffect(() => {
    setPage(0)
    setImages([])
    fetchImages()
  }, [
    general.roverSelected.name,
    general.cameraSelected,
    general.dateSelected
  ])

  const fetchImages = async () => {
    setNoPhotos(false)
    setLoading(true)

    if (general.roverSelected.name) {
      const dateFromPlanet = isDateVerifier(general.dateSelected) ? 'earth_date' : 'sol'
      const newImages = await GetImages({
        requestToken,
        page,
        API_KEY: general.API_KEY,
        rover: general.roverSelected.name,
        camera: general.cameraSelected?.id,
        dateFromPlanet,
        dateFromDate: general.dateSelected
      })

      if (!newImages.error) {
        setApiErrorMessage('')
        setImages((prevImages) => [...prevImages, ...newImages])
        setPage((prevPage) => prevPage + 1)
        newImages.length > 0 ? setNoPhotos(false) : setNoPhotos(true)
      } else {
        setApiErrorMessage(newImages.message)
      }
      setLoading(false)
    }
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={noPhotos && images.length !== 0 && <h4 style={{ color: 'white' }}>No photos retrieved</h4>}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.img_src}
            alt={image.rover.name}
            onClick={() => openModal(image.img_src)}
            className='images'
          />
        ))}
        {apiErrorMessage !== '' && <h4 className='text-danger'>apiErrorMessage</h4>}
        {images.length === 0 && !loading && <h4 className='text-warning'>No photos retrieved</h4>}
        {loading && <h4 className='text-white'>Loading...</h4>}
      </InfiniteScroll>
      <Sidebar />
      <Modal portalClassName='photo-modal' isOpen={isModalOpen} onRequestClose={closeModal}>
        <img src={modalImageUrl} alt="" />
      </Modal>
    </div>
  )
}

export default Gallery
