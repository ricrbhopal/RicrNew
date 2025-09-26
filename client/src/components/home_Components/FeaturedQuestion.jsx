import React, { useState } from 'react';

const FeaturedQuestion = () => {
    const [activeAnswerIndex, setActiveAnswerIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveAnswerIndex(activeAnswerIndex === index ? null : index);
    };

    const questions = [
        {
            question: "How do I create an account?",
            answer: "To create an account, click on the 'Sign Up' button on the top right corner and fill in the required details."
        },
        {
            question: "What is the return policy?",
            answer: "Our return policy allows you to return products within 30 days of purchase. Please ensure the items are in their original condition."
        },
        {
            question: "How can I track my order?",
            answer: "You can track your order by logging into your account and visiting the 'Orders' section. Click on the specific order to see its status."
        },
        {
            question: "Do you offer customer support?",
            answer: "Yes, we offer 24/7 customer support through chat, email, and phone. Visit our 'Contact Us' page for more details."
        },
        {
            question: "Are there any discounts available?",
            answer: "We frequently offer discounts and promotions. Subscribe to our newsletter and follow us on social media to stay updated."
        }
    ];

    return (
        <section>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-26">
                <div className="text-center mb-12">
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find quick answers to common questions about our services, policies, and support.
                    </p>
                </div>

                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                            <button
                                className="w-full flex justify-between items-center p-6 text-left   focus:ring-opacity-50 rounded-xl"
                                aria-expanded={activeAnswerIndex === index}
                                aria-controls={`answer-${index}`}
                            >
                                <h2 className="text-md font-semibold text-gray-900 pr-4">
                                    {item.question}
                                </h2>
                                <div
                                    onClick={() => toggleAnswer(index)}
                                    className="flex-shrink-0 ml-4">
                                    <svg
                                        className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${activeAnswerIndex === index ? 'transform rotate-45' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </div>
                            </button>

                            <div
                                id={`answer-${index}`}
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAnswerIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 pb-6">
                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="text-gray-700 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>




            <div className="bg-white mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <div className="relative flex flex-col justify-center items-center rounded-2xl max-w-6xl mx-auto bg-[#0F172A] px-6 py-18 leading-9 shadow-lg overflow-hidden">

                    <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-gray-200 mb-6">
                        <img src="/Star2.png" alt="star" className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span>Subscribe For Free</span>
                    </div>

                    <h1 className="max-w-xl text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
                        Stay updated with Upcoming Events <br /> and Workshops
                    </h1>

                    <div className="flex w-full max-w-md bg-[#1a263e]  rounded-lg overflow-hidden shadow-md">
                        <input
                            type="email"
                            placeholder="Enter your email..."
                            className="flex-grow px-4 py-1 text-white/80 focus:outline-none"
                        />
                        <button className="px-6 bg-[#125785] hover:cursor-pointer text-white font-semibold transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default FeaturedQuestion;