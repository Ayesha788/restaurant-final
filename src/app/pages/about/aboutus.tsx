import Image from "next/image";
import Link from "next/link";

export default function Aboutus() {
  return (
    <div className="max-w-[1920px]">
       <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">About Us</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › About
          </p>
        </div>
      </section>
      <div className="container mx-auto mt-12 flex md:flex-row px-12 items-center justify-center flex-col w-full max-w-[1220px]">
        <div className="ml-6 md:w-[669px] w-full md:h-[734px] flex md:flex-row flex-col">
          <div className="flex md:w-1/2 w-full flex-col items-center">
            <Image
              className="object-cover object-center  w-full  md:w-[309px] md:h-[536px] h-[309px] rounded-s mr-0 md:mr-4"
              alt="hero"
              src="/images/ab1.png"
              width={309}
              height={536}
            />
          </div>
          <div className="flex md:w-1/2 w-full gap-3 flex-col md:flex-col">
            <Image
              className="object-cover object-center mt-2 md:block mb-4 w-full md:w-[309px] h-[271px] radius-6px"
              alt="image2"
              src="/images/ab2.png"
              width={309}
              height={271}
            />
            <Image
              className="object-cover object-center md:block w-full md:w-[309px] h-[382px] radius-6px"
              alt="image3"
              src="/images/ab3.png"
              width={309}
              height={382}
            />
          </div>
        </div>
        <div className="ml-12 md:w-[526px] w-full space-y-4  mt-8 left-{1094px} top-{714px} flex flex-wrap ">
          <h1 className="text-sm font-medium text-yellow-400 italic">
            About us _____
          </h1>
          <p className="text-black title-font text-3xl font-bold">
          Savor the Flavor of Fast, Fresh, and Halal Food
          </p>
          <p className=" leading-relaxed text-[#333333]">
          At our fast food restaurant, we bring you a blend of mouth-watering flavors and quick service. Whether you are craving a juicy burger, crispy fries, or a refreshing milkshake, we have got you covered! Our food is freshly prepared, halal, and served to your door with speed and convenience. Enjoy a satisfying meal that does not compromise on taste or quality, all from the comfort of your home. Taste the difference today!
          </p>
          <div className="flex justify-center">
            <Link href="/shop">
              <button className="inline-flex text-white bg-orange-400 border-0 py-2 px-3 focus:outline-none rounded text-lg">
                Show More
              </button>
            </Link>
            
          </div>
        </div>
      </div>
      <div className="text-white body-font ">
        <div className=" mx-auto flex md:px-4 md:py-8  py-4 items-center justify-center flex-col w-full md:w-[579px]">
          <h1 className="text-black text-lg md:text-3xl sm:2xl font-bold mt-3">
            Why Choose Us
          </h1>
          <p className="text-black md:text-[18px] text-[12px] text-center mt-2">
          Choose us for a fast and satisfying dining experience, where we prioritize fresh ingredients and quick service to deliver high-quality meals. Our menu offers a variety of tasty options at affordable prices, ensuring there is something for everyone. We are committed to customer satisfaction, always striving to provide an exceptional meal every time you visit.
          </p>
        </div>
        <div className="container mx-auto flex px-8 md:px-16 items-center justify-center flex-col w-full max-w-[1220px]">
          <Image
            className="mb-10 object-cover md:w-[1273px] w-full h-[386px]"
            alt="hero"
            src="/images/ab4.png"
            width={1220}
            height={386}
          />
        </div>
      </div>
      <div className="text-white  body-font">
        <div className="container  py-20 mx-5">
          <div className="flex  flex-col md:flex-row  ">
            <div className="p-2 px-auto mr-12  md:w-[359px]">
              <div className="h-full flex  justify-center items-center px-8 flex-col rounded-lg overflow-hidden">
                <Image
                  src="/images/ab5.png"
                  width={80}
                  height={80}
                  alt="blog"
                />
                <div className="p-4">
                  <h1 className="title-font text-lg font-medium text-black mb-2 text-bold text-center">
                    BEST CHEF
                  </h1>
                  <p className="leading-relaxed mb-3 text-center text-black">
                  We take pride in having the best chefs who craft exceptional dishes with passion and expertise.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2  mr-12 md:max-w-[359px]">
              <div className="h-full flex justify-center items-center flex-col rounded-lg overflow-hidden">
                <Image
                
                  src="/images/ab6.png"
                  width={80}
                  height={80}
                  alt="food item"
                />
                <div className="p-4">
                  <h1 className="title-font text-lg font-medium text-black mb-2 text-bold text-center">
                    10 Item food
                  </h1>
                  <p className="leading-relaxed mb-3 text-center text-black">
                  We proudly offer a diverse menu with 10 mouthwatering dishes to satisfy every craving.</p>
                </div>
              </div>
            </div>
            <div className="p-2  mr-12 md:w-[359px]">
              <div className="h-full flex justify-center items-center flex-col rounded-lg overflow-hidden">
                <Image
                  className="flex md:flex-col flex-row  justify-center items-center"
                  src="/images/ab7.png"
                  width={80}
                  height={80}
                  alt="blog"
                />
                <div className="p-4">
                  <h1 className="title-font text-lg font-medium text-black mb-2 text-bold text-center">
                    Clean Environment
                  </h1>
                  <p className="leading-relaxed mb-3 text-center text-black">
                  We are committed to providing a clean and welcoming environment for all our guests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
