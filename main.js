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

    OAuth1.setTimestampAndNonce(message);
    OAuth1.SignatureMethod.sign(message, accessor);

    let url = OAuth1.addToURL(message.action, message.parameters);

    console.log(options);

    $.ajax({
      url: url,
      type: message.method,
    });
  }

  callback1(data) {
    JSON.stringify(data);
  }

  b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
  }

  main() {
    if ( this.token && this.token_secret){
      let tweet_body = "Now Browssing to: " + this.title + "\n " + this.url; 
      this.sendTwitter(tweet_body);
    } else {
      console.error("NowBrowssingTweet: Not Login");
    }
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
  new NowBrowssingTweet( document.title, `${location.href}` , token_key, secret_key).main();
}).catch((e) => {
  console.log(e);
});

