import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../custom.css";
import goalImage from "./imgs/habit-photo.jpg";
import goalImage2 from "./imgs/habit2-photo.png";
import goalImage3 from "./imgs/progression1.png";
import goalImage4 from "./imgs/progression2.png";
import goalImage5 from "./imgs/progression3.png";

const Home = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      {/* First Section */}
      <section className="home-section text-white">
        <div className="container py-5">
          <div className="row align-items-center">
            {/* Text Content */}
            <motion.div
              className="col-12 col-md-6 text-center text-md-start"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className="display-5 fw-bold">
                Achieve Your Goals with Our Habit Tracker
              </h1>
              <p className="mt-4">
                Our habit tracker app empowers you to build positive habits.
                With intuitive features and personalized insights, staying on
                track has never been easier.
              </p>
              <button
                className="btn btn-danger mt-4 fw-bold"
                onClick={() => navigate("/habits")}
              >
                Get Started
              </button>
            </motion.div>
            {/* Image */}
            <motion.div
              className="col-12 col-md-6 text-center mt-4 mt-md-0"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <img
                src={goalImage}
                alt="Achieve Goals"
                className="img-fluid rounded"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="transform-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-md-6"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className="fw-bold">
                Transform Your Habits, Transform Your Life
              </h1>
              <h3 className="mt-3 text-muted">
                Unlock your potential with our intuitive habit tracker. Stay
                motivated, track your progress, and achieve your goals
                effortlessly.
              </h3>
            </motion.div>
            <motion.div
              className="col-md-6 text-center"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <img
                src={goalImage2}
                alt="Transform Your Life"
                className="img-fluid rounded shadow"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section className="progress-section py-5 text-center">
        <div className="container">
          {/* Section Title */}
          <motion.h2
            className="fw-bold mb-5"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Track Your Progress with Our Intuitive Habit Tracking System
          </motion.h2>

          {/* Features */}
          <div className="row">
            {/* Feature 1 */}
            <motion.div
              className="col-md-4 mb-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <img
                src={goalImage3}
                alt="Set Personalized Goals"
                className="img-fluid rounded mb-3"
              />
              <h5 className="fw-bold">
                Set Personalized Goals and Achieve Them with Ease
              </h5>
              <p className="text-muted">
                Define clear, actionable goals tailored to your lifestyle, and
                take the first step toward positive change.
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="col-md-4 mb-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <img
                src={goalImage4}
                alt="Stay Motivated"
                className="img-fluid rounded mb-3"
              />
              <h5 className="fw-bold">
                Stay Motivated with Reminders and Progress Tracking Features
              </h5>
              <p className="text-muted">
                Get timely reminders and monitor your progress with features
                designed to keep you focused and inspired.
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              className="col-md-4 mb-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <img
                src={goalImage5}
                alt="Visualize Your Success"
                className="img-fluid rounded mb-3"
              />
              <h5 className="fw-bold">
                Visualize Your Success with Engaging Charts and Analytics
              </h5>
              <p className="text-muted">
                Analyze your performance with beautiful charts and analytics to
                celebrate your achievements and stay on track.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-footer text-white py-3">
        <div className="container text-center">
          <p
            className="mb-2"
            style={{
              fontFamily: "Dancing Script",
              fontSize: "35px",
              color: "orange",
            }}
          >
            Habit Tracker
          </p>
          <p className="mt-3 mb-0">
            &copy; 2025 Habit Tracker. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
