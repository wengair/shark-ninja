import React from 'react'
import { selectProductSales, sortSales, selectSort } from './productSlice'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

function ProductSaleList() {
  const sales = useSelector(selectProductSales)
  const sort = useSelector(selectSort)
  
  const dispatch = useDispatch();
  const col = {
    1: 'weekEnding',
    2: 'retailSales',
    3: 'wholesaleSales',
    4: 'unitsSold',
    5: 'retailerMargin',
  }
  
  const decideClass = (colN) => {
    return (sort.col === col[colN]) ? 'sort-chev selected' : 'sort-chev'
  }

  const decideOrder = (colN) => {
    return (sort.col === col[colN]) && (sort.order === 1) ? faChevronUp : faChevronDown
  }
  
  return (
    <div className='list-wrapper'>
      <div className='list-title'>
        <div>WEEK ENDING<FontAwesomeIcon icon={decideOrder(1)} onClick={() => dispatch(sortSales(col[1]))} className={decideClass(1)}/></div>
        <div>RETAIL SALES<FontAwesomeIcon icon={decideOrder(2)} onClick={() => dispatch(sortSales(col[2]))} className={decideClass(2)}/></div>
        <div>WHOLESALE SALES<FontAwesomeIcon icon={decideOrder(3)} onClick={() => dispatch(sortSales(col[3]))} className={decideClass(3)}/></div>
        <div>UNIT SOLD<FontAwesomeIcon icon={decideOrder(4)} onClick={() => dispatch(sortSales(col[4]))} className={decideClass(4)}/></div>
        <div>RETAILER MARGIN<FontAwesomeIcon icon={decideOrder(5)} onClick={() => dispatch(sortSales(col[5]))} className={decideClass(5)}/></div>
      </div>
      <div className='items-wrapper'>
        {sales.map(sale => (
          <div className='items' key={sale.weekEnding}>
            <p>{sale.weekEnding}</p>
            <p>{sale.retailSales}</p>
            <p>{sale.wholesaleSales}</p>
            <p>{sale.unitsSold}</p>
            <p>{sale.retailerMargin}</p>
          </div>
        ))}
      </div>
      <style jsx='true'>
        {`
        .list-wrapper {
          max-height: calc(60% - 70px);
          background-color: #FFFFFF;
          display: flex;
          flex-direction: column;
          border-radius: 3px;
          overflow: hidden;
        }

        .list-title {
          display: flex;
          padding: 20px 20px;
          color: #758098;
          border-bottom: 1px solid #FAFAFC;
        }

        .list-title div {
          width: 20%;
          text-align: right;
        }

        .list-title div:first-child {
          text-align: left;
        }

        .items-wrapper {
          position: relative;
          overflow: hidden;
          height: 100%;
          display: inline-block;
        }

        .items-wrapper:hover {
          Overflow: overlay;
        }

        .items {
          display: flex;
          border-top: 1px solid #FAFAFC;
          padding: 0px 20px;
          color: #ADBAC8;
        }

        .items p {
          width: 20%;
          text-align: right;
          padding-right: 20px;
        }
        
        .items p:first-child {
          width: 20%;
          text-align: left;
        }

        .sort-chev {
          margin: auto 5px;
          opacity: 0.2;
          cursor: pointer;
        }

        .selected {
          opacity: 1;
        }
        `}
      </style>
    </div>
  )
}

export default ProductSaleList
