
import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { fireDB } from '../../Services/Firebase';
import { toast } from 'react-toastify';

// Fetch all orders
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const result = await getDocs(collection(fireDB, 'order'));
            const ordersArray = [];

            result.forEach((doc) => {
                ordersArray.push({ ...doc.data(), id: doc.id });
            });

            return ordersArray;
        } catch (error) {
            console.error('Error fetching orders:', error);
            return rejectWithValue(error.message);
        }
    }
);

// Create new order
export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const orderRef = collection(fireDB, 'order');
            const docRef = await addDoc(orderRef, orderData);

            toast.success('Order placed successfully');

            return { ...orderData, id: docRef.id };
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Failed to place order');
            return rejectWithValue(error.message);
        }
    }
);
