const image = document.querySelector(".dog");
const btn = document.querySelector(".request");
const loading = document.querySelector(".loader");
const errorText = document.querySelector(".error");
  btn.disabled = false;
  loading.style.display = "none";
  image.style.display = "block";
  errorText.style.display = "none";
function fetchDogImage() {
  btn.disabled = true;
  loading.style.display = "block";
  image.style.display = "none";
  errorText.style.display = "none";
  fetch("https://dog.ceo/api/brees/image/random")
    .then((response) => {
      // check the status code for errors
      if (response.status < 200 || response.status > 300) {
        throw new Error("Network response was not ok!");
      }
      return response.json();
    })
    .then((data) => {
      // extract and set url into image src
      const picUrl = data.message;
    localStorage.setItem('api', picUrl);
    const imgUrl = localStorage.getItem("api");
      image.src = imgUrl;
      image.onload = () => {
        loading.style.display = "none";
        image.style.display = "block";
      };
    })
    .catch((error) => {
      // error handling
      console.error("Fetch error:", error);
      loading.style.display = "none";
      errorText.style.display = "block";
      errorText.textContent = error.message;
    })
    .finally(() => (btn.disabled = false));  
}
btn.addEventListener("click", fetchDogImage);
image.src=localStorage.getItem("api")
