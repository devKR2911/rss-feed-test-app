import Head from 'next/head'
import {getSortedPostsData} from '../lib/posts'
import {Button, Card, Form, Modal} from "react-bootstrap";
import RssFeeds from "../components/rssfeeds";
import {useEffect, useState} from "react";

export default function Home() {
  const [settings, changeSettings]: [any, any] = useState({});
  const [showSettingModal, setShowSettingModal]: [any, any] = useState(false);
  useEffect(() => {
    fetch('/api/v1/feedSettings').then(res => {
      res.json().then(settings => {
        changeSettings(settings)
      }).catch(() => {
      })

    })
  })


  return (
    <div className="container">
      <h3 className="text-center mt-2">RSS FEED</h3>

      <div className="text-right">
        <Button size="sm" onClick={() => setShowSettingModal(true)}>Settings</Button>
      </div>

      <RssFeeds/>


      <Modal show={showSettingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Feed Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rss Feed URL</Form.Label>
              <Form.Control size="sm" type="url" placeholder="Feed URL"
                            value={settings.feedUrl || ''}
                            onInput={e => changeSettings({
                              ...settings,
                              feedUrl: e.target.value
                            })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Font Size</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Font size"
                            value={settings.fontSize || ''}
                            onInput={e => changeSettings({
                              ...settings,
                              fontSize: e.target.value
                            })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Header Color</Form.Label>
              <Form.Control size="sm" type="color" placeholder="Select Header Color"
                            value={settings.headerColor || ''}
                            onInput={e => changeSettings({
                              ...settings,
                              headerColor: e.target.value
                            })}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Content Color</Form.Label>
              <Form.Control size="sm" type="color" placeholder="Select Content Color"
                            value={settings.contentColor || ''}
                            onInput={e => changeSettings({
                              ...settings,
                              contentColor: e.target.value
                            })}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Background Color</Form.Label>
              <Form.Control size="sm" type="color" placeholder="Select Background Color"
                            value={settings.backgroundColor || ''}
                            onInput={e => changeSettings({
                              ...settings,
                              backgroundColor: e.target.value
                            })}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Block Width</Form.Label>
              <Form.Control size="sm" type="number" placeholder="Block Width"
                            value={settings.blockWidth || ''}
                            onInput={e => changeSettings({
                              ...settings,
                              blockWidth: e.target.value
                            })}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Block Width</Form.Label>
              <Form.Control size="sm" type="number" placeholder="Block Height"
                            value={settings.blockHeight || ''}
                            onInput={e => changeSettings({
                              ...settings,
                              blockHeight: e.target.value
                            })}/>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" size="sm"
                  onClick={() => setShowSettingModal(false)}
          >Close</Button>
          <Button variant="primary" size="sm">Save changes</Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}


// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch('/api/v1/feedSettings')
//   const feedSettings = await res.json()
//
//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       feedSettings,
//     },
//   }
// }