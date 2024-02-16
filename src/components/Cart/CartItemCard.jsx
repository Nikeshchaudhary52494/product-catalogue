import { ImBin } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const CartItemCard = ({ product, removeProductFromCart, qIncrease, qDecrease }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col sm:flex-row justify-between px-4 my-2 border bg-white gap-2 w-full rounded-md py-2 items-center'>
            {/* Details */}
            <div className='flex sm:flex-row flex-col sm:items-center gap-10'>
                <div className='bg-white p-2 flex-shrink-0 rounded-md'>
                    <img className='aspect-video sm:h-20  object-contain' src={product.thumbnail} alt='product img' />
                </div>
                <div className='cursor-pointer' onClick={() => navigate(`/product/${product.productId
                    }`)} >
                    <p className='text-xl text-black'>{product.title}</p>
                    <p className='text-orange-500 font-bold'>{`$${product.price}`}</p>
                </div>
            </div>

            {/* counter */}
            <div className="flex justify-between sm:w-min w-full">
                <div className='flex'>
                    <button
                        className={`p-4 w-5 h-[40px] grid place-content-center active:bg-slate-500 hover:bg-slate-500 bg-slate-400 rounded-l-lg ${product.quantity === 1 ? 'cursor-not-allowed' : ''}`}
                        onClick={() => qDecrease(product.productId)}
                    >-</button>
                    <input
                        className="border-y-2 text-black h-[40px] text-center w-24 border-slate-400 outline-none  "
                        value={product.quantity}
                        type="text"
                        readOnly
                    />
                    <button
                        className="p-4 w-5 h-[40px] active:bg-slate-500 hover:bg-slate-500 bg-slate-400 rounded-r-lg grid place-content-center "
                        onClick={() => qIncrease(product.productId)}
                    >+</button>
                </div>
                <button className='sm:text-red-500 flex hover:text-white hover:bg-red-500 hover:rounded-full p-3 justify-center sm:bg-transparent bg-red-500 sm:w-fit rounded-md ' onClick={() => removeProductFromCart(product.productId)}>
                    <ImBin />
                </button>
            </div>

            {/* Remove button */}

        </div>
    );
};

export default CartItemCard;