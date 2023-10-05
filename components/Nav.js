import html from "html-literal";

export default links => html`
  <nav>
    <i></i>
    <ul>
      ${links
        .map(
          link =>
            `<li><a href="/${link.title}" title="${link.title}" data-navigo>${link.text}</a></li>`
        )
        .join("")}
    </ul>
  </nav>
`;
