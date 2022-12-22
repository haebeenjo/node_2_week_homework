const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api", require("./routes/user.js"));
app.use("/api", require("./routes/post.js"));
app.use("/api", require("./routes/comment.js"));


app.listen(5000, () => {
    console.log("서버 실행");
});
