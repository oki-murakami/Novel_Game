
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let bgImage = new function () {
  this.x = 0
  this.y = 0;

  this.width = canvas.width;
  this.height = canvas.height;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "chap8-back1.png";
    this.image.onload = loader;

  }

  this.render = function () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

let personImage = new function () {
  this.y = 0;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "chap8-chara2.png";
    this.image.onload = loader;
  }

  this.render = function () {

    this.aspect = this.image.width / this.image.height;

    this.width = canvas.height * this.aspect;
    this.height = canvas.height;

    this.x = canvas.width / 2 - this.width / 2;

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}


let messageBox = new function () {
  this.x = 0;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "message.png";
    this.image.onload = loader;
  }

  this.render = function () {

    this.aspect = this.image.width / this.image.height;

    this.width = canvas.width;
    this.height = canvas.height / this.aspect;

    this.marginBottom = 20;
    this.y = canvas.height - this.height - this.marginBottom;

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const myText = new function () {

  this.render = function () {
    let messageBoxInnerWidth = messageBox.width - 40;
    let messageBoxPaddingTop = 33;
    let messageBoxPaddingLeft = 10;

    let s = "";
    let sentenceArray = text.split("");

    let kaigyouHeight = 0;

    for (let i = 0; i < sentenceArray.length; i++) {
      s += sentenceArray[i];
      let textWidth = ctx.measureText(s).width;

      if(textWidth > messageBoxInnerWidth) {
        ctx.fillText(s, messageBoxPaddingLeft, messageBox.y + kaigyouHeight + messageBoxPaddingTop);

        kaigyouHeight += 20;
        s = "";
      }
    }

    ctx.fillStyle = "#fff";
    ctx.font = "15px serif";
    ctx.textAlign = "left";

    ctx.fillText(s, messageBoxPaddingLeft, messageBox.y + kaigyouHeight + messageBoxPaddingTop);
  }
}

let sentences = [
"あら、〇〇君ご機嫌よう",
"貴方のような底辺の人間が、私に話掛けてもらえるだけでも幸運だと思いなさい",
"え、「誰もお前なんかに話掛けられたいなんて思ってない」って！？",
"ゴミの分際で良い度胸ですわ",
"え、「この前クラスみんなが私の悪口を言っていた」ですって！？",
"そ、、そそ、、そんなはずないわ！適当なこと言わないで！",
"え、「頭は悪いし、対してお嬢様でもないくせにお嬢様ぶった言葉使うし、なんかムカつく」ですって！？",
"う、、、うう、、、うぇ〜〜〜ん！！（泣）"
];

let Loader = function (expectedCnt, callback) {
  let cnt = 0;
  return function() {
    cnt++;
    if(cnt == expectedCnt) {
      callback();
    }
  }
}

let loader = Loader(3, function () {
  update();
});

bgImage.loadImage();
personImage.loadImage();
messageBox.loadImage();

let sentenceIndex = 0;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(sentenceIndex > sentences.length - 1) {
    bgImage.render();
    alert("終了です");
    location.reload();
  } else {
    bgImage.render();
    personImage.render();
    messageBox.render();

    myText.render(text=sentences[sentenceIndex]);
    sentenceIndex++;
  }
}

canvas.addEventListener("click", function(){
  update();
});