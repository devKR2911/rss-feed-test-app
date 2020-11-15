import {Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import SettingsModal from '../components/settingsModal';
import FeedList from '../components/feedsList';
import {toast} from 'react-nextjs-toast';

export default function Home() {
  const router = useRouter();
  const [selectedSettings, setSelectedSettings]: [any, any] = useState(null);
  const [showSettingModal, setShowSettingModal]: [any, any] = useState(false);
  const [feeds, setFeeds]: [any[], any] = useState(null);

  const deleteSettings = async (id) => {
    if (confirm('Do you really want to delete the feed?')) {
      /*      await fetch(`/api/feeds/${id}`, {
        method: 'DELETE',
      });*/

      await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          query: `mutation{
           FeedDelete(id : ${JSON.stringify(id)})
        }`,
        }),
      });
      toast.notify('Deleted successfully', {
        duration: 3,
        type: 'success',
      });
      await getFeedList();
    }
  };

  const getFeedList = async () => {
    // const data = await fetch('/api/feeds');
    const data = await fetch('/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `{
           FeedList{
               _id
              feedUrl
              headerFontSize
              contentFontSize
              headerColor
              contentColor
              backgroundColor
              width
              height
           }
        }`,
      }),
    });
    setFeeds((await data.json())?.data.FeedList);
  };

  useEffect(() => {
    getFeedList();
  }, []);

  return (
    <div className="container">
      <h3 className="text-center mt-2">RSS FEEDs</h3>

      <FeedList
        feeds={feeds}
        onEdit={(feed) => {
          setSelectedSettings(feed);
          setShowSettingModal(true);
        }}
        onDelete={deleteSettings}
        onView={(id) => router.push(`/${id}`)}
      />

      <div className="text-right mt-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setSelectedSettings({
              headerFontSize: 18,
              contentFontSize: 12,
              headerColor: '#000000',
              contentColor: '#000000',
              backgroundColor: '#ffffff'
            });
            setShowSettingModal(true);
          }}
        >
          <i className="fa fa-plus mr-1"></i>
          Add New Feed
        </Button>
      </div>

      <SettingsModal
        selectedSettings={selectedSettings}
        onSettingsUpdate={setSelectedSettings}
        show={showSettingModal}
        onHide={() => setShowSettingModal(false)}
        onSave={getFeedList}
      />
    </div>
  );
}
