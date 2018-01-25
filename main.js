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

  main() {
    let hoge = "Now Browssing to: " + this.title + "\n " + this.url; 
    this.printData();
    console.log(hoge);
    // this.SendTwitter(hoge);
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

