



export const ApiCall = async (url: string, method: string) => {
  try {
    const response = await fetch(url, {
      method: method,

      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const cvsData = await response.json();
    console.log(cvsData);
    return cvsData
    //setAll(cvsData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

