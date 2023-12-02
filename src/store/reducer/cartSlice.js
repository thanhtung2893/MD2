import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const { id,name,image, price, quantity = 1 } = action.payload;
      const findProductIndex = state.items.findIndex((item) => item.id === id);

      if (findProductIndex !== -1) {
        state.items[findProductIndex].quantity += quantity;
      } else {
        state.items.push({ id,name,image, price, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item.id === productId);

      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item.id === productId);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
      calculateCart:(state,action)=>{
      const total=state.items.reduce(
        (a,b)=>a + b.price*b.quantity,0
      )

    }  
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  calculateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
