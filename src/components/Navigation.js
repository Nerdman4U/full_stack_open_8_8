import { Routes, Route, Link } from "react-router-dom";
import Authors from "./Authors";
import Books from "./Books";
import NewBook from "./NewBook";
import Home from "./Home";

const Navigation = () => {
  return (
    <>
      <div>
        <Link to="/authors">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add book</Link>
        <Link to="/">home</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </>
  );
};

export default Navigation;
