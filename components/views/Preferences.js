import html from "html-literal";

export default () => html`
  <section id="pref">
    <a id="BTH" href="Home" data-navigo> Back to Home</a>
    <div id="dropDownMenus">
    <form>
<label for="zip">Enter your zip code.</label>
<input type="text" id="zip"><br>
</form>
    <form>
      <label for="price">Select your price range</label>
    <select name="priceRange" id="priceRangeDropDown">
      <option>any</option selected>
      <option>$</option>
      <option>$$</option>
      <option>$$$</option>
      <option>$$$$</option>
    </select>
</form>
    <form>
      <label for="Delivery">Delivery?</label>
      <select id="yesNoSelectDropDown">
        <option value="Y">Yes</option>
        <option value="N">No</option>
        <option value="Blank"></option>
      </select>
    </form>
</div>
    <a id="cont" href="Mainrestaurant" data-navigo>
      Continue
    </a>
  </section>
`;
//multiple drop down menus maybe checkboxes to narrow search, price range, distance, delivery
//Use same img from home screen with dark gray boxes and silver? text might be cool if not
//than just white boxes black text
