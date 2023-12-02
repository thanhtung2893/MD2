import React from 'react'
import { BsFillCartDashFill } from "react-icons/bs";
import "./Header.scss";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Header() {
    const cart = useSelector((state) => state.cart.items);
    return (
        <>
            <div className='header'>
                <div className='cart'> <Link to={"/cart"}>
                    <BsFillCartDashFill style={{width:"30px",height:"30px", color:"blue"}} />
                    </Link>{cart.reduce((a,b)=>a + b.quantity, 0)}</div>
            </div>

        </>
    )
}
