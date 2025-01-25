import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const careers = [
  {
    title: "👨‍💻 DevOps Team",
    desc: "Join our dev team to create technologies of various kinds to improve immersion and realism.",
  },
  {
    title: "🎨 UI/UX Designer",
    desc: "Help design an intuitive and immersive experience for virtual pilots and controllers.",
  },
  {
    title: "📢 Community Manager",
    desc: "Engage with our users, gather feedback, and help build a strong aviation simulation community.",
  },
  {
    title: "✈ Aviation Expert",
    desc: "Use your aviation knowledge to enhance our tools and ensure real-world accuracy.",
  },
  {
    title: "📄 Content Creator",
    desc: "Write guides, create videos, and help document our software for new users.",
  },
  {
    title: "🛠 Beta Tester",
    desc: "Test new features, report bugs, and provide insights to improve SkyForge products.",
  },
  {
    title: "🛡️ Moderators",
    desc: "Monitor Discord, forums, and support channels. Ensure respectful discussions and enforce community rules. Provide first-line support for users.",
  },
  {
    title: "📢 Partnership Manager",
    desc: "Build relationships with IVAO, MSFS developers, and aviation networks. Negotiate sponsorships, collaborations, and industry partnerships. Help integrate SkyForge with major flight simulation tools.",
  },
  {
    title: "📘 Documentation Creator",
    desc: "Write blog posts, documentation, and social media content. Create video tutorials and guides for SkyForge tools. Help build SkyForge’s brand and awareness.",
  },
];

const Careers: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <motion.div
        className="py-24 px-12 text-center bg-gray-900 bg-opacity-80 rounded-lg shadow-lg mx-auto max-w-7xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Join Our Team
        </h1>
        <p className="text-xl max-w-4xl mx-auto text-gray-300 mb-10 leading-relaxed">
          SkyForge is looking for passionate individuals to help shape the future of flight simulation technology. Whether you're a developer, designer, or aviation expert, we have a place for you!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-left mt-8">
          {careers.map((item, index) => (
            <motion.div
              key={index}
              className="p-8 bg-gray-800 border border-gray-700 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 1 }}
            >
              <h3 className="text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Application Form Section */}
      <motion.div
        className="py-24 px-12 text-center bg-gray-800 bg-opacity-90 rounded-lg shadow-lg mx-auto max-w-4xl mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Apply Now
        </h2>
        {submitted ? (
          <p className="text-lg text-gray-300">Thank you for your application! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              onChange={handleChange}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              onChange={handleChange}
            />
            <textarea 
              name="message" 
              placeholder="Tell us why you want to join, feel free to send us your portfolio..." 
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              onChange={handleChange}
            ></textarea>
            <button 
              type="submit" 
              className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-all duration-300 rounded-lg shadow-lg"
            >
              Submit Application
            </button>
          </form>
        )}
      </motion.div>

      <Footer />
    </div>
  );
};

export default Careers;
