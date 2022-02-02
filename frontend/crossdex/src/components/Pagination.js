import React, { useState } from 'react'

const Pagination = ({ onChange, items, itemsPerPage }) => {

    const pagesCount = Math.ceil(items / itemsPerPage)
    const pages = []
    const [current, setCurrent] = useState(1)

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className="d-flex justify-content-center mt-5 w-100">
            <ul className="pagination pagination-md" style={{ marginBottom: '2px' }}>
                <li className={"page-item" + (current === 1 ? ' disabled' : '')}>
                    <button className="page-link" onClick={() => { setCurrent(current - 1); onChange(current - 1) }}>&laquo;</button>
                </li>

                {pages.map((p) =>
                    <li className={"page-item" + (current === p ? ' active' : '')} key={p}>
                        <button className="page-link" onClick={() => { setCurrent(p); onChange(p) }}>{p}</button>
                    </li>
                )}

                <li className={"page-item" + (current === pagesCount ? ' disabled' : '')}>
                    <button className="page-link" onClick={() => { setCurrent(current + 1); onChange(current + 1) }}>&raquo;</button>
                </li>
            </ul>
        </div>

    )
}

export default Pagination