// eslint-disable-next-line react/prop-types
export const InfoMessages = ({ apiErrorMessage, imagesLength, loading }) => (
    <div data-testid="info-messages">
        {apiErrorMessage !== null && <h4 className='text-danger'>{apiErrorMessage}</h4>}
        {imagesLength === 0 && !loading && <h4 className='text-warning'>No photos retrieved</h4>}
        {loading && <h4 className='text-white'>Loading...</h4>}
    </div>
)
