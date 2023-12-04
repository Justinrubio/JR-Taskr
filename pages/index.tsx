import React from "react"
import type { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from "../lib/prisma";
import Link from "next/link";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: { feed },
    revalidate: 10,
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
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
          {props.feed.map((post) => (
            <div key={post.id} className="card post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .page {
          background: #2c2c2c;
          color: #f7f7f7;
        }

        .post {
          background: #121212;
          transition: box-shadow 0.1s ease-in;
          color: #f7f7f7;
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
  )
}

export default Blog
