const { cognito } = require('../config/aws');

const signUp = async (playerId, email, password) => {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: playerId,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email }
    ]
  };
  return cognito.signUp(params).promise();
};

const login = async (playerId, password) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: playerId,
      PASSWORD: password
    }
  };
  return cognito.initiateAuth(params).promise();
};

const confirmSignUp = async (playerId, code) => {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: playerId,
    ConfirmationCode: code,
  };
  return cognito.confirmSignUp(params).promise();
};

module.exports = { signUp, login, confirmSignUp };