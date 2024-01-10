import React from "react";
import { Link, useLocation } from "react-router-dom";

function BreadCrumbs() {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);
  pathnames.splice(0, 1);
  let breadcrumbsPath = "";
  return (
    <div className="breadcrumbs">
      <Link to="/" className="link">
        Home
      </Link>
      {pathnames.map((name, idx) => {
        breadcrumbsPath += `/${name}`;
        const isLastLink = idx === pathnames.length - 1;
        return isLastLink ? (
          <span key={name}>/ {name}</span>
        ) : (
          <Link key={name} to={breadcrumbsPath}>
            / {name}
          </Link>
        );
      })}
    </div>
  );
}

export default BreadCrumbs;
