function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  // You can add a Role based on what you want
  // In this case I check domain
  var addRolesToUser = function(user, context, cb) {
    if (user.email && user.email.indexOf('dominik.schwarz1994@gmail.com') > -1) {
      cb(null, ['admin']);
    } else if (context.request.query.scope.match('unauthorized_scopes')) {
      cb(new UnauthorizedError('scope_not_allowed'), ['user']);
    } else {
      cb(null, ['user']);
    }
  };

  addRolesToUser(user, context, function(err, roles) {
    if (err) {
      callback(err);
    } else {
      user.app_metadata.roles = roles;
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          callback(null, user, context);
        })
        .catch(function(err){
          callback(err);
        });
    }
  });
}