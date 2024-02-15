import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Products = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                const filteredProducts = data.products.filter((product) => {
                    return product.category === category;
                });
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='max-w-5xl mb-20 mx-auto'>
            <h2 className='text-4xl text-blue-500 my-5'>Products</h2>
            <div className='grid md:grid-cols-4 grid-cols-1 bg-blue-300 p-10 rounded-lg gap-10'>

                {products && products.map((product, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/product/${product.id}`)}
                        className='flex flex-col gap-2 shadow-md bg-white p-5 rounded-sm'>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className='aspect-video object-contain'
                        />
                        <p>{product.title}</p>
                        <span className='text-orange-500 font-bold'>${product.price}</span>
                    </div>
                ))}


            </div>
        </div>
    );
};

export default Products;
