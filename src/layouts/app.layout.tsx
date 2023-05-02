import {Outlet, Link} from "react-router-dom";

export default function() {
  return (
    <div>
      {/* navigation */}
      <nav className="">
        <ul className="flex space-x-2">
          <li>
            <Link to="questions">Questions</Link>
          </li>
          <li>
            <Link to="sign-in">Sign in</Link>
          </li>
          <li>
            <Link to="sign-up">Sign up</Link>
          </li>
        </ul>
      </nav>
      <div className="w-1/3 p-1 mx-auto">
        <Outlet />
      </div>
    </div>
  )
}
