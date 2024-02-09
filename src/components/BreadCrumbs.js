import React from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
function BreadCrumbs() {
  const { pathname } = useLocation();
  // console.log(pathname);
  const pathnames = pathname.split("/").filter((x) => x);
  pathnames.splice(0, 1);
  // console.log(pathnames);
  let breadcrumbsPath = "";
  return (
    <Breadcrumb className="breadcrumbs">
      <Breadcrumb.Item href="/" className="link">
        Home
      </Breadcrumb.Item>
      {pathnames.map((name, idx) => {
        breadcrumbsPath += `/${name}`;
        // console.log(breadcrumbsPath);
        const isLastLink = idx === pathnames.length - 1;
        return isLastLink ? (
          <Breadcrumb.Item key={idx} active>
            {name}
          </Breadcrumb.Item>
        ) : (
          // <span key={idx}>/ {name}</span>
          <Breadcrumb.Item key={idx}>
            <Link to={breadcrumbsPath}>{name}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default BreadCrumbs;
