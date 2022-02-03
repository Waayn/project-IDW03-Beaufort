import React from 'react'

const Pagination = ({ onChange, items, itemsPerPage, currentPage, setCurrent }) => {

    const pagesCount = Math.ceil(items / itemsPerPage)
    const pages = []
    const current = currentPage

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const getCurrentMin = () => {
        if (current > 2) return current - 3
        else if (current === 2) return current - 2
        else return current - 1
    }

    const getCurrentMax = () => {
        if (current < pagesCount + 2) return current + 2
        else if (current < pagesCount + 1) return current + 1
        else return current
    }

    return (
        <div className="d-flex justify-content-center mt-5 pt-4 w-100">
            <ul className="pagination pagination-md" style={{ marginBottom: '2px' }}>
                <li className={"page-item" + (current === 1 ? ' disabled' : '')}>
                    <button className="page-link" onClick={() => { setCurrent(1); onChange(1) }}>&laquo;</button>
                </li>
                {current !== 1 && pagesCount > 3 && current > 3 &&
                    <li className="page-item disabled">
                        <button className="page-link">...</button>
                    </li>
                }
                {pages.slice(getCurrentMin(), getCurrentMax()).map((p) =>
                    <li className={"page-item" + (current === p ? ' active disabled' : '')} key={p}>
                        <button className="page-link" onClick={() => { setCurrent(p); onChange(p) }}>{p}</button>
                    </li>
                )}
                {current !== pagesCount && pagesCount > 3 && pagesCount - 2 > current &&
                    <li className="page-item disabled">
                        <button className="page-link">...</button>
                    </li>
                }
                <li className={"page-item" + (current === pagesCount ? ' disabled' : '')}>
                    <button className="page-link" onClick={() => { setCurrent(pagesCount); onChange(pagesCount) }}>&raquo;</button>
                </li>
            </ul>
        </div >

    )
}

export default Pagination