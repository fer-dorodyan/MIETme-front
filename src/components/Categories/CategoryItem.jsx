import React from 'react'
import { Link } from 'react-router-dom';

// name ist unser Category's name- es hat von map genommen (von CategoriesNavbar.jsx)
function CategoryItem({image, name, id}) {
// link to category page  // className beinhaltet Bootsrap code 
  return (
    <Link to={`/categories/${name}`} className='text-decoration-none text-dark p-4 '>
        <img src={image} alt="" className="image-category rounded-circle border shadow" />
        <h6 className='text-center mt-3'>{name}</h6>
    </Link>
  )
}

export default CategoryItem
