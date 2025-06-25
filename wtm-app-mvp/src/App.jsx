// src/App.jsx
import React from 'react';
import './index.css'; // make sure this imports your Tailwind build!

export default function App() {
  return (
    <div
      className="relative flex w-full min-h-screen flex-col bg-[#fcf9f8] justify-between overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      {/* Hero Image */}
      <div>
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#fcf9f8] @[480px]:rounded-xl min-h-80"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0sTrEEBmOFj6B_fYrI-vUkuKzQ23ak_RcoguZHAkWrXOFMyTuOTFCxW5y2W9iRLjyQhJvUBYOH_UZfeCcY9rUgQoJtkyxT_99CbjTmdufE4QfhhEtRYykX6vu1H7T7C-I-oIuSbwmQKoysdlIXJny8C2wMuWlj9sEsM8e0ccZ1GSjjewt_Bn8c5thOT-F9vWHfoTYsk6HqZEzyZqYcXB3nto_VqzcKfln0a28Omv6576X7F1xceZdkHxtGaWazxxakhnBOgCFIaZ2")',
              }}
            />
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-[#1c130d] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Find Like-minded People Near You
        </h2>

        {/* Subhead */}
        <p className="text-[#1c130d] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
          Discover your next adventure with AI-powered matching.
        </p>
      </div>

      {/* Button + Slider */}
      <div>
        {/* Button */}
        <div className="flex px-4 py-3 justify-center">
          <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-full h-12 px-5 bg-[#f38039] text-[#1c130d] text-base font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Start Exploring</span>
          </button>
        </div>

        {/* ← Your slider ↓ */}
        <div className="flex px-4 py-2 justify-center">
          <input
            type="range"
            className="w-64 h-2 bg-gray-200 rounded-lg"
            // no onChange — it does nothing
          />
        </div>

        {/* bottom spacer */}
        <div className="h-5 bg-[#fcf9f8]" />
      </div>
    </div>
  );
}
