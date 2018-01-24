class NowBrowssingTweet {
  constructor(title, url, data) {
    this.title = document.title;
    this.url = location.origin;
    this.data = data;
  }

  printData(){
    console.log("-----PrintData-----");
    console.log("Token: " + localStorage.getItem("oauth_token"));
    console.log("SecretToken: " + localStorage.getItem("oauth_token_secret"));
  }

  twitterOauth() {
    console.log("oauth!");
    OAuth.initialize('R04YFaHjJzCmUiRRHM_f8Y7Iq-A')
    let promise = new Promise( (resolve, reject) => {
      OAuth.popup('twitter',(err, res) => { //コールバック関数
        console.log(res || err);
        resolve(res)
      });
    });
    promise.then( res => {
      localStorage.setItem("oauth_token", res.oauth_token);
      localStorage.setItem("oauth_token_secret", res.oauth_token_secret);
      OAuth.callback('twitter',  "callback/url");
    }).catch( err => {
      console.error(err);
    });

  }

  main() {
    let hoge = "Now Browssing to: " + this.title + "\n " + this.url; 
    alert(hoge);
    // this.SendTwitter(hoge);
  }

}

let app = new NowBrowssingTweet();
//
// app.printData();
app.main()
