'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scrollProgress = useSpring(scrollYProgress, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX: scrollProgress }}
      />

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="fixed top-0 w-full z-40 glass-nav"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold"
            >
              <span className="text-blue-500">R</span>agulvasanth
            </motion.div>
            <div className="hidden md:flex space-x-2 bg-white/5 rounded-full p-1.5 backdrop-blur-xl border border-white/10">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`capitalize px-6 py-2.5 rounded-full transition-all duration-500 relative ${
                    activeSection === item
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-blue-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="inline-block"
                >
                  <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm">
                    👋 Welcome to my portfolio
                  </div>
                </motion.div>

                <motion.h1 
                  className="text-6xl lg:text-8xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Ragulvasanth
                  <br />
                  <span className="text-blue-500">Muthukumar</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="space-y-2"
                >
                  <p className="text-2xl lg:text-3xl text-gray-300 font-light">
                    AI Software Engineer
                  </p>
                  <p className="text-xl text-gray-500">Associate</p>
                </motion.div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-lg text-gray-400 leading-relaxed max-w-xl"
              >
                Building intelligent AI-powered solutions with cutting-edge machine learning 
                and modern software engineering practices. Specialized in developing scalable AI applications.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-4 bg-blue-500 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">View My Work</span>
                  <motion.div
                    className="absolute inset-0 bg-blue-400"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 border-2 border-blue-500/50 rounded-full font-semibold hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                >
                  Let's Talk
                </motion.button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex gap-6 pt-4"
              >
                {['GitHub', 'LinkedIn', 'Twitter'].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ y: -5, color: '#3b82f6' }}
                    className="text-gray-400 transition-colors text-sm font-medium"
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent, #3b82f6, transparent)",
                  filter: "blur(20px)",
                }}
              />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-full aspect-square max-w-lg mx-auto glass-card rounded-3xl overflow-hidden p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5" />
                <div className="relative h-full flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="text-9xl"
                  >
                    👨‍💻
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-32 relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl lg:text-7xl font-bold mb-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              About <span className="text-blue-500">Me</span>
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 text-lg text-gray-400 leading-relaxed"
              >
                <p className="text-xl">
                  I'm a passionate AI Software Engineer with expertise in developing intelligent 
                  solutions using machine learning and artificial intelligence.
                </p>
                <p>
                  My focus is on transforming complex data into actionable insights through 
                  innovative AI applications. I believe in leveraging cutting-edge AI technologies 
                  to solve real-world problems.
                </p>
                <p>
                  My goal is to build intelligent systems that not only meet technical requirements 
                  but also drive meaningful impact and deliver exceptional value.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { number: '3+', label: 'Years Experience', delay: 0 },
                  { number: '50+', label: 'Projects Done', delay: 0.1 },
                  { number: '30+', label: 'Happy Clients', delay: 0.2 },
                  { number: '10+', label: 'AI Models', delay: 0.3 }
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + stat.delay, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
                      y: -5
                    }}
                    className="glass-card rounded-2xl p-8 text-center group cursor-pointer"
                  >
                    <motion.div
                      className="text-5xl font-bold text-blue-500 mb-3"
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-32 relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl lg:text-7xl font-bold mb-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              My <span className="text-blue-500">Expertise</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  category: 'AI & Machine Learning',
                  skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision'],
                  icon: '🤖'
                },
                { 
                  category: 'Frontend Development',
                  skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                  icon: '⚛️'
                },
                { 
                  category: 'Backend & Cloud',
                  skills: ['Python', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
                  icon: '☁️'
                }
              ].map((group, index) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)",
                  }}
                  className="glass-card rounded-3xl p-8 group"
                >
                  <motion.div 
                    className="text-6xl mb-6"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {group.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-6 group-hover:text-blue-400 transition-colors">
                    {group.category}
                  </h3>
                  <ul className="space-y-4">
                    {group.skills.map((skill, idx) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                        className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors"
                      >
                        <motion.span 
                          whileHover={{ scale: 2, backgroundColor: '#3b82f6' }}
                          className="w-2 h-2 bg-blue-500/50 rounded-full mr-3"
                        />
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-32 relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl lg:text-7xl font-bold mb-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured <span className="text-blue-500">Projects</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'AI Chatbot Platform', tech: ['Python', 'TensorFlow', 'React'], emoji: '🤖' },
                { title: 'Image Recognition System', tech: ['PyTorch', 'OpenCV', 'FastAPI'], emoji: '👁️' },
                { title: 'Predictive Analytics Dashboard', tech: ['Next.js', 'ML Models', 'D3.js'], emoji: '📊' },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="glass-card rounded-3xl overflow-hidden group cursor-pointer"
                >
                  <motion.div 
                    className="relative h-64 bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="text-8xl"
                    >
                      {project.emoji}
                    </motion.div>
                  </motion.div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      A cutting-edge AI application built with modern technologies and best practices.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tech.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                          className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-32 relative">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl lg:text-7xl font-bold mb-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Let's <span className="text-blue-500">Connect</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-card rounded-3xl p-10 lg:p-14"
            >
              <form className="space-y-6">
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                  />
                </motion.div>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                  />
                </motion.div>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <textarea
                    rows={6}
                    placeholder="Your Message"
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none backdrop-blur-sm"
                  ></textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-5 bg-blue-500 rounded-2xl font-semibold hover:bg-blue-600 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Send Message</span>
                  <motion.div
                    className="absolute inset-0 bg-blue-400"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-nav border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-gray-400"
            >
              © 2024 Ragulvasanth Muthukumar. All rights reserved.
            </motion.div>
            <div className="flex gap-8">
              {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -3, color: '#3b82f6' }}
                  className="text-gray-400 transition-colors font-medium"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
