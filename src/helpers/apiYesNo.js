const url = "https://yesno.wtf/api";

const responseFunction = async () => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export default responseFunction;
