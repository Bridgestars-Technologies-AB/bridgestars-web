<script setup>
if (process.client) {
  window.onload = function () {
    var urlParams = {};
    (function () {
      var pair, // Really a match. Index 0 is the full match; 1 & 2 are the key & val.
        tokenize = /([^&=]+)=?([^&]*)/g,
        // decodeURIComponents escapes everything but will leave +s that should be ' '
        re_space = function (s) {
          return decodeURIComponent(s.replace(/\+/g, " "));
        },
        // Substring to cut off the leading '?'
        querystring = window.location.search.substring(1);

      while ((pair = tokenize.exec(querystring)))
        urlParams[re_space(pair[1])] = re_space(pair[2]);
    })();
  };

  var id = urlParams["id"];
  var base = PARSE_SERVER_URL;
  document
    .getElementById("form")
    .setAttribute("action", base + "/apps/" + id + "/request_password_reset");
  document.getElementById("username").value = urlParams["username"];
  document
    .getElementById("username_label")
    .appendChild(document.createTextNode(urlParams["username"]));

  document.getElementById("token").value = urlParams["token"];
  if (urlParams["error"]) {
    document
      .getElementById("error")
      .appendChild(document.createTextNode(urlParams["error"]));
  }
  if (urlParams["app"]) {
    document
      .getElementById("app")
      .appendChild(document.createTextNode(" for " + urlParams["app"]));
  }
}
</script>

<template>
  <h1>Reset Your Password<span id="app"></span></h1>
  <noscript
    >We apologize, but resetting your password requires javascript</noscript
  >
  <div class="error" id="error"></div>
  <form id="form" action="#" method="POST">
    <label>New Password for <span id="username_label"></span></label>
    <input name="new_password" type="password" />
    <input name="utf-8" type="hidden" value="✓" />
    <input name="username" id="username" type="hidden" />
    <input name="token" id="token" type="hidden" />
    <button>Change Password</button>
  </form>
</template>

<style>
h1 {
  display: block;
  font: inherit;
  font-size: 30px;
  font-weight: 600;
  height: 30px;
  line-height: 30px;
  margin: 45px 0px 45px 0px;
  padding: 0px 8px 0px 8px;
}

.error {
  color: red;
  padding: 0px 8px 0px 8px;
  margin: -25px 0px -20px 0px;
}

body {
  font-family: "Open Sans", "Helvetica Neue", Helvetica;
  color: #0067ab;
  margin: 15px 99px 0px 98px;
}

label {
  color: #666666;
}
form {
  margin: 0px 0px 45px 0px;
  padding: 0px 8px 0px 8px;
}
form > * {
  display: block;
  margin-top: 25px;
  margin-bottom: 7px;
}

button {
  font-size: 22px;
  color: white;
  background: #0067ab;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;
  -khtml-border-radius: 5px;
  border-radius: 5px;
  background-image: -webkit-gradient(
    linear,
    50% 0,
    50% 100%,
    color-stop(0%, #0070ba),
    color-stop(100%, #00558c)
  );
  background-image: -webkit-linear-gradient(#0070ba, #00558c);
  background-image: -moz-linear-gradient(#0070ba, #00558c);
  background-image: -o-linear-gradient(#0070ba, #00558c);
  background-image: -ms-linear-gradient(#0070ba, #00558c);
  background-image: linear-gradient(#0070ba, #00558c);
  -moz-box-shadow: inset 0 1px 0 0 #0076c4;
  -webkit-box-shadow: inset 0 1px 0 0 #0076c4;
  -o-box-shadow: inset 0 1px 0 0 #0076c4;
  box-shadow: inset 0 1px 0 0 #0076c4;
  border: 1px solid #005e9c;
  padding: 10px 14px;
  cursor: pointer;
  outline: none;
  display: block;
  font-family: "Helvetica Neue", Helvetica;

  -webkit-box-align: center;
  text-align: center;
  box-sizing: border-box;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
}

button:hover {
  background-image: -webkit-gradient(
    linear,
    50% 0,
    50% 100%,
    color-stop(0%, #0079ca),
    color-stop(100%, #005e9c)
  );
  background-image: -webkit-linear-gradient(#0079ca, #005e9c);
  background-image: -moz-linear-gradient(#0079ca, #005e9c);
  background-image: -o-linear-gradient(#0079ca, #005e9c);
  background-image: -ms-linear-gradient(#0079ca, #005e9c);
  background-image: linear-gradient(#0079ca, #005e9c);
  -moz-box-shadow: inset 0 0 0 0 #0076c4;
  -webkit-box-shadow: inset 0 0 0 0 #0076c4;
  -o-box-shadow: inset 0 0 0 0 #0076c4;
  box-shadow: inset 0 0 0 0 #0076c4;
}

button:active {
  background-image: -webkit-gradient(
    linear,
    50% 0,
    50% 100%,
    color-stop(0%, #00395e),
    color-stop(100%, #005891)
  );
  background-image: -webkit-linear-gradient(#00395e, #005891);
  background-image: -moz-linear-gradient(#00395e, #005891);
  background-image: -o-linear-gradient(#00395e, #005891);
  background-image: -ms-linear-gradient(#00395e, #005891);
  background-image: linear-gradient(#00395e, #005891);
}

input {
  color: black;
  cursor: auto;
  display: inline-block;
  font-family: "Helvetica Neue", Helvetica;
  font-size: 25px;
  height: 30px;
  letter-spacing: normal;
  line-height: normal;
  margin: 2px 0px 2px 0px;
  padding: 5px;
  text-transform: none;
  vertical-align: baseline;
  width: 500px;
  word-spacing: 0px;
}
</style>
