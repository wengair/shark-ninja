import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProducts } from './features/product/productSlice'
import Nav from './components/Nav'
import ProductInfo from './features/product/ProductInfo'
import ProductSaleGraph from './features/product/ProductSaleGraph'
import ProductSaleList from './features/product/ProductSaleList'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="app">
      <Nav />
      <div className='content-wrapper'>
        <ProductInfo />
        <div className='content-sales'>
          <ProductSaleGraph />
          <ProductSaleList />
        </div>
      </div>
      <style jsx='true'>
        {`
        .app {
          height: auto;
        }

        .content-wrapper {
          padding: 50px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #F5F8FA;
          height: calc(100% - 100px - 70px);
        }

        .content-sales {
          width: 100%;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        @media(min-width: 768px) {
          .app {
            height: 100vh;
          }
          .content-wrapper {
            flex-direction: row;
          }

          .content-sales {
           width: 80%; 
          }
        }
        `}
      </style>
    </div>
  );
}

export default App;
