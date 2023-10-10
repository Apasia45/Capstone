import html from "html-literal";

export default state => html`
  <section id="home">
    <h1>Eatr</h1>
    <a class="cont" href="Preferences" data-navigo>
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
