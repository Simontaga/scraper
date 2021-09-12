
let previous_button = document.getElementById("prev").addEventListener("click",()=>{prev()});

let next_button = document.getElementById("next").addEventListener("click",()=>{next()});
let input = document.getElementById("index");
let submit = document.getElementById("index-button").addEventListener("click", ()=>{setImageIndex(input.value)});
let image = document.getElementById("image");

let path = "data.json";

let index = 0;

let imageUrls = [];

fetch(path)
  .then(response => response.json())
  .then(data => imageUrls = data);

let setImage = () => 
{
    //image.src = imageUrls[index];
    image.src = imageUrls[index];
}
let setImageIndex = (val) => 
{
    index = parseInt(val);
    setImage();
}

let next = () => 
{   
    index = index + 1;
    setImage();
}

let prev = () => 
{
    index = index + -1;
    setImage();
}

