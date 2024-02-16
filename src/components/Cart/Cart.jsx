import { useEffect, useState } from 'react';
import CartItemCard from './CartItemCard';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('user') ? true : false;
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [totalPrice, setTotalPrice] = useState(0);
    const calculateTotalPrice = () => {
        let total = 0;
        cart.forEach(product => {
            total += product.quantity * product.price;
        });
        setTotalPrice(total);
    };
    const removeProductFromCart = (productId) => {
        const existingItemIndex = cart.findIndex(item => item.productId === productId);
        const updatedCart = [...cart];
        updatedCart.splice(existingItemIndex, 1);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const qIncrease = (productId) => {
        const existingItemIndex = cart.findIndex(item => item.productId === productId);
        const updatedCart = [...cart];
        if (updatedCart[existingItemIndex].quantity < 4) {
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };
    const qDecrease = (productId) => {
        const existingItemIndex = cart.findIndex(item => item.productId === productId);
        const updatedCart = [...cart];
        if (updatedCart[existingItemIndex].quantity > 1) {
            updatedCart[existingItemIndex].quantity -= 1;
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const handelClearCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
    }


    useEffect(() => {
        calculateTotalPrice();
    }, [cart]);

    if (!isAuthenticated) {
        navigate("/login");
    }

    return (
        <>
            <div className='flex items-start justify-center min-h-screen text-white'>
                <div className='lg:max-w-[70%] max-w-[90%] p-2 mt-14 w-full rounded-md bg-blue-100'>
                    <div className='h-24 flex items-center justify-between p-2 rounded-md'>
                        <h4 className='text-blue-900 text-3xl font-bold '>Shopping Cart</h4>
                        <button className={`px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md ${cart.length > 0 ? `` : `hidden`}`}
                            onClick={handelClearCart}
                        >Clear Cart</button>
                    </div>
                    <div className='flex flex-col justify-center items-center my-2 min-h-44 rounded-md p-5'>
                        {cart.map((product) => {
                            return (
                                <CartItemCard
                                    key={product.id}
                                    product={product}
                                    removeProductFromCart={removeProductFromCart}
                                    qDecrease={qDecrease}
                                    qIncrease={qIncrease}
                                />
                            );
                        })}
                    </div>

                    {cart.length > 0 ?
                        <div className='text-right p-5'>
                            <p>Total price: <span className='text-orange-500 font-bold text-xl'>${totalPrice}</span></p>
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