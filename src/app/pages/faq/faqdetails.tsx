"use client"
import React, { useState } from 'react';

const faqData = [
  {
    question: "How do we serve food?",
    answer: "We serve food with utmost care and dedication, ensuring it's always 100% halal, fresh, and hygienic. Our meals are prepared in a clean environment and delivered promptly to maintain their quality and taste, whether for dine-in, takeaway, or delivery.",
  },
  {
    question: "How is our food quality?",
    answer: "Our food quality is our top priority. We use only the freshest and finest ingredients to prepare every dish. Each meal is crafted with attention to hygiene and cleanliness, ensuring it meets the highest standards of taste, safety, and 100% halal compliance.",
  },
  {
    question: "How do we give home delivery?",
    answer: "We provide fast and reliable home delivery services to ensure your food reaches you fresh and hot. Our delivery process is handled with care, maintaining strict hygiene standards from our kitchen to your doorstep. You can easily place your order online or via phone, and our dedicated delivery team ensures timely service.",
  },
  {
    question: "How can we get in touch with you?",
    answer: "You can get in touch with us through several convenient channels. Reach us via our customer support number, email, or through our website's contact form. We're also available on social media platforms for quick inquiries and updates. Your feedback and questions are always welcome!",
  },
  {
    question: "What will be delivered? And When?",
    answer: "Our home delivery service includes a wide range of delicious, halal fast food options, from burgers and fries to kebabs and wraps. We ensure that every order is freshly prepared and delivered promptly. Depending on your location, we strive to deliver within 30–45 minutes of placing your order, so you can enjoy your meal while it's hot and fresh.",
  },
  {
    question: "Is this restaurant 24 hours open?",
    answer:"Our restaurant is open from 10:00 AM to 2:00 AM, offering a unique advantage during hours when most fast food places are unavailable. By operating at these times, we cater to both lunchtime cravings and late-night hunger, ensuring you always have access to fresh, halal fast food whenever you need it. Whether it's a quick lunch or a midnight snack, we've got you covered!",
  },
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Questions Looks Here</h2>
        <p className="text-center text-gray-600 mb-12">
          Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-200"
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="cursor-pointer flex justify-between items-center"
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-2xl">
                  {openIndex === index ? '-' : '+'}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-sm text-gray-600 mt-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FAQPage;