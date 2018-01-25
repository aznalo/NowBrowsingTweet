class NowBrowssingTweet {
  constructor(title, url, token, token_secret) {
    this.title = title;
    this.url = url;
    this.token =  token;
    this.token_secret = token_secret;
  }

  printData(){
    console.log("-----PrintData-----");
    console.log(`title: ${this.title}`);
    console.log(`url: ${this.url}`);
    console.log(`token: ${this.token}`);
    console.log(`secret: ${this.token_secret}`);
  }

  sendTwitter(text){
    //以下POST先のURLの作成

    let options = {
      method: "POST",
      apiURL: "https://api.twitter.com/1.1/statuses/update.json",
      consumerKey: "t2GwfecJLdTBAfVwAUuA2CICQ",
      consumerSecret: "TrWy7SbGNHV1mB2C2zBrAWDnoU3NXyjiuwM0iZ3m12jkeLtStO",
      accessToken:  this.token,
      tokenSecret:  this.token_secret
    };

    let accessor = {
      consumerSecret: options.consumerSecret,
      tokenSecret: options.tokenSecret
    };

    //parameterの値はちゃんとリファレンス読んで理解しないと書けないぜ
    let message = {
      method: options.method,
      action: options.apiURL,
      parameters: {
        oauth_version: "1.0" ,
        oauth_signature_method:"HMAC-SHA1" ,
        oauth_consumer_key: options.consumerKey ,
        oauth_token: options.accessToken,
        status: text + "",
        callback: "callback1"
      }      
    };

    //以下OAuth1は本来OAuthであるが先に書いた理由から改変
    OAuth1.setTimestampAndNonce(message);
    OAuth1.SignatureMethod.sign(message, accessor);

    //ここでPOSTするURIを作成しています。
    let url = OAuth1.addToURL(message.action, message.parameters);

    //GET_requestの場合、ヘッダドメイン名の回避が必要だがPOSTでは必要ない
    //回避処理を書くとエラー吐かないのにPOSTできない泥沼

    console.log(options);

    $.ajax({
      type: message.method,
      url: url,
    });
  }

  callback1(data) {
    JSON.stringify(data);
  }

  main() {
    let hoge = "Now Browssing to: " + this.title + "\n " + this.url; 
    this.sendTwitter(hoge);
    }

}


let token_key;
let secret_key; 

const token = () => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({method: 'getItem', key: 'oauthToken'}, res => { 
      token_key = res.data;
      resolve();
    })
  });
};

const secret = () => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({method: 'getItem', key: 'oauthTokenSecret'}, res => {
      secret_key = res.data;
      resolve();
    })
  });
};

Promise.all([
  token(),
  secret()
]).then(() => {
  new NowBrowssingTweet( document.title, location.origin, token_key, secret_key).main();
}).catch((e) => {
  console.log(e);
});

