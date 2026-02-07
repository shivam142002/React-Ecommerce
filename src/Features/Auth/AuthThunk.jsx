
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { auth, fireDB } from '../../Services/Firebase';
import { toast } from 'react-toastify';

// Login user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);

            const userData = {
                user: {
                    uid: result.user.uid,
                    email: result.user.email,
                },
            };

            localStorage.setItem('user', JSON.stringify(userData));

            toast.success('Login successful', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });

            return userData;
        } catch (error) {
            console.error('Login error:', error);

            let errorMessage = 'Login failed';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'User not found';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email';
            }

            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Signup user
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            if (!name || !email || !password) {
                toast.error('All fields are required');
                return rejectWithValue('All fields are required');
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const userData = {
                name,
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                time: Timestamp.now(),
            };

            const userRef = collection(fireDB, 'users');
            await addDoc(userRef, userData);

            toast.success('Signup successful', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });

            return userData;
        } catch (error) {
            console.error('Signup error:', error);

            let errorMessage = 'Signup failed';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Email already in use';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters';
            }

            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            localStorage.removeItem('user');

            toast.success('Logged out successfully');

            return null;
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout failed');
            return rejectWithValue(error.message);
        }
    }
);

