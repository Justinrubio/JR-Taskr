import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const {data: session} = useSession();

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  if (!session) {
    return (
      <Layout>
        <h2>My tasks</h2>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        
    <div className="d-flex center">
      <Link href="/">
          <a className="" data-active={isActive("/")}>
            Task board
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>My tasks</a>
        </Link>
      </div>

        <main>
          {props.drafts.map((post) => (
            <div key={post.id} className="card post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: black;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }

        a {
          text-decoration: none;
          color: #f7f7f7;
          display: inline-block;
          margin-bottom: 1rem;
        }

        a + a {
          margin-left: 1rem;
        }

        .center a[data-active="true"] {
          border-bottom: 1px solid #f7f7f7;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;