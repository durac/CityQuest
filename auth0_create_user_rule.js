function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.stored === 'true') {
    console.warn('stored');
    return callback(null, user, context);
  }

  var data = {
      userId: user.user_id,
      secretToken: "secret"
  };
  // You should make your requests over SSL to protect your app secrets.
  request.post({
    url: 'http://46.101.231.222/api/createUser',
    form: data,
    timeout: 15000
  }, function(err, response, body){
    if (err) return callback(new Error(err));

    console.warn(body);
    user.app_metadata.stored = body;

    auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
      .then(function(){
        callback(null, user, context);
      })
      .catch(function(err){
        callback(err);
      });
  });
}