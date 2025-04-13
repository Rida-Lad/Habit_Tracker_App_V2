import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import goalImage from "../imgs/habit-photo.jpg";
import goalImage2 from "../imgs/habit2-photo.png";
import goalImage3 from "../imgs/progression1.png";
import goalImage4 from "../imgs/progression2.png";
import goalImage5 from "../imgs/progression3.png";

const Home = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="dark:bg-gray-900">
      {/* First Section */}
      <section className="py-12 bg-gradient-to-b from-blue-600 to-blue-500 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center">
            {/* Text Content */}
            <motion.div
              className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-100 mb-6">
                Achieve Your Goals with Our Habit Tracker
              </h1>
              <p className="text-lg text-white/90 dark:text-gray-300 mb-8">
                Our habit tracker app empowers you to build positive habits.
                With intuitive features and personalized insights, staying on
                track has never been easier.
              </p>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                onClick={() => navigate("/habits")}
              >
                Get Started
              </button>
            </motion.div>

            {/* Image */}
            <motion.div
              className="w-full md:w-1/2 relative"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              {/* Base image */}
              <img
                src={goalImage}
                alt="Achieve Goals"
                className="w-full h-auto rounded-lg shadow-xl relative z-10"
              />

              {/* Blue filter overlay */}
              <div
                className="absolute inset-0 bg-blue-900 opacity-50 mix-blend-multiply rounded-lg z-20"
                aria-hidden="true"
              ></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <motion.div
              className="w-full md:w-1/2 mb-8 md:mb-0"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Transform Your Habits, Transform Your Life
              </h1>
              <h3 className="text-lg text-gray-600 dark:text-gray-400">
                Unlock your potential with our intuitive habit tracker. Stay
                motivated, track your progress, and achieve your goals
                effortlessly.
              </h3>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <div className="relative">
                {/* Base image */}
                <img
                  src={goalImage2}
                  alt="Transform Your Life"
                  className="w-full h-auto rounded-lg shadow-xl relative z-10"
                />

                {/* Blue filter overlay */}
                <div
                  className="absolute inset-0 bg-blue-900 opacity-50 mix-blend-multiply rounded-lg z-20"
                  aria-hidden="true"
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Track Your Progress with Our Intuitive Habit Tracking System
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg mb-4 relative">
                <img
                  src={goalImage3}
                  alt="Set Personalized Goals"
                  className="w-full h-full object-cover relative z-10"
                />
                {/* Blue filter overlay */}
                <div
                  className="absolute inset-0 bg-blue-900 opacity-50 mix-blend-multiply z-20"
                  aria-hidden="true"
                ></div>
              </div>
              <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Set Personalized Goals and Achieve Them with Ease
              </h5>
              <p className="text-gray-600 dark:text-gray-400">
                Define clear, actionable goals tailored to your lifestyle, and
                take the first step toward positive change.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg mb-4 relative">
                <img
                  src={goalImage4}
                  alt="Stay Motivated"
                  className="w-full h-full object-cover relative z-10"
                />
                {/* Blue filter overlay */}
                <div
                  className="absolute inset-0 bg-blue-900 opacity-50 mix-blend-multiply z-20"
                  aria-hidden="true"
                ></div>
              </div>
              <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Stay Motivated with Reminders and Progress Tracking Features
              </h5>
              <p className="text-gray-600 dark:text-gray-400">
                Get timely reminders and monitor your progress with features
                designed to keep you focused and inspired.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg mb-4 relative">
                <img
                  src={goalImage5}
                  alt="Visualize Your Success"
                  className="w-full h-full object-cover relative z-10"
                />
                {/* Blue filter overlay */}
                <div
                  className="absolute inset-0 bg-blue-900 opacity-50 mix-blend-multiply z-20"
                  aria-hidden="true"
                ></div>
              </div>
              <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Visualize Your Success with Engaging Charts and Analytics
              </h5>
              <p className="text-gray-600 dark:text-gray-400">
                Analyze your performance with beautiful charts and analytics to
                celebrate your achievements and stay on track.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p style={{ fontFamily: 'Birthstone, sans-serif', fontSize: '3.5rem' }}
            className="text-4xl font-bold text-orange-500 mb-4">
            Habit Tracker
          </p>
          <p className="text-gray-400">
            &copy; 2025 Habit Tracker. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;