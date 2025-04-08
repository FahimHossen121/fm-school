// components/Navigation.tsx
import Link from "next/link";

const Topics: React.FC = () => {
  const topics = [
    { name: "HTML", link: "/blogpost/html-home/" },
    { name: "CSS", link: "/blogpost/css-home/" },
    { name: "JS", link: "/blogpost/js/" },
    { name: "C", link: "/blogpost/c/" },
    { name: "C++", link: "/blogpost/cplusplus/" },
    { name: "JAVA", link: "/blogpost/java/" },
    { name: "PYTHON", link: "/blogpost/python/" },
    { name: "PHP", link: "/blogpost/php/" },
    { name: "REACT JS", link: "/blogpost/react-home/" },
  ];

  return (
    <section className="border-b mb-2 border-card">
      <div className="max-h-[6vh] min-h-[40px] flex items-center ml-3 mr-3 md:ml-10 md:mr-10 my-1">
        <span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            className="text-color-primary text-xl cursor-pointer dark:text-color-accent"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
          </svg>
        </span>
        <ul className="space-x-7 m-auto text-color-primary font-semibold hidden md:flex items-center">
          {topics.map((topic) => (
            <li
              key={topic.name}
              className="cursor-pointer hover:border-b-2 hover:border-color-primary active:border-b-4 dark:text-color-accent"
            >
              <Link href={topic.link}>{topic.name}</Link>
            </li>
          ))}
        </ul>
        <input
          id="search"
          className="block right-10 md:right-10 absolute w-48 md:w-60 h-8 bg-color-card rounded border-2 border-color-primary focus:border-color-primary focus:ring-2 focus:ring-color-ring text-base outline-none text-color-foreground py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-color-popover dark:text-color-muted"
          placeholder="Search..."
        />
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 1024 1024"
          className="text-color-primary dark:text-color-accent cursor-pointer text-2xl absolute right-3 md:right-12"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Topics;
