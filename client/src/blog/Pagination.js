import React from 'react'

const Pagination = ({page, paginationChange , pageNumber}) => {

    return (
        <div >
            <div className="mx-2 page">
                <div onClick={() => paginationChange(page)} className={`
                ${pageNumber === page && 'page-num'} border px-3`}>{page}   </div>     
            </div>
            
        </div>
    )
}

export default Pagination
