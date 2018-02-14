const url = 'wss://ws.zaif.jp/stream?currency_pair=mona_jpy';
const connection = new WebSocket(url);

let result;
let lastRate;
connection.onopen = function () {
  console.log('connection server');
};

connection.onerror = function (error) {
  console.log(error);
};

connection.onmessage = function (res) {
  console.log(res.data);

  result = JSON.parse(res.data).trades[0].price;

  console.log(result);

  if (result === lastRate)
    document.getElementById("dispChart").className = "";
  else
    document.getElementById("dispChart").className = result > lastRate ? "rate-up" : "rate-down";

  lastRate = result;

  document.getElementById('dispChart').innerHTML = result;
}
