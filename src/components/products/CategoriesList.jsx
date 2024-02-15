import React from 'react'
import { useNavigate } from 'react-router-dom'
import { categoriesList } from '../../utlis/data';

const CategoriesList = () => {
    const navigate = useNavigate();
    const handleCategoryClick = (categoryName) => {
        navigate(`/${categoryName}`)
    };

    return (
        <div className='max-w-5xl mb-20 mx-auto'>
            <h1 className='text-4xl text-blue-500 my-5'>
                Products Category
            </h1>
            <div className=' p-10 rounded-lg grid gap-10 lg:grid-cols-5 grid-cols-1 bg-blue-300'>
                {categoriesList.map((category) =>
                    <div
                        key={category.categoryName}
                        onClick={() => handleCategoryClick(category.categoryName)}
                        className="mt-1 aspect-square p-1 shadow-lg cursor-pointer  bg-white sm:border-none rounded-lg flex items-center flex-shrink-0 justify-center flex-col " >
                        <img className="h-[75%]"
                            src={category.imgAddress}
                            alt={category.categoryName} />
                        <p>{category.categoryName}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoriesList
