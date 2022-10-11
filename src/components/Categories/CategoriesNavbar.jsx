import React from 'react'
import "./Categories.css"
import CategoryItem from './CategoryItem'

export const categoriesNavbar = [
    {id: 1, name: "Books", image: "http://localhost:5000/public/images/categories/books.webp"},
    {id: 2, name: "Clothing", image: "http://localhost:5000/public/images/categories/clothing_10.jpg"},
    {
        id: 3,
        name: "Electronic Device",
        image: "http://localhost:5000/public/images/categories/electronic_devices.png"
    },
    {id: 4, name: "Home Garden", image: "http://localhost:5000/public/images/categories/home_garden_1.webp"},
    {id: 5, name: "Sports", image: "http://localhost:5000/public/images/categories/bicycle.jpg"}
]

// category navbar component for display categories and filter products
function Categories() {
    return (
        <div className='container d-flex justify-content-center flex-wrap '>
            {
                categoriesNavbar.map(item => <CategoryItem {...item}/>)
            }
        </div>
    )
}

export default Categories
