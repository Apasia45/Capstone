import html from "html-literal";

//Fix "topButtons to top of screen in opposite corners"
export default () => html`
  <div id="topButtons">
    <button a href="Home.js">Back to Home</button>
    <button a href="Review.js">Leave a review</button>
  </div>
  <h3>RESTAURANT NAME</h3>
  <button id="yes">
    <h2>Yes</h2>
  </button>
  <button id="no">
    <h2>No</h2>
  </button>
`;
//Put in big letters fixed up and maybe left if possible to pull the first image of the restaurant
//as the back ground with the letters over and then bottom 1/3 or so have yes no buttons and
//top of screen have a go back to home and from home user can access the contact button, top right
//of screen have button to leave a review adding a swipe left or right for phones is kinda the whole
//idea but doubt ill be able to do that anytime soon
