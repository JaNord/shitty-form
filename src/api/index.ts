const API_BASEURL = "https://ninth-rhino-343313.lm.r.appspot.com";

export const getText = async (image: any) => {
  const body = new FormData();
  body.append("image", image);

  try {
    const res = await fetch(`${API_BASEURL}/predict`, {
      method: "POST",
      mode: "no-cors",
      body,
      headers: {
        "X-API-KEY": "yesDaddyIamSecure-1337",
      },
    });

    const json = await res.json();
    return json;
  } catch (err) {
    //ignore
  }
};

export default {
  getText,
};
