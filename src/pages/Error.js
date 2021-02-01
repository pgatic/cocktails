import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="vh-100 baskerville tc pt5">
      <header className="ph5 lh-copy">
        <h2 className="f1-l fw1 gray">Ooops! It's a dead end</h2>
      </header>
      <Link to="/" className="f6 link dim br3 ba ph3 pv2 mb2 dib light-gray">
        Go back
      </Link>
    </section>
  );
};

export default Error;
