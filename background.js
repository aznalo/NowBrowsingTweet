chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  switch (request.method) {
    case 'getLength': // 保存されているデータ数を取得
      sendResponse({data: localStorage.length});
      break;
 case 'getKeyName': // 指定されたn番目のkey名を取得
   sendResponse({data: localStorage.key(request.number)});
   break;
 case 'getItem': // 指定されたkeyの値を取得
   console.log({data: localStorage.getItem(request.key)});
   sendResponse({data: localStorage.getItem(request.key)});
   break;
 case 'setItem': // 指定されたkeyと値を保存（更新）
   sendResponse({data: localStorage.setItem(request.key, request.value)});
   break;
 case 'removeItem': // 指定されたkeyの値を削除
   sendResponse({data: localStorage.removeItem[request.key]});
   break;
 case 'clearAll': //　すべてのデータを削除
   sendResponse({data: localStorage.clear()});
   break;
 case 'sendNotification':
   const options = {
     iconUrl: 'icons/icon128.png',
     type: 'basic',
     title: 'Now Browsing',
     message: request.tweet_body,
     priority: 1,
   };
   chrome.notifications.create('nbt', options, () => {
     new Promise( (resolve, reject) => {
       setTimeout(() => { resolve(); }, 2000);
     }).then( () => {
       chrome.notifications.clear('nbt');
     } );
   });
   break;
 default:
   console.log('no method');
   break;
  }
});
