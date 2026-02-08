
import { createSlice } from '@reduxjs/toolkit';
import {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from './ProductsThunk';

const initialState = {
    items: [],
    currentProduct: {
        title: '',
        price: '',
        imageUrl: '',
        category: '',
        description: '',
    },
    loading: false,
    error: null,
    searchKey: '',
    filterType: '',
    filterPrice: '',
    currentPage: 1,
  itemsPerPage: 2,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        },
        resetCurrentProduct: (state) => {
            state.currentProduct = {
                title: '',
                price: '',
                imageUrl: '',
                category: '',
                description: '',
            };
        },
        setSearchKey: (state, action) => {
            state.searchKey = action.payload;
             state.currentPage = 1; 
        },
        setFilterType: (state, action) => {
            state.filterType = action.payload;
             state.currentPage = 1; 
        },
        setFilterPrice: (state, action) => {
            state.filterPrice = action.payload;
             state.currentPage = 1; 
        },
        resetFilters: (state) => {
            state.searchKey = '';
            state.filterType = '';
            state.filterPrice = '';
             state.currentPage = 1; 
        },

         setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; 
    },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setCurrentProduct,
    resetCurrentProduct,
    setSearchKey,
    setFilterType,
    setFilterPrice,
    resetFilters,
    setCurrentPage,
  setItemsPerPage,
} = productsSlice.actions;

export const selectAllProducts = (state) => state.products.items;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectSearchKey = (state) => state.products.searchKey;
export const selectFilterType = (state) => state.products.filterType;
export const selectFilterPrice = (state) => state.products.filterPrice;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectItemsPerPage = (state) => state.products.itemsPerPage;

export const selectFilteredProducts = (state) => {
    const { items, searchKey, filterType, filterPrice } = state.products;

    return items
        .filter((obj) => obj.title.toLowerCase().includes(searchKey.toLowerCase()))
        .filter((obj) => obj.category.toLowerCase().includes(filterType.toLowerCase()))
        .filter((obj) => obj.price.toString().includes(filterPrice));
};

export const selectPaginatedProducts = (state) => {
  const filteredProducts = selectFilteredProducts(state);
  const { currentPage, itemsPerPage } = state.products;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return filteredProducts.slice(startIndex, endIndex);
};

// Total pages selector
export const selectTotalPages = (state) => {
  const filteredProducts = selectFilteredProducts(state);
  const { itemsPerPage } = state.products;
  
  return Math.ceil(filteredProducts.length / itemsPerPage);
};

// Total items count selector
export const selectTotalFilteredItems = (state) => {
  return selectFilteredProducts(state).length;
};


export default productsSlice.reducer;