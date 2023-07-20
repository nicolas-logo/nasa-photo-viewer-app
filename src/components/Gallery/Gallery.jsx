import { useState, useEffect, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Modal from 'react-modal'
import { GetRequestToken, CancelRequestToken, GetImages } from './../../services/nasaService'
import { useSelector } from 'react-redux'
import { Sidebar } from '../Sidebar/Sidebar'
import { isDateVerifier } from '../../utils/utilFunctions'
import { InfoMessages } from '../InfoMessages/InfoMessages'

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

  // open the image selected on a modal when clicked
  const openModal = useCallback((url) => {
    setModalImageUrl(url)
    setIsModalOpen(true)
  }, [])

  // close the modal of the image selected
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  // when the component is rendered, ask for a token for the requests
  // and gets the default images
  useEffect(() => {
    requestToken = GetRequestToken()
    fetchImages()

    return () => {
      // canceling flying requests on component unmount
      CancelRequestToken({ requestToken })
    }
  }, [])

  // when the user select a rover, a camera or change the date
  // on the Sidebar component, it refresh que search
  useEffect(() => {
    CancelRequestToken({ requestToken })
    requestToken = GetRequestToken()
    setPage(0)
    setImages([])
    fetchImages()
  }, [
    general.roverSelected.name,
    general.cameraSelected,
    general.dateSelected
  ])

  // get images from the api
  const fetchImages = async () => {
    setNoPhotos(false)
    setLoading(true)

    try {
      // since we're using the same var for both Martian and Earth date, it checks which one is it
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

        // the api could throw an error for overuse, so we handle that
        if (!newImages.error) {
          setApiErrorMessage('')
          setImages((prevImages) => [...prevImages, ...newImages])
          setPage((prevPage) => prevPage + 1)
          setNoPhotos(newImages.length === 0)
        } else {
          setApiErrorMessage(newImages.message)
        }
      }
    } catch (error) {
      setApiErrorMessage('An error occurred while fetching images.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* using Infinite scroll to load new images
          when the user reach the bottom or show the message
      */}
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={images.length > 0}
        loader={noPhotos && images.length > 0 && <h4 style={{ color: 'white' }}>No photos retrieved</h4>}
      >
        <div className="image-gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.img_src}
              alt={image.rover.name}
              onClick={() => openModal(image.img_src)}
              className="images"
            />
          ))}
        </div>
        <InfoMessages apiErrorMessage={apiErrorMessage} imagesLength={images.length} loading={loading} />
      </InfiniteScroll>
      <Sidebar />
      <Modal portalClassName="photo-modal" isOpen={isModalOpen} onRequestClose={closeModal}>
        <img src={modalImageUrl} alt="" />
      </Modal>
    </div>
  )
}

export default Gallery
