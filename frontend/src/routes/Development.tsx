import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UnderDevelopment = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Runway Link is currently under development!
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-6">
            Keep in mind that this is an <strong>early test</strong> version.You might encouter bugs or errors.<br></br> 
            If so, please report them on the "give your feedback" above to help us improve or add features to this tool.
        </p>
        <Link
          to="/select-airport"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg transition duration-300"
        >
          Continue to Runway Link
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default UnderDevelopment;
