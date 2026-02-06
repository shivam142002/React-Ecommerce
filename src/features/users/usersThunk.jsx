import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../Services/Firebase';

// Fetch all users
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const result = await getDocs(collection(fireDB, 'users'));
            const usersArray = [];

            result.forEach((doc) => {
                usersArray.push({ ...doc.data(), id: doc.id });
            });

            return usersArray;
        } catch (error) {
            console.error('Error fetching users:', error);
            return rejectWithValue(error.message);
        }
    }
);