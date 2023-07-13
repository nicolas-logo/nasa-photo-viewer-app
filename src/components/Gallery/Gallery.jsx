import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import { GetRequestToken, CancelRequestToken, GetImages } from './../../services/nasaService';

import './Galerry.scss';
import { Sidebar } from '../Sidebar/Sidebar';

const API_KEY = 'sSqX2oKXjFXhvIyjNvenSbDlFF3bKrUor1GIad4k';
let requestToken;

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  const openModal = (url) => {
    setModalImageUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    requestToken = GetRequestToken();

    fetchImages();

    return() => {
        //canceling flying requests on component unmount
        CancelRequestToken({requestToken});
    }
  }, []);

  const fetchImages = async () => {
    const newImages = await GetImages({requestToken, page, API_KEY, rover: "curiosity", dateFromPlanet: "sol", dateFromDate: 1000});
    setImages((prevImages) => [...prevImages, ...newImages]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<h4 style={{color:"white"}}>Loading...</h4>}
      >
        {images.map((image) => (
          <img
            key={image.id}
            src={image.img_src}
            alt={image.rover.name}
            onClick={() => openModal(image.img_src)}
            className='images'
          />
        ))}
      </InfiniteScroll>
      <Sidebar />
      <Modal portalClassName='photo-modal' isOpen={isModalOpen} onRequestClose={closeModal}>
        <img src={modalImageUrl} alt="" />
      </Modal>
    </div>
  );
};

export default Gallery;
