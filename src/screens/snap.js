  window.snapKitInit = function () {
        var loginButtonIconId = "my-login-button-target";
        // Mount Login Button
        snap.loginkit.mountButton(loginButtonIconId, {
          clientId: "1450f74d-3f7e-4fa4-a75f-03b201d23ff2",
          redirectURI: "https://socially-b729a.web.app/snapchat/auth",
          scopeList: ["user.display_name", "user.bitmoji.avatar", "user.external_id",],
          handleResponseCallback: function () {
            snap.loginkit.fetchUserInfo().then(
              function (result) {
                console.log("User info:", result.data.me);
                document.getElementById("display_name").innerHTML =
                  result.data.me.displayName;
                document.getElementById("bitmoji").src =
                  result.data.me.bitmoji.avatar;
                document.getElementById("external_id").src =
                  result.data.me.externalId;
              },
              function (err) {
                console.log(err); // Error
              }
            );
          },
        });
      };

      // Load the SDK asynchronously
      (function (d, s, id) {
        var js,
          sjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://sdk.snapkit.com/js/v1/login.js";
        sjs.parentNode.insertBefore(js, sjs);
      })(document, "script", "loginkit-sdk");
