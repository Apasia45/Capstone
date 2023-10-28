import html from "html-literal";
const successCallback = position => {
  console.log(position);
};

const errorCallback = error => {
  console.error(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
export default state => html`
  <section id="home">
    <h1>Eatr</h1>
    <a id="cont" href="Preferences" data-navigo>
      Continue to preferences
    </a>
    <a id="contactme" href="Contact" data-navigo>Contact me here</a>
    <h3>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </h3>
  </section>
`;
