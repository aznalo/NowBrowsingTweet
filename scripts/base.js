var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Now Browsing Tweet!!'
  },
  methods: {
    login: function () {
      console.log("Click!");
      let app = new NowBrowssingTweet();
      app.main();
    }
  }
})
