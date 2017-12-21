const sha1 = require(`sha1`);
const got = require(`got`);
const getBasicAuthHeader = require(`../lib/getBasicAuth`);

module.exports = async (
  user = process.env.HOMEWIZARD_USER,
  pass = process.env.HOMEWIZARD_PASS
) => {
  const TOKEN_URL = `https://cloud.homewizard.com/account/login`;
  const auth = getBasicAuthHeader(user, sha1(pass));

  try {
    const res = await got(TOKEN_URL, {
      headers: {
        authorization: auth.value,
        accept: `application/json`,
      }
    });

    const data = JSON.parse(res.body);

    return data.session
      ? {token: data.session}
      : new Error({
        error: data.error,
        msg: data.errorMessage
      });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
