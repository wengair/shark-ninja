import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  title: '',
  image: '',
  subtitle: '',
  brand: '',
  reviews: [],
  retailer: '',
  details: [],
  tags: [],
  sales: [], // {weekEnding, retailSales, wholesaleSales, unitsSold, retailerMargin}
  orderedSales: [],
  sort: {col: 'weekEnding', order: 1}, // 1 = ASC, -1 = DESC
  status: 'idle',
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await fetch('stackline_frontend_assessment_data_2021.json')
    .then(response => response.json())
    .then(data => data)
    .catch(e => console.log(e))
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    sortSales: (state, action) => {
      const column = action.payload
      console.log(column)
      if(column === state.sort.col) state.sort.order =  -state.sort.order
      else {
        state.sort.col = column
        state.sort.order = -1
      }
      if(state.sort.col === 'weekEnding') {
        // remove "-" and turn the date into number, then compare
        state.orderedSales = state.orderedSales.sort((a, b) => (state.sort.order * Number(a[column].replace(/-/g,''))) - (state.sort.order * Number(b[column].replace(/-/g,''))))
      }
      else {
        console.log('not week')
        state.orderedSales = state.orderedSales.sort((a, b) => (state.sort.order * a[column]) - (state.sort.order * b[column]))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        const data = action.payload[0]
        state.id = data.id
        state.title = data.title
        state.image = data.image
        state.subtitle = data.subtitle
        state.brand = data.brand
        state.reviews = data.reviews
        state.retailer = data.retailer
        state.details = data.details
        state.tags = data.tags
        state.sales = data.sales
        state.orderedSales = data.sales
      });
  },
});

export const { populate, sortSales } = productSlice.actions;

export const selectProductInfo = (state) => ({
  title: state.product.title,
  image: state.product.image,
  subtitle: state.product.subtitle,
  tags: state.product.tags,
})

const convertDate = (date) => {
  const dates = date.split('-')
  return dates[1] + '-' + dates[2] + '-' + dates[0][2] + dates[0][3]
}

const convertMoney = (money) => {
  return money.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

const convertSales = (sales) => {
  return sales.map(sale => ({
    weekEnding: convertDate(sale.weekEnding),
    retailSales: convertMoney(sale.retailSales),
    wholesaleSales: convertMoney(sale.wholesaleSales),
    unitsSold: sale.unitsSold,
    retailerMargin: convertMoney(sale.retailerMargin),
  }))
}

export const selectSort = (state) => state.product.sort

export const selectProductSales = (state) => convertSales(state.product.orderedSales)

export const selectRetailSales = (state) => state.product.sales.map(sale => sale.retailSales)

export const selectWholesaleSales = (state) => state.product.sales.map(sale => sale.wholesaleSales)

export default productSlice.reducer;
