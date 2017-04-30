import { loginWithPassword, createUser, logout, onTokenChange } from 'meteor-apollo-accounts'


const afterLogin = (userId, apollo, _this) => {
  apollo.resetStore();
  _this.setState({ loading: false });
}

const alertErrors = (res, _this) => {
  const errors = res.graphQLErrors.map( err => console.log(err.message)  );
  errors.forEach(messageText => {
    let errors = _this.state.errors;
    errors.push(messageText);
    _this.setState({ errors });
  });
  _this.setState({ loading: false });
}


export const handleSignup = (email, password, profile, apollo, _this) => {
  createUser({email, password, profile}, apollo)
    .then(userId => afterLogin(userId, apollo, _this) )
    .catch( res => alertErrors(res, _this) );
};


export const handleLogin = (email, password, apollo, _this) => {
  loginWithPassword({email, password }, apollo)
    .then( (userId) => afterLogin(userId, apollo, _this) )
    .catch( res => alertErrors(res, _this) );
  //onTokenChange(({ userId, token }) => Meteor.loginWithToken(token, () => afterLogin(userId, props)));
};


export const handleLogout = (apollo, _this) => {
      logout(apollo)
        .then(()=> apollo.resetStore())
        .catch( res => alertErrors(res, _this) );
};