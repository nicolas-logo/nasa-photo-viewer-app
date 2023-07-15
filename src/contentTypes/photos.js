const PhotosContentType = (data) => {
    return {
        id: data.id,
        camera: data.camera,
        img_src: data.img_src,
        earth_date: data.earth_date,
        rover: data.rover
    }
}

export default PhotosContentType;