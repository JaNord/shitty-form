const API_BASEURL = import.meta.env.VITE_BASE_URL || "https://ninth-rhino-343313.lm.r.appspot.com";
// const API_BASEURL = "http://localhost:8080";
export const getText = async (image: File | Blob) => {
  const body = new FormData();
  body.append("image", image);

  try {
    const res = await fetch(`${API_BASEURL}/predict`, {
      method: "POST",
      body,
      headers: {
        Accept: "multipart/form-data",
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
