import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    query,
    orderBy,
    onSnapshot,
    Timestamp,
} from 'firebase/firestore';
import { fireDB } from '../../services/firebase';
import { toast } from 'react-toastify';

// // Fetch all products
// export const fetchProducts = createAsyncThunk(
//     'products/fetchProducts',
//     async (_, { rejectWithValue }) => {
//         try {
//             const q = query(collection(fireDB, 'products'), orderBy('time'));

//             return new Promise((resolve, reject) => {
//                 const unsubscribe = onSnapshot(
//                     q,
//                     (querySnapshot) => {
//                         const productArray = [];
//                         querySnapshot.forEach((doc) => {
//                             productArray.push({ ...doc.data(), id: doc.id });
//                         });
//                         resolve(productArray);
//                         unsubscribe();
//                     },
//                     (error) => {
//                         reject(error);
//                     }
//                 );
//             });
//         } catch (error) {
//             console.error('Error fetching products:', error);
//             return rejectWithValue(error.message);
//         }
//     }
// );


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );

            const querySnapshot = await getDocs(q);
            const productArray = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            return productArray;
        } catch (error) {
            console.error('Error fetching products:', error);
            return rejectWithValue(error.message);
        }
    }
);


// Add new product
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (productData, { rejectWithValue }) => {
        try {
            if (
                !productData.title ||
                !productData.price ||
                !productData.imageUrl ||
                !productData.category ||
                !productData.description
            ) {
                toast.error('All fields are required');
                return rejectWithValue('All fields are required');
            }

            const product = {
                ...productData,
                time: Timestamp.now(),
                date: new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                }),
            };

            const productRef = collection(fireDB, 'products');
            const docRef = await addDoc(productRef, product);

            toast.success('Product added successfully');

            return { ...product, id: docRef.id };
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to add product');
            return rejectWithValue(error.message);
        }
    }
);

// Update product
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const { id, ...product } = productData;
            await setDoc(doc(fireDB, 'products', id), product);

            toast.success('Product updated successfully');

            return productData;
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Failed to update product');
            return rejectWithValue(error.message);
        }
    }
);

// Delete product
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId, { rejectWithValue }) => {
        try {
            await deleteDoc(doc(fireDB, 'products', productId));

            toast.success('Product deleted successfully');

            return productId;
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
            return rejectWithValue(error.message);
        }
    }
);


