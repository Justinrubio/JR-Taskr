import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const {data: session, status} = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold logo" data-active={isActive("/")}>
          Taskr
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        .logo {
          color: gray;
          font-size: 2rem;
          border: none !important;
        }

        a {
          text-decoration: none;
          color: #f7f7f7;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
          font-size: 2rem;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
          <h3 className="bold">
            Taskr Loading...
          </h3>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
              color: #f7f7f7;
            }
  
          .right a {
            border: 1px solid #f7f7f7;
            color: #f7f7f7;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (

      <div className="left d-flex w-100">
        <Link href="/">
        <a className="bold logo" data-active={isActive("/")}>
          Taskr
        </a>
      </Link>        
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          .center {
            width: 100%;
            justify-content: center;
            align-items: center;
          }

          .logo {
            color: gray;
            font-size: 2rem;
            border: none !important;
          }

          a {
            text-decoration: none;
            color: #f7f7f7;
            display: inline-block;
            padding-bottom: 8px;
          }

          .left a[data-active="true"] {
            border-bottom: 1px solid #f7f7f7;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="nav-info right d-flex align-center">
        <span>
          {session.user.name} ({session.user.email})
        </span>
        <div className="nav-actions d-flex">
        <Link href="/create">
          <button className="btn-small no-wrap">
            <a>New task</a>
          </button>
        </Link>
        <button className="btn-small d-flex" onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        </div>
        <style jsx>{`
        .nav-info {
          font-size: 0.8rem;
          align-items: center;
        }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid #f7f7f7;
            background: unset;
            color: #f7f7f7;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            background: none; 
            border: none;
          }

          .btn-small {
            text-wrap: nowrap;
          }
        
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 0 0 2rem 0;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;