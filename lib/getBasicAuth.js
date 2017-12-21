module.exports = (username, password) => {

  const header = `${username || ``}:${password || ``}`;
  const authString = Buffer.from(header, `utf8`).toString(`base64`);

  return {
    name: `Authorization`,
    value: `Basic ${authString}`,
  };

};
