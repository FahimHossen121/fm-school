const Footer = () => {
  return (
    <footer className="backdrop:blur border-t border-black mt-4">
      <div className=" pb-2 flex justify-around items-center flex-wrap gap-5  mt-4   mb-2 ">
        <div className="text-white-500 flex gap-2">
          <a
            href="https://example.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Replace with actual Terms & Conditions link */}
            Terms & Conditions
          </a>
          <p>|</p>
          <a
            href="https://example.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Replace with actual Privacy Policy link */}
            Privacy Policy
          </a>
        </div>

        <div className="flex gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            {/* Replace with actual GitHub link */}
            <img
              src="/github.svg"
              alt="github"
              className="w-1/2 h-1/2 theme-icon"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            {/* Replace with actual Twitter link */}
            <img
              src="/twitter.svg"
              alt="twitter"
              className="w-1/2 h-1/2 theme-icon"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            {/* Replace with actual Instagram link */}
            <img
              src="/instagram.svg"
              alt="instagram"
              className="w-1/2 h-1/2 theme-icon"
            />
          </a>
        </div>

        <p className="text-white-500">© 2024 FM School. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
