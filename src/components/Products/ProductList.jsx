import ProductItem from "./ProductItem";
import "./products.css"

// component for list of products
function Products({products}) {

    return (
        <div className="container my-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 ">
                {products.length ?  // product existiert ? wenn ja:
                // jede item ändert in einer Produktkomponente 
                    products.map((item) => (
                        <ProductItem
                            key={item._id}
                            product={item}
                        />
                    ))
                    :
                    <h3 className="text-center">Theres is no products</h3>
                }
            </div>
        </div>
    );
}

export default Products;
