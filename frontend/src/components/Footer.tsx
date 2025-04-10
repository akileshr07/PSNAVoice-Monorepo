import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">

        {/* Main Footer Text */}
        <div className="mb-8">
          <p className="text-xl font-semibold text-gray-700 mb-2">
            PSNA Voice - Your Platform for Change
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Making our college better, together.
          </p>
          <div className="flex items-center justify-center text-gray-400 text-sm gap-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by Akilesh R</span>
          </div>
        </div>

        {/* Akilesh's Developer Card */}
        <div className="bg-white border rounded-xl shadow-md p-6 w-full max-w-2xl text-left text-gray-700">
          <div className="flex items-start gap-5 mb-4">
            {/* Photo */}
            <div className="w-24 h-24 rounded-lg overflow-hidden border">
              <img
                src="/image.png"
                alt="Akilesh R"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Info */}
            <div>
              <h2 className="text-lg font-bold">Akilesh R</h2>
              <p className="text-sm text-gray-500 mb-2">Software Developer (Fresher)</p>
              <p className="text-sm mb-2">
                Passionate about frontend, backend, and DBMS. I enjoy coding and solving problems.
              </p>
              <div className="text-sm text-gray-600 leading-relaxed">
                📞 +91 6382344469 <br />
                📧 <a href="mailto:iamakilesh07@gmail.com" className="underline">iamakilesh07@gmail.com</a> <br />
                🌐 <a href="https://github.com/akileshr07" target="_blank" rel="noopener noreferrer" className="underline">github.com/akileshr07</a> <br />
                📍 Dindigul
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="text-sm font-semibold mb-1">Skills:</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {["Java", "MySQL", "ReactJS", "HTML", "CSS", "JavaScript"].map(skill => (
                <span key={skill} className="bg-gray-100 px-2 py-0.5 rounded-full">{skill}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
