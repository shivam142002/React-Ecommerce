import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../Features/Products/ProductsSlice';
import cartReducer from '../Features/Cart/CartSlice';
import ordersReducer from '../Features/Orders/OrdersSlice';
import authReducer from '../Features/Auth/AuthSlice';
import usersReducer from '../Features/Users/UsersSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        orders: ordersReducer,
        auth: authReducer,
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for Firebase Timestamps
                ignoredActions: ['products/addProduct/fulfilled', 'products/updateProduct/fulfilled'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['products.items', 'orders.items'],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production',
});
