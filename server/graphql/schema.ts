export default `
input FeedInput{
  _id:String
  feedUrl: String!
  headerFontSize: String
  contentFontSize: String
  headerColor: String
  contentColor: String
  backgroundColor: String
  width: Int
  height:Int
}


type Mutation{
  FeedInsert(feed:FeedInput): Feed
  FeedUpdate(id:String!, feed:FeedInput): Feed
  FeedDelete(id:String!): Boolean
}


type Query{
  Feed(id: String!): Feed
  FeedList: [Feed]
  FeedDataRead(id: String): FeedDataResponse
}

type Feed{
  _id:String
  feedUrl: String!
  headerFontSize: String
  contentFontSize: String
  headerColor: String
  contentColor: String
  backgroundColor: String
  width: Int
  height:Int
}

type FeedDataResponse{
  settings: Feed
  feed: FeedData
}


type FeedData{
  title:String
  items: [FeedDataItem]
}
type FeedDataItem{
  title:String
  content: String
}
`;