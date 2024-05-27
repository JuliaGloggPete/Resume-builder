import { Link } from "react-router-dom";

export const Navbar = () => {


  return (
    <header className="shadow-sm  ">
      <div className="mx-auto p-4 bg-MyBlue text-white rounded-tl-2xl">
        <nav className=" flex">
       {/*    <Link to="/">
            <img src={Logo} alt=" Logo" className="mr-2" />
          </Link> */}
          <ul className="flex gap-4">
            <Link to="/">
              {" "}
              <li>Hem </li>
            </Link>

            <Link to="/createCV">
              <li>Skapa CV</li>
            </Link>
          </ul>
        </nav>
        <p className="text-center uppercase  text-3xl"></p>

        <p className="text-center uppercase font-semibold text-5xl my-4">
          CV-Generator{" "}
        </p>
      </div>
    </header>
  );
};
