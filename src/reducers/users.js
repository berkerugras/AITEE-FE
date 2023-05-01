export default (users = [], action) => {
  // büyük harf küçük harf kontrol et
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;

    case "CREATE":
      return users;

    default:
      return users;
  }
};
