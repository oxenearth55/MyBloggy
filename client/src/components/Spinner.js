import React from 'react';
// import spinner from '../photo/spinner.gif';

const Spinner = () => {
    return (
        <div className="text-center my-5">
            <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-secondary" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-light" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-dark" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </div>
            
    )
}

export default Spinner;
