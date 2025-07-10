import React from 'react';

// This component is designed to be a standalone page or a detailed section
// explaining the symbolism of your chosen cross design.
// It uses Tailwind CSS for styling, which is assumed to be available in your project.

const ThreeStrandsCross = () => {
  return (
    <div className="bg-[#F7F5F2] min-h-screen p-6 sm:p-10 flex items-center justify-center font-['Montserrat'] text-[#36454F]">
      <div className="max-w-5xl w-full bg-[#FDFBF5] shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Column: The Cross Design */}
        <div className="p-8 sm:p-12 flex flex-col items-center justify-center bg-[#F7F5F2]">
          <div className="w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#36454F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <title>Cord of Three Strands Cross with Five Wounds</title>
              {/* The three incoming strands */}
              <path d="M50 12 V30 M27 35 H45 M73 35 H55" strokeWidth="3" />

              {/* The 5 Holy Wounds */}
              <circle cx="50" cy="8" r="4" strokeWidth="0" fill="#36454F" />
              <circle cx="23" cy="35" r="4" strokeWidth="0" fill="#36454F" />
              <circle cx="77" cy="35" r="4" strokeWidth="0" fill="#36454F" />
              <circle cx="50" cy="35" r="5" strokeWidth="0" fill="#36454F" />
              <circle cx="50" cy="94" r="4" strokeWidth="0" fill="#36454F" />

              {/* The Braid */}
              <path d="M50 40 C 40 55, 60 55, 50 70 C 40 85, 60 85, 50 90" strokeWidth="2.5" />
              <path d="M50 40 C 60 55, 40 55, 50 70 C 60 85, 40 85, 50 90" strokeWidth="2.5" />
              <path d="M50 40 V 90" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* Right Column: The Explanation */}
        <div className="p-8 sm:p-12">
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-bold text-[#ab8a5b] mb-4">The Cord of Three Strands Cross</h1>
          <p className="text-lg italic text-gray-600 mb-8">"Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken." — Ecclesiastes 4:12</p>

          <div className="space-y-6">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#C0A172]">The Three Strands</h2>
              <p className="mt-1">The three single strands entering the cross represent three distinct lives: the bride, the groom, and God, each whole and individual before the union.</p>
            </div>

            <div>
              <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#C0A172]">The Braid</h2>
              <p className="mt-1">The braiding of the strands symbolizes the couple becoming one, inextricably weaving their lives together while also incorporating God into the very fabric of their marriage.</p>
            </div>

            <div>
              <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#C0A172]">The Five Holy Wounds</h2>
              <p className="mt-1">The five circles represent the wounds of Jesus—in His hands, His feet, and His side. They symbolize the sacrificial love that forms the ultimate foundation of a Christian marriage.</p>
            </div>

            <div>
              <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#C0A172]">A Visual Covenant</h2>
              <p className="mt-1">This cross is a visual representation of the wedding ceremony itself—a lasting reminder of the vows made before God, and the strength He brings to the couple's journey together.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ThreeStrandsCross;
/*
generate image that: A digital emblem of a logo that looks like
a traditional ink stamp monogram, in the style of an ancient Chinese 
seal. The entire emblem is contained within distressed rectangular 
borders. The logo is structured in two columns. The left column has
'QUY' stacked above '& HI'. The right column has a large 'EN'. 
The font for 'QUY', 'HI', 'EN' is 'Cinzel Decorative'. The font for 
'&' is 'Cormorant Garamond' italic script. The entire logo is a single,
soft, sophisticated matcha green color (#A3B899). It has a double-layered,
distressed rectangular border, with the outer border being thicker
and more broken than the inner one. The style should be rustic
and handcrafted, like an imperfect ink stamp with texture and missing ink
spots. The background must be transparent.
*/