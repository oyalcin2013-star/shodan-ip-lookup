const API_KEY = "SHfu88agJkbKbXcR7sCpkD32n2dvlDvh";

exports.handler = async (event) => {
  const ip = event.queryStringParameters?.ip;

  if (!ip) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "IP adresi gerekli" }),
    };
  }

  try {
    const response = await fetch(`https://api.shodan.io/shodan/host/${ip}?key=${API_KEY}`);

    if (!response.ok) {
      if (response.status === 401) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: "API key geçersiz" }),
        };
      }
      if (response.status === 404) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Bu IP bulunamadı" }),
        };
      }
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Shodan API hatası" }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
