import React from 'react';
import { FaRocket, FaLightbulb, FaUsers, FaCalendarAlt, FaChartBar } from 'react-icons/fa';
import { Link } from "react-router-dom"; // Import Link for navigation


const TaskFlowHero = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-full text-white min-h-screen h-full flex flex-col items-center p-6 justify-center overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute rounded-full bg-blue-500 filter blur-2xl opacity-40 animate-pulse" style={{ top: '10%', left: '10%', width: '200px', height: '200px' }}></div>
        <div className="absolute rounded-full bg-purple-500 filter blur-3xl opacity-50 animate-pulse" style={{ top: '30%', right: '20%', width: '300px', height: '300px' }}></div>
        <div className="absolute rounded-full bg-teal-500 filter blur-xl opacity-30 animate-pulse" style={{ bottom: '20%', left: '30%', width: '150px', height: '150px' }}></div>
      </div>

      {/* Hero Text and Button */}
      <div className="relative z-10 flex flex-col items-center"> {/* Added flex and items-center */}
        <h1 className="text-12xl md:text-8xl font-bold text-center max-w-4xl leading-tight mb-4 mt-35" style={{ letterSpacing: '-0.05em', lineHeight: '1.2' }}> {/* Added mt-12 */}
          Revolutionize Task <br className="hidden md:block" /> Management
        </h1>

        <p className="mt-6 text-lg text-center max-w-3xl text-gray-300 p-4">
          Unleash the power of AI with TaskFlow and transform the way your team collaborates. From project tracking to automated workflows, experience productivity like never before.
        </p>
        <Link to="/tasks">

        <button className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full text-lg shadow-lg transition-all duration-300">
          🚀 Get Started Now
        </button>

        </Link>
      </div>

      {/* Features Section */}
      <div className='mt-20 text-3xl font-semibold'>Key Features</div>
      <div className="relative z-10 mt-12  mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-8 max-w-6xl">
        {/* Feature Box Component (extracted for reusability) */}
        <FeatureBox
          icon={<FaLightbulb className="text-4xl text-blue-400 mb-2" />}
          title="Smart Workflows"
          description="Automate tasks with AI-driven routing that adapts to your team's dynamics."
        />
        <FeatureBox
          icon={<FaUsers className="text-4xl text-green-400 mb-2" />}
          title="Team Collaboration"
          description="Foster seamless teamwork with real-time updates and shared workspaces."
        />
        <FeatureBox
          icon={<FaCalendarAlt className="text-4xl text-yellow-400 mb-2" />}
          title="Smart Scheduling"
          description="Manage deadlines effortlessly with intelligent calendar integration and reminders."
        />
        <FeatureBox
          icon={<FaChartBar className="text-4xl text-red-400 mb-2" />}
          title="Analytics Dashboard"
          description="Gain visual insights into team performance and project progress with detailed analytics."
        />
      </div>
    </div>
  );
};

// Reusable Feature Box Component
const FeatureBox = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col h-full">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4">{icon}</div>
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="text-sm text-gray-400 flex-grow">{description}</p>
      </div>
    </div>
  );
};

export default TaskFlowHero;
