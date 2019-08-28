const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify:false,
  useUnifiedTopology: true
  
});
// const me = new User({
//   name: "shahzaib",
//   age: 20,
//   email: "SHAhzi113awan@gmail.com     ",
//   password:'passwor123'
// });
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log(error);
//   });
