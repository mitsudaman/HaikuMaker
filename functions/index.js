const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();


exports.m = functions.https.onRequest((req, res) => {

  const [ , , doc_id] = req.path.split('/')
  var postRef = db.collection('posts').doc(doc_id);
  var getDoc = postRef.get()
      .then(doc => {
        if (!doc.exists) {
          return;
        } else {
          const docData = doc.data();
          const html = createHtml(docData.ogp_full_path,doc_id)
          res.set('Cache-Control', 'public, max-age=600, s-maxage=600')
          res.status(200).end(html)
          return;
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
});
const createHtml = (ogp_full_path) => {
  const SITEURL = "https://haikumaker-5d430.firebaseapp.com/"
  const TITLE = `俳句メーカー`
  const DESCRIPTION = '俳句メーカー。あなたの日常を俳句にして周りとシェアしましょう。'
  const IMAGE = `https://firebasestorage.googleapis.com/v0/b/haikumaker-5d430.appspot.com/o/${ogp_full_path}.jpg?alt=media`

  return `<!doctype html>
    <head>
      <title>${TITLE}</title>
      <meta property="og:title" content="${TITLE}">
      <meta property="og:image" content="${IMAGE}">
      <meta property="og:description" content="${DESCRIPTION}">
      <meta property="og:url" content="${SITEURL}">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="${TITLE}">
      <meta name="twitter:site" content="@mitudama">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${TITLE}">
      <meta name="twitter:image" content="${IMAGE}">
      <meta name="twitter:description" content="${DESCRIPTION}">
    </head>
    <body>
      <script type="text/javascript">window.location="/";</script>
    </body>
  </html>`
}