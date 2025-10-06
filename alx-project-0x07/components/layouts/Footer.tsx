import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h1 className="text-lg font-semibold">Image Generation App</h1>
        <p className="mt-2 text-sm">© {new Date().getFullYear()}. All rights reserved.</p>
        <div className="mt-4">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
