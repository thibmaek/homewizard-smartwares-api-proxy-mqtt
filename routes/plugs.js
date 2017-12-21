const got = require(`got`);

const API_URL = `https://plug.homewizard.com/plugs`;

module.exports = async req => {
  try {
    const res = await got(API_URL, {
      headers: {
        'x-session-token': req.headers[`x-session-token`],
      },
    });

    const plugs = JSON.parse(res.body);

    if (req.query.verbose) {
      return plugs;
    }

    return plugs.map(({id, name, latitude, longitude, devices, online}) => ({
      id, name, latitude, longitude, devices, online,
    }));

  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
