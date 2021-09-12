var request = require('request');
var cheerio = require('cheerio');
const fs = require('fs');
const { del } = require('request');
const express = require('express');
const app = express();
//const PORT = 3000;
 const PORT = process.env.PORT || 5000
let config =
{
    delay: 3000,
    urlMinChars: 4,
    urlMaxChars: 12,
}


app.use(express.static('static'));
app.use(express.static('data'))

app.get('/', (req, res) => {

});
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));




var options = {
    headers:
    {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
    },
    "host":"154.16.63.16",
    "port":"8000",
    "proxy":"http://154.16.63.16:8000",
}

let saveToFile = (newUrl) => {
    let data = fs.readFileSync('./data/data.json');
    let dataObject = JSON.parse(data);

    if (!dataObject.includes("newUrl")) {
        dataObject.push(newUrl);
        

        let newUrlObject = JSON.stringify(dataObject);

        fs.writeFile('./data/data.json', newUrlObject, err => {

            if (err) throw err;

            console.log("✨ New data added ✨");
        });
    } else {
        console.log("😑 Duplicate 🤐");
    }



}


let makeid = () => {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    length = randomLength();

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let randomLength = (min = config.urlMinChars, max = config.urlMaxChars) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



let getImgUrl = (callback) => {

    let randomID = makeid();

    let url = 'https://prnt.sc/' + randomID;

    request(url, options, function (error, response, html) {

        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);

            var imgUrl = $('.image-constrain .image-container img').attr("src");
            var invalid = '//st.prntscr.com/2021/04/08/1538/img/0_173a7b_211be8ff.png';

            if (imgUrl != invalid && imgUrl != undefined && imgUrl != null) {


                callback(imgUrl);
            }
            else {

                callback(false);
            }

        }
        else {
            console.log("🚔 Might be IP Blocked! 🚔");
            callback(false);
        }

    });

    request('https://api.ipify.org?format=json', options, function (error, response, html) {

        console.log(response.body);
        console.log(html);


    });


}


let scrape = () => {

    let tryAgain = () => {
        try {
            //console.log("❌ Trying again ❌");
            setTimeout(getImgUrl(response), config.delay);
        }
        catch { }

    }


    let response = (url) => {

        if (url != false) {
            saveToFile(url);
            setTimeout(() => {
                getImgUrl(response);
            }, config.delay);
        }
        else {
            tryAgain();
        }

    }

    getImgUrl(response);


}

// 🎈
scrape();