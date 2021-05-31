import React, {useEffect} from 'react'
import { selectProductInfo } from './productSlice'
import { useSelector } from 'react-redux'

function ProductInfo() {
  const productInfo = useSelector(selectProductInfo)

  useEffect(() => {
    console.log(productInfo)
  }, [productInfo])

  return (
    <div className='info-wrapper'>
      <div className='product-info'>
        <img src={`${productInfo.image}`} alt={`${productInfo.title}`} className='product-img' />
        <h1>{productInfo.title}</h1>
        <p>{`${productInfo.subtitle}`}</p>
      </div>
      <div className='tags-wrapper'>
        {productInfo.tags.map(tag => <span key={tag} className='tag'>{tag}</span>)}
      </div>
      <style jsx='true'>
        {`
        .info-wrapper {
          box-shadow: 1px 1px 10px 1px rgb(0, 0, 0, 0.05);
          border-radius: 3px;
          background-color: #FFFFFF;
          height: 100%;
          width: 100%;
          margin-bottom: 50px;
        }

        .product-info {
          padding: 30px 50px 10px 50px;
          text-align: center;
        }

        .product-img {
          width: 100%;
        }
        
        .product-info h1 {
          font-size: 1rem;
        }

        .product-info p {
          color: #B8C2CF;
        }

        .tags-wrapper {
          padding: 10px 15px;
          border-top: 1px solid #F4F7F9;
          border-bottom: 1px solid #F4F7F9;
        }

        .tag {
          border: 1px solid #EFF2F5;
          border-radius: 5px;
          padding: 5px 15px;
          color: #8A949E;
          margin: 5px;
          display: inline-block;
        }

        @media(min-width: 768px) {
          .info-wrapper {
            width: 19%;
            margin-bottom: 0px;
          }
        }
        `}
      </style>
    </div>
  )
}

export default ProductInfo
