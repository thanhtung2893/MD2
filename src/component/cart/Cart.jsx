import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {increaseQuantity,decreaseQuantity,removeFromCart,calculateCart} from '../../store/reducer/cartSlice'
import { VND_OK } from '../untill';

import "./Cart.scss"

export default function Cart() {
    const cart = useSelector((state) => state.cart.items);
    //console.log(cart);
    const total = cart.reduce((a,b)=>a + b.quantity*b.price,0);

    const dispatch=useDispatch();
    const handleIncreaseQuantity = (productId) => {
        dispatch(increaseQuantity(productId));
        calculateCart()
      };
    
      const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseQuantity(productId));
       calculateCart()
      };

      const handleRemoveFromCart = (productId) => {
        let confirm = window.confirm("bạn có chắc chắn muốn hủy ?");
        if (confirm) {
            dispatch(removeFromCart(productId));
          calculateCart()
        }
      };

  return (
    <div>

        <Link to={"/"}>home</Link>
      <h2>Giỏ Hàng</h2>
      <table className='table'>
        <thead>
            <tr>
                <th className='th'>Tên sản Phẩm</th>
                <th className='th'>minh họa</th>
                <th className='th'>Giá</th>
                <th className='th'>số lượng </th>
                <th className='th'>Thành tiền</th>
                <th className='th'>hủy oder</th>
            </tr>
        </thead>
        <tbody>
       
        {cart.map((product,i) => (
            <tr key={i}>
                <td>{product.name}</td>
                <td><img style={{ width: '100px', height: '100px' }} src={product.image} /></td>
                <td>{VND_OK.format(product.price)}</td>
                <td>
                  <button className='button' onClick={() => handleDecreaseQuantity(product.id)}>-</button>{product.quantity}
                  <button className='button' onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                </td>
                <td>{VND_OK.format(product.price*product.quantity)}</td>
                <td><button className='button_delete' onClick={() => handleRemoveFromCart(product.id)} >Xóa</button></td>
          {/* {product.price*product.quantity} */}
          </tr>
        ))}
        </tbody>
        <tfoot>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th><h3>Tổng Tiền: {VND_OK.format(total)}</h3></th>
                <th></th>
            </tr>
        </tfoot>
      </table>
     
      
    </div>
  );
};


