# Web Technologies Lab Mid Term - E-commerce Clone

## Student Information & Derived Parameters
* **Name:** FA24-BCS-103
* **Roll Number:** FA24-BCS-103
* **N (Last two digits of Roll Number):** 3
* **Breakpoint (BP):** 600 + 3 = 603px
* **Accent Hue (H):** (3 * 7) mod 360 = 21° -> hsl(21, 70%, 45%)
* **K (Number of Categories):** (3 mod 3) + 3 = 3 categories

---

## Changed Files Summary

1. `midterm/index.html`
   * Added category radio filter buttons (`#cat-all`, `#cat-trimmers`, `#cat-audio`, `#cat-mobiles`) and labels above the product grid.
   * Added live search input ID (`#live-search-input`), price sort button (`#sort-price-btn`), and `#no-products-msg` alert box.
   * Linked `script.js` before the closing `</body>` tag.

2. `midterm/product.html`
   * Refactored main product layout into named CSS Grid areas (`pdp-grid-container`, `pdp-area-image`, `pdp-area-details`, `pdp-area-description`).

3. `midterm/styles.css`
   * Implemented pure CSS filtering logic using `:has()` parent selectors without JavaScript.
   * Defined grid template areas for responsive layout shifting at `min-width: 603px`.
   * Applied `position: sticky; top: 73px;` for the product detail box.
   * Added `.search-hidden` and `.badge-premium` helper classes.

4. `midterm/script.js`
   * Appended a "Premium" badge to products priced above Rs 300 on load.
   * Handled real-time live search that evaluates concurrently with CSS radio filters.
   * Implemented price sorting via DOM element re-ordering using `appendChild()`.

---

## Task Explanations

### Task 1 - Pure CSS Category Filter
* **What was changed:** Added 4 radio buttons above `#product-section` and CSS `:has()` relational selectors in `styles.css`.
* **Why:** Selecting a category radio button causes `:has(#cat-id:checked)` on `#product-section` to hide non-matching `.product-card` elements (`display: none !important`) with zero JavaScript required.

### Task 2 - Product Page Grid & Sticky Box
* **What was changed:** Wrapped the product image, details, and description into named CSS grid areas with a media query for `min-width: 603px`.
* **Why:** Below 603px, elements stack in 1 column. At 603px+, image and details sit side-by-side while description spans full width underneath. The details card uses `position: sticky; top: 73px;` to stay pinned during scrolling.

### Task 3 - JavaScript Search, Sort & Premium Badges
* **What was changed:** Created `script.js` to parse product prices, inject "Premium" badges on load ($> 300$), perform non-case-sensitive live text filtering, and reorder card DOM nodes on price sort clicks.
* **Why:** Satisfies real-time dynamic interactivity while working directly with existing DOM nodes using `appendChild()` and `insertAdjacentElement()`.

---

## AI Tools Used
* **Gemini (Google AI)** - Used for calculating parameters, debugging CSS Grid sticky offsets, and resolving DOM insertion exceptions during Task 3 implementation.