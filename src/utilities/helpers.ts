function getDate() {
  const date = new Date();
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  return yy + "-" + mm + "-" + dd;
}

const helpers = {
  getDate,
};

export default helpers;
