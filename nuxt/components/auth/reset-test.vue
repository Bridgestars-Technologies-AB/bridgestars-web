<script setup language="javascript" type="text/javascript">
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
  <auth-form
    :header="$t('auth:reset.resetPassword')"
    :title="$t('auth:reset.title')"
    :subtitle="$t('auth:reset.subtitle2')"
    @submit="submit"
  >
    <div class="error" id="error"></div>
    <form id="form" action="#" method="POST">
      <label>New Password for <span id="username_label"></span></label>
      <base-input-field
        wrapperClass="w-[100%]"
        :placeholder="$t('auth:placeholder.password')"
        type="password"
        id="password"
        name="new_password"
      />
      <base-input-field
        wrapperClass="w-[100%]"
        :placeholder="$t('auth:placeholder.confirmPassword')"
        type="password"
        id="password-confirm"
      />
      <input name="new_password" type="password" />
      <input name="utf-8" type="hidden" value="✓" />
      <input name="username" id="username" type="hidden" />
      <input name="token" id="token" type="hidden" />
      <base-submit-button
        wrapperClass="w-[100%] xs:!mt-3 sm:!mt-6"
        id="submit"
        type="submit"
        :text="$t('auth:reset.reset')"
        @submit="submit"
      ></base-submit-button>
    </form>
  </auth-form>
</template>

<style></style>
