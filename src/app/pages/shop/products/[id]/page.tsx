"use client"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/cartSlice";
import { useRouter } from "next/navigation";
import client from "@/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { Food } from "../../../../type";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import CommentSection from "../../../../components/comment";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Food | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Food[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<string>("");
  const [wishlist, setWishlist] = useState<Food[]>([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "food" && id == $id][0]{
          id,
          name,
          category,
          price,
          originalPrice,
          description,
          "image_url": image.asset->url,
          available
        }`;

        const result = await client.fetch(query, { id: Number(params.id) });

        if (result) {
          setProduct(result);

          const relatedQuery = `*[_type == "food" && category == $category && id != $id][0...4]{
            id,
            "image_url": image.asset->url,
            available
          }`;

          const relatedResult = await client.fetch(relatedQuery, {
            category: result.category,
            id: Number(params.id),
          });

          setRelatedProducts(relatedResult);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/404");
      }
    };

    fetchProduct();
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (product) {
      if (!product.available) {
        setMessage("This food item is not available now.");
        return;
      }

      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image_url: product.image_url,
      };

      dispatch(addToCart(cartItem));
      setAddedToCart(true);
      setMessage("");
    }
  };

  const handleIncreaseQuantity = () => {
    if (product && product.available) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist) {
        setWishlist(wishlist.filter(item => item.id !== product.id));
      } else {
        setWishlist([...wishlist, product]);
      }
      setIsInWishlist(!isInWishlist);
    }
  };

  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.image_url && (
            <Image
              src={product.image_url}
              alt={product.name}
              width={250}
              height={250}
              className="rounded-lg"
            />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-2xl font-bold text-orange-500 mt-4">RS: {product.price}</p>
          {product.originalPrice && (
            <p className="line-through text-gray-500">RS: {product.originalPrice}</p>
          )}
          <p
            className={`${
              product.available ? "text-green-500" : "text-red-500"
            } text-sm font-semibold`}
          >
            {product.available ? "Available" : "Unavailable"}
          </p>

          <button
            className="mt-4 p-2 rounded-full hover:bg-gray-200"
            onClick={handleWishlistToggle}
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isInWishlist ? (
              <BsHeartFill size={30} className="text-red-500" />
            ) : (
              <BsHeart size={30} className="text-gray-500" />
            )}
          </button>

          <div className="mt-4 flex items-center space-x-4">
            <button
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              onClick={handleDecreaseQuantity}
              disabled={!product.available}
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              onClick={handleIncreaseQuantity}
              disabled={!product.available}
            >
              +
            </button>
          </div>

          <button
            className={`mt-6 py-2 px-4 rounded ${
              product.available
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-400 text-gray-800 cursor-not-allowed"
            }`}
            onClick={handleAddToCart}
            disabled={!product.available}
          >
            {product.available ? "Add to Cart" : "Add to Cart (Unavailable)"}
          </button>

          {message && <div className="mt-4 text-red-500">{message}</div>}

          <Link href="/pages/shop">
            <button className="mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
              Continue Shopping
            </button>
          </Link>

          {addedToCart && (
            <div className="mt-4 text-green-500">Item added to the cart!</div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                <div className="border p-4 rounded-lg cursor-pointer">
                  {relatedProduct.image_url && (
                    <Image
                      src={relatedProduct.image_url}
                      alt="Related Product"
                      width={250}
                      height={250}
                      className="rounded-lg"
                    />
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p>No related products available.</p>
          )}
          
          
          
        </div>
        <CommentSection/>
      </div>
    </div>
  );
};

export default ProductPage;
