---
title:  "HTML elements test page"
date:   2016-01-24
---

On July 2, an alien mothership entered Earth's orbit and deployed several dozen saucer-shaped "destroyer" spacecraft, each 15 miles (24 km) wide.

On July 3, the Black Knights, a squadron of Marine Corps F/A-18 Hornets, participated in an assault on a destroyer near the city of Los Angeles.

* Item
* Item
* Item

1. Item 1
    1. A corollary to the above item.
    2. Yet another point to consider.
2. Item 2
    * A corollary that does not need to be ordered.
        * This is indented four spaces, because it's two spaces further than the item above.
        * You might want to consider making a new list.

<table>
  <tr>
    <th>Tables</th>
    <th>Are</th>
    <th>Cool</th>
  </tr>
  <tr>
    <td>test</td>
    <td>test</td>
    <td>test</td>
  </tr>
  <tr>
    <td>test</td>
    <td>test</td>
    <td>test</td>
  </tr>
</table>

> This is a blockquote aww yeah and it is pretty decent.
>
> Now it has two paragraphs

------

`This is some text not written in HTML but in another language!`

This is <del>struckthrough text</del>.

<figure>
  <img src="/assets/images/2013-me-mirror-dslr.jpg">
  <figcaption>A picture of me</figcaption>
</figure>

<form>
  <fieldset id="forms__input">
    <legend>Input fields</legend>
      <p><label for="input__text">Text Input</label>
      <input id="input__text" type="text" placeholder="Text Input"></p>
      <p><label for="input__password">Password</label>
      <input id="input__password" type="password" placeholder="Type your Password"></p>
      <p><label for="input__webaddress">Web Address</label>
      <input id="input__webaddress" type="url" placeholder="http://yoursite.com"></p>
      <p><label for="input__emailaddress">Email Address</label>
      <input id="input__emailaddress" type="email" placeholder="name@email.com"></p>
      <p><label for="input__phone">Phone Number</label>
      <input id="input__phone" type="tel" placeholder="(999) 999-9999"></p>
      <p><label for="input__search">Search</label>
      <input id="input__search" type="search" placeholder="Enter Search Term"></p>
      <p><label for="input__text2">Number Input</label>
      <input id="input__text2" type="number" placeholder="Enter a Number"></p>
      <p><label for="input__text3" class="error">Error</label>
      <input id="input__text3" class="is-error" type="text" placeholder="Text Input"></p>
      <p><label for="input__text4" class="valid">Valid</label>
      <input id="input__text4" class="is-valid" type="text" placeholder="Text Input"></p>
  </fieldset>

  <fieldset id="forms__select">
    <legend>Select menus</legend>
      <label for="select">Select</label>
      <select id="select">
        <optgroup label="Option Group">
          <option>Option One</option>
          <option>Option Two</option>
          <option>Option Three</option>
        </optgroup>
      </select>
  </fieldset>

  <fieldset id="forms__checkbox">
    <legend>Checkboxes</legend>
      <label for="checkbox1"><input id="checkbox1" name="checkbox" type="checkbox" checked="checked"> Choice A</label>
      <label for="checkbox2"><input id="checkbox2" name="checkbox" type="checkbox"> Choice B</label>
      <label for="checkbox3"><input id="checkbox3" name="checkbox" type="checkbox"> Choice C</label>
      </ul>
  </fieldset>

  <fieldset id="forms__radio">
    <legend>Radio buttons</legend>
      <label for="radio1"><input id="radio1" name="radio" type="radio" class="radio" checked="checked"> Option 1</label>
      <label for="radio2"><input id="radio2" name="radio" type="radio" class="radio"> Option 2</label>
      <label for="radio3"><input id="radio3" name="radio" type="radio" class="radio"> Option 3</label>
      </ul>
  </fieldset>

  <fieldset id="forms__textareas">
    <legend>Textareas</legend>
      <label for="textarea">Textarea</label>
      <textarea id="textarea" rows="8" cols="48" placeholder="Enter your message here"></textarea>
  </fieldset>

  <fieldset id="forms__action">
    <legend>Action buttons</legend>
      <button type="submit">Button</button>
      <button type="submit" disabled>Disabled</button>
  </fieldset>

</form>
