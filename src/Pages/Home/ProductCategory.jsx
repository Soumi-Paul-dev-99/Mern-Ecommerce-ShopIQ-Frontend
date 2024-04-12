import React from "react";
import "./Productcategory.scss";
const categories = [
  {
    id: 1,
    title: "Gadgets",
    image: "https://i.ibb.co/5GVkd3m/c1.jpg",
  },
  {
    id: 2,
    title: "Womens Fashion",
    image: "https://i.ibb.co/nQKLjrW/c2.jpg",
  },
  {
    id: 3,
    title: "Sport Sneakers",
    image: "https://i.ibb.co/fNkBYgr/c3.jpg",
  },
];

const Category = ({ title, image }) => {
  return (
    <div className="category">
      <h3>{title}</h3>
      <img src={image} alt="cat" />
    </div>
  );
};
const ProductCategory = () => {
  return <div></div>;
};

export default ProductCategory;
