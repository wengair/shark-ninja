import React, { useEffect, useState } from 'react'
import { selectRetailSales, selectWholesaleSales } from './productSlice'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'

function ProductSaleGraph() {
  const retail = useSelector(selectRetailSales)
  const whole = useSelector(selectWholesaleSales)
  const [data, setData] = useState({})

  useEffect(() => {
    if(retail.length > 0 && whole.length > 0) {
      setData({
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
          {
            label: 'Retail Sales',
            data: retail,
            fill: false,
            backgroundColor: '#99A5BE',
            borderColor: '#99A5BE', // line color
            lineTension: 0.3,
          },
          {
            label: 'Wholesale Sales',
            data: whole,
            fill: false,
            backgroundColor: '#46A7F5',
            borderColor: '#46A7F5', // line color
            lineTension: 0.3,
          }
        ],
      })
    }
  }, [retail, whole])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    bezierCurve: true,
    scales: {
      x: {
        grid: {
          display: false
        },
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          display: false
      }
      },
    }
  }

  return (
    <div className='graph'>
      <Line data={data} options={options} />
      <style jsx='true'>
        {`
        .graph {
          height: 40%;
          margin-bottom: 50px;
          background-color: #FFFFFF;
          padding: 10px;
          border-radius: 3px;
        }

        .graph canvas {
          // position: relative;
        }
        `}
      </style>
    </div>
  )
}

export default ProductSaleGraph
