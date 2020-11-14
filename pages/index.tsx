import Head from 'next/head'
import {getSortedPostsData} from '../lib/posts'
import {Button, Card} from "react-bootstrap";
import RssFeeds from "../components/rssfeeds";

export default function Home({allPostsData}) {
  return (
    <div>
      {/*<Head>*/}
      {/*  <title>RSS Feeds</title>*/}
      {/*</Head>*/}
      <Card>
        <Card.Header as="h5">RSS FEED</Card.Header>
        <Card.Body>
          <RssFeeds/>
        </Card.Body>
      </Card>


      {/*<section className={utilStyles.headingMd}>*/}
      {/*  <p>[Your Self Introduction]</p>*/}
      {/*  <p>*/}
      {/*    (This is a sample website - you’ll be building a site like this in{' '}*/}
      {/*    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)*/}
      {/*  </p>*/}
      {/*</section>*/}
      {/*<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>*/}
      {/*  <h2 className={utilStyles.headingLg}>Blog</h2>*/}
      {/*  <ul className={utilStyles.list}>*/}
      {/*    {allPostsData.map(({ id, date, title }) => (*/}
      {/*      <li className={utilStyles.listItem} key={id}>*/}
      {/*        <Link href={`/posts/${id}`}>*/}
      {/*          <a>{title}</a>*/}
      {/*        </Link>*/}
      {/*        <br />*/}
      {/*        <small className={utilStyles.lightText}>*/}
      {/*          <Date dateString={date} />*/}
      {/*        </small>*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*</section>*/}
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
