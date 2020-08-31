import express from "express";
import "./db.js";
import bodyParser from "body-parser";
import User from "./models/User.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 8000;

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.get("/", (req, res) => res.send("Hello World"));

app.post("/register", (req, res) => {
  //회원가입 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
    });
  });
});
app.post("/login", (req, res) => {
  //요청된 이메일을 DB에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) {
          res.status(400).send(err);
        }
        //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});
app.listen(PORT, () => console.log(`✅ Server on http://localhost:${PORT} `));
