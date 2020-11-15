import {Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import SettingsModal from '../components/SettingsModal';
import FeedList from '../components/FeedsList';
import {toast} from 'react-nextjs-toast';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Home() {
  const router = useRouter();
  const [selectedSettings, setSelectedSettings]: [any, any] = useState(null);
  const [showSettingModal, setShowSettingModal]: [any, any] = useState(false);
  const [showConfirmModal, setShowConfirmModal]: [any, any] = useState(false);
  const [confirmFn, setConfirmFn]: [any, any] = useState(null);
  const [feeds, setFeeds]: [any[], any] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function for deleting feed
  const deleteSettings = (id) => {
    setConfirmFn(() => async () => {
      await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          query: `mutation{
           FeedDelete(id : ${JSON.stringify(id)})
        }`,
        }),
      });

      setShowConfirmModal(false);
      await getFeedList();
      toast.notify('Deleted successfully', {
        duration: 6,
        type: 'success',
      });
    });
    setShowConfirmModal(true);
  };

  // Function for getting feed list
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
              image
              description
           }
        }`,
      }),
    });
    setFeeds((await data.json())?.data.FeedList);
    setLoading(false);
  };

  // Load list on page load
  useEffect(() => {
    getFeedList();
  }, []);

  return (
    <div className="container">

      {loading && (
        <div className="justify-content-center d-flex align-content-center mt-4">
          <span>Loading please wait &nbsp;&nbsp;&nbsp;</span>
          <i className="fas fa-circle-notch fa-spin" style={{fontSize: '30px'}}></i>
        </div>
      )}

      {!loading && <>
        <FeedList
          feeds={feeds}
          onEdit={(feed) => {
            setSelectedSettings(feed);
            setShowSettingModal(true);
          }}
          onDelete={deleteSettings}
          onView={(id) => router.push(`/${id}`)}
        />

        <div className="d-flex justify-content-end mt-4">
          <div
            className="add-floating-btn"
            onClick={() => {
              setSelectedSettings({
                headerFontSize: 18,
                contentFontSize: 12,
                headerColor: '#000000',
                contentColor: '#000000',
                backgroundColor: '#ffffff',
              });
              setShowSettingModal(true);
            }}
          ><i className="fa fa-plus"/></div>
        </div>

        <SettingsModal
          selectedSettings={selectedSettings}
          onSettingsUpdate={setSelectedSettings}
          show={showSettingModal}
          onHide={() => setShowSettingModal(false)}
          onSave={getFeedList}
        />
        <ConfirmDialog
          body="Do you want to delete the feed?"
          onHide={setShowConfirmModal}
          show={showConfirmModal}
          onConfirm={confirmFn}
        />
      </>}
    </div>
  );
}
