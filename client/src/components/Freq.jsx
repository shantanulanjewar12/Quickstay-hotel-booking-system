import React from "react";
import {useState} from 'react';

function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <article className="flex flex-col gap-4 bg-white rounded-xl border border-gray-200 px-5 py-7 mb-4">
      <button
        className="flex justify-between items-center text-xl font-semibold cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2>{question}</h2>
        <span className="w-6 h-6">{isOpen ? "▼" : "▲"} </span>
      </button>
      {isOpen && <p className="text-lg leading-7 font-thin">{answer}</p>}
    </article>
  );
}

function FAQs() {
  const faqs = [
    {
      question: "What types of accommodations do you offer?",
      answer: "We offer a wide range of accommodations, including boutique hotels, luxury resorts, and exclusive villas around the world.",
    },
    {
      question: "How can I check availability for my desired dates?",
      answer: "You can check availability by entering your destination, check-in and check-out dates, and the number of guests on our website.",
    },
    {
      question: "Do you have any special offers available?",
      answer: "Yes, we have various limited-time offers, including discounts on packages like the Summer Escape Package and Romantic Getaway.",
    },
    // Additional FAQs can be added here
  ];

  return (
    <div className="bg-gray-200 py-10 px-5 bg-[F4F7FA]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center mb-8 text-5xl font-semibold">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-center mb-14 font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        {faqs.map((faq, index) => (
          <Accordion key={index} question={faq.question} answer={faq.answer} />
        ))}
        <div className="text-center mt-12 text-lg font-light">
          Haven't got your answer?
          <a
            href="/support"
            className="hover:text-blue-700 ml-2 text-violet-600 font-light"
          >
            Contact our support now
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
