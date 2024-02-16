import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { productid } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [numberOfProduct, setNumberOfProduct] = useState(1);
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true,
    };
    const handleAddToCart = ({
        productId,
        quantity,
        thumbnail,
        price,
        title }) => {
        const existingItemIndex = cart.findIndex(item => item.productId === productId);
        const updatedCart = [...cart];

        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex] = { ...updatedCart[existingItemIndex], quantity: quantity };
        } else {
            updatedCart.push({
                productId,
                quantity,
                thumbnail,
                price,
                title
            });
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success("Product added to cart")
    };
    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handelCountIncrease = () => {
        if (numberOfProduct < product.stock) {
            if (numberOfProduct < 4) {
                setNumberOfProduct((prevCount) => prevCount + 1);
            } else {
                toast.error("Only 4 products can be added");
            }
        }
    }
    const handelCountDecrease = () => {
        if (numberOfProduct > 1) {
            setNumberOfProduct((prevCount) => prevCount - 1);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${productid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className=" max-w-5xl mx-auto p-4 flex items-center lg:flex-row lg:items-start flex-col lg:items-top gap-10 m-5 justify-center ">
                <div className=" md:w-1/2 w-[75%]" >
                    <div className=" md:w-1/2  mx-auto w-[75%] h-[60%] ">
                        <Carousel  >
                            {product.images && product.images.map((url) => (
                                <img className="h-[50vh] object-contain" key={url} src={url} alt="Product" />
                            ))}
                        </Carousel>
                    </div>
                </div>

                <div className=" p-5 scrollbar border shadow-lg xs:w-3/4 md:w-1/2">
                    <h2 className="text-2xl" >{product.title}</h2>
                    <p className="text-sm font-thin text-slate-600 border-b border-slate-400 mb-4 pb-4">#{product.id}</p>
                    <ReactStars {...options} />
                    <p className="border-b border-slate-400 mb-4 pb-4" >({product.numberOfReviews} Reviews)</p>
                    <h2 className="text-orange-500 text-3xl font-bold">${product.price} <br /><p className="text-sm font-thin text-slate-600 border-b border-slate-400 mb-4 pb-4" > Including all taxes</p> </h2>
                    <div className="flex flex-col items-center " >

                        {/* Add to cart-button */}
                        <div className="flex items-center ">
                            <button
                                className="p-4 w-5 h-[40px] grid place-content-center active:bg-slate-500 hover:bg-slate-500 bg-slate-400 rounded-l-lg "
                                onClick={handelCountDecrease}
                            >-</button>
                            <input
                                className="border-y-2 h-[40px] text-center w-24 border-slate-400 outline-none  "
                                value={numberOfProduct}
                                type="text"
                                readOnly
                            />
                            <button
                                className="p-4 w-5 h-[40px] active:bg-slate-500 bg-slate-400  hover:bg-slate-500 rounded-r-lg grid place-content-center "
                                onClick={handelCountIncrease}
                            >+</button>
                        </div>
                        <button
                            className="w-40 h-[40px] bg-cyan-500 rounded-3xl my-4 active:bg-cyan-600 hover:bg-cyan-600 duration-500"
                            onClick={() => {
                                handleAddToCart({
                                    productId: product.id,
                                    quantity: numberOfProduct,
                                    thumbnail: product.thumbnail,
                                    price: product.price,
                                    title: product.title
                                });
                            }}
                        >Add to Cart</button>
                    </div>
                    <p className="border-b border-slate-400 mb-4 pb-4 font-bold">Status: <span className={`font-normal ${product.stock < 1 ? `text-red-400` : 'text-green-400'}`}>{`${product.stock < 1 ? `Out of Stock` : `Only ${product.stock} Unit left`}`}</span> </p>
                    <p><span className="text-2xl font-bold" >
                        Description:
                    </span> <br />
                        <span className="text-sm">{product.description}</span>
                    </p>
                </div>
            </div >
            <div className=" w-3/4  max-w-3xl flex p-4 lg:px-12  flex-col gap-2 border-y border-dashed mt-32 mb-10 mx-auto items-center justify-between sm:flex-row ">
                <h3 className="text-2xl text-center font-medium " >Reviews</h3>
                <button className="text-white  font-medium w-[200px] h-[40px] bg-blue-200 cursor-not-allowed rounded-lg" > Add Review</button>
            </div>
            <p className="text-center mb-32 text-red-400 font-medium">
                No Rerview Available
            </p>
        </>
    )
}

export default ProductDetails