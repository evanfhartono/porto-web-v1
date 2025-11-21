import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './App.css';

// Type definitions
interface Section {
  id: string;
  name: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  fallback: string;
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const sections: Section[] = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "AI Leaf Disease Prediction",
      description: "Machine learning model that identifies plant diseases from leaf images using computer vision and deep learning techniques.",
      image: "https://private-user-images.githubusercontent.com/143238961/496492753-32b70911-296e-4102-8400-60c2d16b2f9d.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM3NDYzOTQsIm5iZiI6MTc2Mzc0NjA5NCwicGF0aCI6Ii8xNDMyMzg5NjEvNDk2NDkyNzUzLTMyYjcwOTExLTI5NmUtNDEwMi04NDAwLTYwYzJkMTZiMmY5ZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyMVQxNzI4MTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00MjM3MTViNzhkYmM1Yjk0YjNjNmFhZmE1NGZmNTg3ZjhmOGQ2ODU1MjY2ODc1OGZlMzYwMzg3MjlkMzgzOWNiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.YvfURgkd_0ODpHohKY1FHsKReOUN7JCYOOR8iWQwFhY",
      github: "https://github.com/evanfhartono/AI_model_leaf_prediction",
      fallback: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
    },
    {
      id: 2,
      title: "Racing Game Web",
      description: "Interactive browser-based racing game built with JavaScript, featuring real-time physics and multiplayer capabilities.",
      image: "https://private-user-images.githubusercontent.com/143238961/496480079-ee0daf8b-078e-4432-8ccc-8df8cfceab8b.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM3NDYzOTUsIm5iZiI6MTc2Mzc0NjA5NSwicGF0aCI6Ii8xNDMyMzg5NjEvNDk2NDgwMDc5LWVlMGRhZjhiLTA3OGUtNDQzMi04Y2NjLThkZjhjZmNlYWI4Yi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyMVQxNzI4MTVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yNmY1ZmFkNGU1MTRlZjU1NTljODYzMDA1NjZlMDc2NTkzOWIyZTE3NTlhMzBiZWI5Zjg0Y2MyNDhmMDU0YTdiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.pk_9yS78kaVWN-WSSr8qTY9YJt0hGAlcPOP9now_JYA",
      github: "https://github.com/evanfhartono/racing-game-web",
      fallback: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 3,
      title: "WAQU Water Quality App",
      description: "Mobile application for monitoring and analyzing water quality parameters with real-time data visualization.",
      image: "https://private-user-images.githubusercontent.com/143238961/496498878-7ca670d2-6efe-4552-862d-21c8e4833677.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM3NDYzOTUsIm5iZiI6MTc2Mzc0NjA5NSwicGF0aCI6Ii8xNDMyMzg5NjEvNDk2NDk4ODc4LTdjYTY3MGQyLTZlZmUtNDU1Mi04NjJkLTIxYzhlNDgzMzY3Ny5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyMVQxNzI4MTVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01OGIwYTgxNzJhYmRkZTk4YjZhYzI3YTQyZjc3ZjAxNzZjMmY2ZGZmNmQyZGY1MmZhODBmNmQ4YmExZTQ2MjViJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.bYSTrWmPqv2_srw4j3VxEnMRokxulAN18MhFEg3cUm0",
      github: "https://github.com/evanfhartono/waqu-water-quality-app",
      fallback: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1115&q=80"
    },
    {
      id: 4,
      title: "YouTube Views Prediction",
      description: "Machine learning model that predicts YouTube video views based on various features using regression algorithms.",
      image: "https://private-user-images.githubusercontent.com/143238961/496489620-5b45f087-a73e-4f15-8a69-d8eb3d6a9c9f.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM3NDYzOTgsIm5iZiI6MTc2Mzc0NjA5OCwicGF0aCI6Ii8xNDMyMzg5NjEvNDk2NDg5NjIwLTViNDVmMDg3LWE3M2UtNGYxNS04YTY5LWQ4ZWIzZDZhOWM5Zi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyMVQxNzI4MThaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hMzIwYzhmMzBkOTYwYWQ2M2UxNDc0OGQ4MDVjZTBlYWNkNDliM2YxY2I3MjhiYzEzN2RmN2U0NDU2ZWRiM2ZiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.bAD9cnha-fePh68kmB9sl_QHeHTTI76CjkO7VpCSPgM",
      github: "https://github.com/evanfhartono/youtube_views_prediction",
      fallback: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80"
    },
    {
      id: 5,
      title: "Movie Recommendation System",
      description: "Content-based movie recommendation engine using TF-IDF and cosine similarity for personalized suggestions.",
      image: "https://private-user-images.githubusercontent.com/143238961/517501531-559daebb-5753-4c28-843a-173bf318a432.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM3NDYzOTcsIm5iZiI6MTc2Mzc0NjA5NywicGF0aCI6Ii8xNDMyMzg5NjEvNTE3NTAxNTMxLTU1OWRhZWJiLTU3NTMtNGMyOC04NDNhLTE3M2JmMzE4YTQzMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyMVQxNzI4MTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mNTAxMmZmNzhlNzEyODA3ZjM5ZWY4YTFkZmVkNGNmMDY4MmI3ZTAzZmU1NGNlYTY2ZWEzODQ3MDlkMjM5ZWJhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.7jkeOQUekMQasxM7unjXSyVruRebiX9oi9nSrdZvXl8",
      github: "https://github.com/evanfhartono/tfidf_cosinesim_moview_recommendation_program",
      fallback: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 6,
      title: "ASL Hand Gesture Recognition",
      description: "Computer vision system that recognizes American Sign Language gestures using deep learning and image processing.",
      image: "https://private-user-images.githubusercontent.com/143238961/517500062-dca16801-3158-4e14-9b07-662b273bafbf.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM3NDY0MDIsIm5iZiI6MTc2Mzc0NjEwMiwicGF0aCI6Ii8xNDMyMzg5NjEvNTE3NTAwMDYyLWRjYTE2ODAxLTMxNTgtNGUxNC05YjA3LTY2MmIyNzNiYWZiZi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyMVQxNzI4MjJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kYmYzYmNlMDY1YThlMDFkMDRhNDhiNThlZmRiZTcyZGQ0NTQ4ZWM2ZWU0ODMzYTExZjcyZjFiOTI3NGQ0MjgwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.0Cre1xgys9S_Qy-qQC7c849_wASr5uFU_rEByUcW-Ug",
      github: "https://github.com/evanfhartono/asl_hand_gesture_recognition",
      fallback: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
    }
  ];

  const skills: string[] = [
    "JavaScript", "Python", "React", "Node.js", "AI/ML", "Web Development",
    "Tailwind CSS", "MongoDB", "TensorFlow", "Computer Vision", "Deep Learning"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = document.querySelectorAll('section');

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (sectionId && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextCarousel = (): void => {
    setCarouselIndex((prev) => (prev + 1) % 3);
  };

  const prevCarousel = (): void => {
    setCarouselIndex((prev) => (prev - 1 + 3) % 3);
  };

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallback: string): void => {
    e.currentTarget.src = fallback;
  };

  return (
    <div className="app">
      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
          >
            Evan F Hartono
          </motion.div>
          
          <div className="nav-links">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={activeSection === section.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                {section.name}
              </a>
            ))}
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={activeSection === section.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                {section.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hello, I'm <span className="gradient-text">Evan F. Hartono</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Aspiring Software Engineer & AI Enthusiast
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button 
                className="btn primary"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          onClick={() => scrollToSection('about')}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <p>Scroll Down</p>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          
          <div className="about-content">
            <motion.div 
              className="profile-section"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="profile-image-container">
                <img 
                  src="https://private-user-images.githubusercontent.com/143238961/517509592-786dcf21-fbcf-4d27-8158-fbf9aa3f0fbc.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM3NDYwODIsIm5iZiI6MTc2Mzc0NTc4MiwicGF0aCI6Ii8xNDMyMzg5NjEvNTE3NTA5NTkyLTc4NmRjZjIxLWZiY2YtNGQyNy04MTU4LWZiZjlhYTNmMGZiYy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyMVQxNzIzMDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xMWQ5MGMxODZhYmY5ZTE1MjUwYWE5N2YwOGRiYWQwNGZlNGZjZTk4N2JkNzMxYTY2MTk4YjRhMWFjNDRjMmY3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.7PAqY7I_yy1Nj_s687AlMhS8q3Z4i0BEiMqe1Yvi6WM" 
                  alt="Evan F Hartono" 
                  className="profile-image"
                  onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80')}
                />
                <div className="image-glow"></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3>My Journey</h3>
              <p>
                I'm a Computer Science student passionate about AI, Web Development, and building useful applications 
                that solve real-world problems.
              </p>
              <p>
                With a strong foundation in programming and problem-solving, I enjoy creating innovative solutions 
                and learning new technologies. My goal is to contribute to projects that make a positive impact on people's lives.
              </p>
              
              <div className="skills">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            My Projects
          </motion.h2>
          
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured projects showcasing my skills and experience
          </motion.p>

          {/* Project Carousel */}
          <motion.div 
            className="carousel-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="carousel-track" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="carousel-slide">
                  <motion.div 
                    className="project-card featured"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-image">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        onError={(e) => handleImageError(e, project.fallback)}
                      />
                    </div>
                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <a 
                        href={project.github} 
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on GitHub <FiArrowRight />
                      </a>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            <div className="carousel-nav">
              <button className="carousel-btn" onClick={prevCarousel}>
                <FiChevronLeft />
              </button>
              <button className="carousel-btn" onClick={nextCarousel}>
                <FiChevronRight />
              </button>
            </div>
            
            <div className="carousel-indicators">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  className={`indicator ${carouselIndex === index ? 'active' : ''}`}
                  onClick={() => setCarouselIndex(index)}
                />
              ))}
            </div>
          </motion.div>

          {/* All Projects Grid */}
          <motion.h3 
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            All Projects
          </motion.h3>
          
          <motion.div 
            className="projects-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    onError={(e) => handleImageError(e, project.fallback)}
                  />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a 
                    href={project.github} 
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub <FiArrowRight />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <motion.div 
              className="logo"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Evan F Hartono
            </motion.div>
            
            <motion.div 
              className="social-links"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a href="https://github.com/evanfhartono" target="_blank" rel="noopener noreferrer">
                <FiGithub />
              </a>
              <a href="https://linkedin.com/in/evanfhartono" target="_blank" rel="noopener noreferrer">
                <FiLinkedin />
              </a>
              <a href="mailto:evanfhartono@gmail.com">
                <FiMail />
              </a>
            </motion.div>
            
            <motion.p 
              className="copyright"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              © 2025 Evan F Hartono. All rights reserved.
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;