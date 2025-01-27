import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Join: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      {/* Join the SkyForge Team Section */}
      <motion.div
        className="py-32 px-12 text-center bg-gray-900 bg-opacity-80 rounded-lg shadow-lg mx-auto max-w-7xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Join the SkyForge Team
        </h2>
        <p className="text-xl max-w-4xl mx-auto text-gray-300 mb-10 leading-relaxed">
          We are always looking for passionate individuals to join SkyForge.
          Whether you're a developer, designer, community manager, or aviation
          enthusiast, there's a place for you in our team. Help us build the 
          future of flight simulation and air traffic control tools!

          Keep in mind that SkyForge is a ongrowing independent project, <strong>for now</strong> all staff positions are volunteer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-left mt-8">
          {[
            {
              title: "👨‍💻 DevOps Team",
              desc: "Join our dev team to create technologies of various kind to improve the immersion and realism.",
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
              desc: "Monitor Discord, forums, and support channels. Ensure respectful discussions and enforce community rules.Provide first-line support for user",
            },
            {
              title: "📢 Partnership Manager",
              desc: "Builds relationships with IVAO, MSFS developers, and aviation networks. Negotiates sponsorships, collaborations, and industry partnerships. Helps integrate SkyForge with major flight simulation tools.",
            },
            {
              title: "📘 Documentation Creator",
              desc: "Writes blog posts, documentation, and social media content.Creates video tutorials and guides for SkyForge tools.Helps build SkyForge’s brand and awareness.",
            },
          ].map((item, index) => (
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

        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=mikhaelmiro300@gmail.com&su=Application%20to%20Join%20SkyForge&body=Hello%20SkyForge%20Team,%0D%0A%0D%0AI%20am%20interested%20in%20joining%20SkyForge.%20Here%20is%20my%20information:%0D%0A%0D%0AName:%0D%0AEmail:%0D%0ARole%20Applying%20For:%0D%0AWhy%20I%20Want%20to%20Join:%0D%0A%0D%0AThank%20you!"
          className="mt-12 inline-block px-10 py-5 text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-400 hover:scale-105 transition-all duration-300 rounded-lg shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        >
          Apply Now
        </motion.a>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Join;
