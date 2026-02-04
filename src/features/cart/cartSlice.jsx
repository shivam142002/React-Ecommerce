
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    totalAmount: 0,
    totalItems: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                // If item already exists, increase quantity
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                // Add new item with quantity 1
                state.items.push({ ...action.payload, quantity: 1 });
            }

            // Recalculate totals
            cartSlice.caseReducers.calculateTotals(state);

            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },

        deleteFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);

            // Recalculate totals
            cartSlice.caseReducers.calculateTotals(state);

            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);

            if (item) {
                item.quantity = quantity;

                // Recalculate totals
                cartSlice.caseReducers.calculateTotals(state);

                // Update localStorage
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalItems = 0;

            // Update localStorage
            localStorage.setItem('cart', JSON.stringify([]));
        },

        calculateTotals: (state) => {
            let totalAmount = 0;
            let totalItems = 0;

            state.items.forEach((item) => {
                const quantity = item.quantity || 1;
                totalAmount += parseInt(item.price) * quantity;
                totalItems += quantity;
            });

            state.totalAmount = totalAmount;
            state.totalItems = totalItems;
        },

        loadCartFromStorage: (state) => {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            state.items = savedCart;
            cartSlice.caseReducers.calculateTotals(state);
        },
    },
});

export const {
    addToCart,
    deleteFromCart,
    updateQuantity,
    clearCart,
    calculateTotals,
    loadCartFromStorage,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartTotalItems = (state) => state.cart.totalItems;
export const selectCartItemCount = (state) => state.cart.items.length;

export default cartSlice.reducer;