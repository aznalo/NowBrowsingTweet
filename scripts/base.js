var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Now Browsing Tweet!!'
  },
  methods: {
    login: function () {
      OAuth.initialize('R04YFaHjJzCmUiRRHM_f8Y7Iq-A')
      let promise = new Promise( (resolve, reject) => {
        OAuth.popup('twitter',(err, res) => { //コールバック関数
          if (res) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      });
      promise.then( res => {
        console.log(res);
        chrome.runtime.sendMessage({method: 'setItem', key: 'oauthToken', value: res.oauth_token});
        chrome.runtime.sendMessage({method: 'setItem', key: 'oauthTokenSecret', value: res.oauth_token_secret});
        OAuth.callback('twitter',  "callback/url");
      }).catch( err => {
        console.error(err);
      });
    }
  }
})
