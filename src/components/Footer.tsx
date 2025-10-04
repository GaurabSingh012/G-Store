const Footer = () => {
  return (
    <footer
      className="w-full bg-gray-800 text-white flex items-center justify-center 
                 h-9 text-[12px]  
                 sm:h-6 sm:text-xs 
                 md:h-7 md:text-sm 
      "
    >
      &copy; {new Date().getFullYear()} G-Store. Created with ❤️ by Gaurab.
    </footer>
  );
};

export default Footer;
