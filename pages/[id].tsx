import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Card, Image } from 'react-bootstrap';

export default function Feed() {
  const router = useRouter();
  const [settings, setSettings] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load rss feed data
  const loadItemsAndSettings = async () => {
    // const data = await fetch(`/api/feeds/${router.query.id}`);
    const data = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
           FeedDataRead(id: ${JSON.stringify(router.query.id)}){
              settings{
                headerFontSize
                contentFontSize
                headerColor
                contentColor
                backgroundColor
                width
                height
              }
              feed{
                 title
                 items{
                   title
                   content
                 }
                 image{
                  url
                 }
              }
           }
        }`,
      }),
    });
    const { feed, settings } = (await data.json())?.data?.FeedDataRead || {};

    setSettings(settings);
    setData(feed);
    setLoading(false);
  };

  useEffect(() => {
    router?.query?.id && loadItemsAndSettings();
  }, [router?.query?.id]);

  return (
    <div className="container container-fluid mt-1 mb-1">
      {loading && (
        <div className="justify-content-center  d-flex align-content-center mt-4">
          <span>Loading please wait &nbsp;&nbsp;&nbsp;</span>
          <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '30px' }}></i>
        </div>
      )}

      {!loading && data && (
        <div>
          <div className="d-flex mt-4 mb-2 align-items-center justify-content-center">
            <Image width={50} height={50} src={data?.image?.url} roundedCircle />
            <h3 className="text-capitalize mt-3 mb-3 ml-2 text-center">{data.title}</h3>
          </div>
          {data.items?.length ? (

            <div className="d-flex flex-wrap justify-content-center">
              {data.items.map((item, i) => (
                <Card
                  className="m-1 feed-item-card"
                  key={i}
                  style={{
                    width: settings?.width ? `${settings.width}px` : 'auto',
                    height: settings?.height ? `${settings.height}px` : 'auto',
                    overflow: 'auto',
                  }}
                >
                  <Card.Header>
                  <span
                    style={{
                      fontSize: settings?.headerFontSize ? `${settings?.headerFontSize}px` : '18px',
                      color: settings?.headerColor || '#000',
                    }}
                  >
                    {item.title}
                  </span>
                  </Card.Header>
                  <Card.Body
                    style={{
                      fontSize: settings?.contentFontSize ? `${settings?.contentFontSize}px` : '12px',
                      color: settings?.contentColor || '#000',
                      backgroundColor: settings?.backgroundColor || '#fff',
                    }}
                  >
                    <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                  </Card.Body>
                </Card>
              ))
              }
            </div>
          ) : (
            <Alert variant="info">No feed items found</Alert>
          )}
        </div>
      )}
      {!loading && !data && <Alert variant="info">Not found</Alert>}
    </div>
  );
}
