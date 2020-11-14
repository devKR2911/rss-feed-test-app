import {Alert, Card} from "react-bootstrap";
import {useEffect, useState} from "react";


export default function RssFeeds() {
  const [feeds,setFeeds] = useState(null);

  const loadFeeds =async () =>{
    // const data = await fetch('/api/v1/feeds');
    // setFeeds(data.json());
  }
  useEffect(()=>{
    loadFeeds();
  },[])

  return (
    feeds ?
      <div className="container d-flex justify-content-center">
        <div>
          <Card>
            <Card.Header as="h6">RSS FEED</Card.Header>
            <Card.Body>
            </Card.Body>
          </Card>
          <Card className="mt-2">
            <Card.Header as="h6">RSS FEED</Card.Header>
            <Card.Body>+-
            </Card.Body>
          </Card>
        </div>
      </div>
      :
      <div>
        <Alert variant="primary" className="mt-2" size={20}>Feed not found</Alert>
      </div>
  )
}