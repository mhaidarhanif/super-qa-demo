import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'

function localAuthenticate (User, email, password, done) {
  User.findOneAsync({ email: email.toLowerCase() })
    .then(user => {
      if (!user) done(null, false, { message: 'This email is not registered.' })
      user.authenticate(password, (authError, authenticated) => {
        if (authError) done(authError)
        if (!authenticated) done(null, false, { message: 'This password is not correct.' })
        else done(null, user)
      })
    })
    .catch(err => done(err))
}

export function setup (User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function (email, password, done) {
    return localAuthenticate(User, email, password, done)
  }))
}
