import {Button, Card, Form, Modal} from "react-bootstrap";
import RssFeeds from "../components/rssfeeds";
import {useEffect, useState} from "react";
import {RssSettings} from "../lib/models";

export default function Home({
                               feedSettings
                             }) {
  const [settings, changeSettings]: [any, any] = useState(feedSettings);
  const [showSettingModal, setShowSettingModal]: [any, any] = useState(false);

  const saveSettings = () => {
    fetch('/api/v1/feedSettings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    })
  }

  useEffect(()=>{
    console.log('test effect')
  })



  return (
    <div className="container">
      <h3 className="text-center mt-2">RSS FEED</h3>

      <div className="text-right">
        <Button size="sm" onClick={() => setShowSettingModal(true)}>Settings</Button>
      </div>

      <RssFeeds/>


      <Modal show={showSettingModal} onHide={() => setShowSettingModal(false)}>
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
          <Button variant="primary" size="sm"
                  onClick={saveSettings}
          >Save changes</Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export async function getStaticProps() {
  // todo: update url based on NODE_ENV
  const feedSettings = (await RssSettings.findOne());
  return {
    props: {
      // todo: optimize
      feedSettings:  JSON.parse(JSON.stringify(feedSettings))
    }
  }
}