  import { createSlice } from '@reduxjs/toolkit'
  import { setToLocalStorage, getFromLocalStorage } from '../../utils/localStorageUtils'
  import { toast } from 'react-toastify'

  // Load initial cart from localStorage
  const initialState = {
    cartItems: getFromLocalStorage('cartItems') || []
  }

  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
  
  addToCart: (state, action) => {
    const item = action.payload;
    const existingIndex = state.cartItems.findIndex(p => p._id === item._id);

    if (existingIndex >= 0) {
      state.cartItems[existingIndex] = {
        ...state.cartItems[existingIndex],
        quantity: state.cartItems[existingIndex].quantity + 1,
      };
    } else {
      state.cartItems.push({ ...item, quantity: 1 });
    }

    toast.success(`${item.name} added to cart!`);
    setToLocalStorage('cartItems', [...state.cartItems]); // safer
  },

      deleteFromCart: (state, action) => {
        const itemId = action.payload._id; // ✅ use _id
        state.cartItems = state.cartItems.filter(p => p._id !== itemId);
        setToLocalStorage('cartItems', state.cartItems);
      },
      
      removeFromCart: (state, action) => {
        const itemId = action.payload._id; // ✅ use _id
        const item = state.cartItems.find(p => p._id === itemId);
      
        if (item) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            state.cartItems = state.cartItems.filter(p => p._id !== itemId);
          }
          setToLocalStorage('cartItems', state.cartItems);
        }
      },

      clearCart: (state) => {
        state.cartItems = []
        setToLocalStorage('cartItems', [])
      }
    }
  })

  export const { addToCart, removeFromCart, clearCart,deleteFromCart } = cartSlice.actions
  export default cartSlice.reducer
