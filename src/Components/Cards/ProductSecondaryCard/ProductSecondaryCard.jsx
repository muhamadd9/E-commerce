import React from "react";
import styles from "./ProductSecondaryCard.module.css";
import Rating from "../../Helpers/Rating";
import { Link } from "react-router-dom";

const ProductSecondaryCard = ({ Product }) => {

    // Function to truncate the product title if it exceeds 23 characters
    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + "...";
        }
        return title;
    };
    function handleClick(){
        window.scrollTo(0,0)
    }

    return (
        <Link
        onClick={handleClick}
            to={`/products/${Product.id}`}
            className={`${styles.card} my-2 text-decoration-none`}
        >
            <div className={styles.hotTag}>{Product.brand.name}</div>
            <div className={styles.imageContainer}>
                <img
                    src={Product.imageCover}
                    alt={Product.title}
                    className={styles.image}
                />
            </div>
            <h2 className={styles.title}>{truncateTitle(Product.title, 15)}</h2> {/* Truncate title */}
            <div className={styles.rating}>
                <Rating rating={Product.ratingsAverage} />
            </div>
            <div className={styles.priceContainer}>
                <span className={styles.price}>${Product.price}.00</span>
                <span className={styles.originalPrice}>
                    ${Product.price + (Product.price * 20) / 100}.00
                </span>
            </div>
        </Link>
    );
};

export default ProductSecondaryCard;
