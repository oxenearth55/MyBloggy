import React from 'react'

const Pagination = ({page, paginationChange}) => {
    return (
        <div >
            <div className="mx-2 page">
                <div onClick={() => paginationChange(page)} className=" border px-3">{page}   </div>     
            </div>
            
        </div>
    )
}

export default Pagination
