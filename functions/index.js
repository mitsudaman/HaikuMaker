const functions = require('firebase-functions');

exports.m = functions.https.onRequest((req, res) => {

  const SITEURL = "https://haikumaker-5d430.firebaseapp.com/"
  const TITLE = `俳句メーカー`
  const DESCRIPTION = '俳句メーカー。あなたの日常を俳句にして周りとシェアしましょう。'

  // const [ , , ogp_id] = req.path.split('/')
  ogp_name = "109cd480-3240-11e9-a174-7706c524025b"
  const IMAGE = `https://firebasestorage.googleapis.com/v0/b/haikumaker-5d430.appspot.com/o/${ogp_name}.jpg?alt=media`

  res.status(200).send(`<!doctype html>
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
    ${'BONG '.repeat(5)}<br>
    ${IMAGE}<br>
    </body>
  </html>`);
});