import { useState } from 'react';
import CartItemCard from './CartItemCard';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const removeProductFromCart = (productId) => {
        const existingItemIndex = cart.findIndex(item => item.productId === productId);

        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart.splice(existingItemIndex, 1);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    return (
        <>
            <div className='flex items-start justify-center border-t border-slate-700 bg-slate-800 min-h-screen text-white'>
                <div className='md:max-w-[70%] max-w-[90%] p-2 mt-14 w-full rounded-md bg-slate-700 bg-opacity-20'>
                    <div className='h-24 p-2 text-3xl font-bold rounded-md'>
                        <h4>Shopping Cart</h4>
                    </div>
                    <div className='flex flex-col justify-center items-center my-2 min-h-44 rounded-md p-5'>
                        {cart.map((product) => {
                            return (
                                <CartItemCard key={product.id} product={product} removeProductFromCart={removeProductFromCart} />
                            );
                        })}
                    </div>

                    {cart.length > 0 ?
                        <div className='text-right p-5'>
                            {/* <p>Total price: <span className='text-orange-500 font-bold text-xl'>${totalPrice}</span></p> */}
                            <button className='bg-orange-400 p-2 cursor-not-allowed'>CheckOut</button>
                        </div>
                        : <div className='text-center h-44 font-bold'>
                            <p className='italic  text-blue-500'>No Product Added To cart</p>

                            <Link to='/'>
                                <button className='bg-blue-500 p-2 m-2 rounded-sm' >Continue Shopping</button>
                            </Link>
                        </div>}
                </div>
            </div>
        </>
    );
};

export default Cart;