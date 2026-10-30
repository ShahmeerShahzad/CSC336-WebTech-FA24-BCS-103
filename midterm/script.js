/* ==========================================================================
   TASK 3: JAVASCRIPT LIVE SEARCH, PRICE SORT & PREMIUM LABEL
   Roll Number: FA24-BCS-103 | N = 3
   ========================================================================== */

function runTask3() {
  console.log("--> Task 3 Script Running Successfully!");

  const N = 3;
  const premiumThreshold = N * 100; // 3 * 100 = Rs 300

  const productGridRow = document.getElementById('product-grid-row');
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  const searchInput = document.getElementById('live-search-input');
  const sortBtn = document.getElementById('sort-price-btn');
  const noProductsMsg = document.getElementById('no-products-msg');
  const categoryRadios = document.querySelectorAll('input[name="category"]');
  const searchBtn = searchInput ? searchInput.nextElementSibling : null;

  // 1. Extract numeric price from product card
  function extractPrice(card) {
    const priceElement = card.querySelector('.product-price');
    if (!priceElement) return 0;
    const cleanDigits = priceElement.textContent.replace(/[^0-9]/g, '');
    return parseInt(cleanDigits, 10) || 0;
  }

  // 2. Attach "Premium" badge to products priced > Rs 300
  productCards.forEach(card => {
    const price = extractPrice(card);
    if (price > premiumThreshold) {
      const cardBody = card.querySelector('.card-body');
      if (cardBody && !cardBody.querySelector('.badge-premium')) {
        const premiumBadge = document.createElement('span');
        premiumBadge.className = 'badge badge-premium mt-1 ms-1 d-inline-block';
        premiumBadge.innerHTML = '<i class="bi bi-star-fill me-1"></i>Premium';

        const deliveryBadge = cardBody.querySelector('.badge.bg-success-subtle');
        if (deliveryBadge) {
          deliveryBadge.insertAdjacentElement('afterend', premiumBadge);
        } else {
          cardBody.appendChild(premiumBadge);
        }
      }
    }
  });

  // 3. Live Search & Category Filter Visibility Check
  function evaluateVisibility() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeRadio = document.querySelector('input[name="category"]:checked');
    const activeCategory = activeRadio ? activeRadio.value : 'all';

    let visibleCount = 0;

    productCards.forEach(card => {
      const imgElement = card.querySelector('img');
      const cardText = card.textContent.toLowerCase() + ' ' + (imgElement ? imgElement.alt.toLowerCase() : '');

      const matchesSearch = query === '' || cardText.includes(query);
      const matchesCategory = (activeCategory === 'all' || card.classList.contains(activeCategory));

      // Toggle search-hidden class
      if (matchesSearch) {
        card.classList.remove('search-hidden');
      } else {
        card.classList.add('search-hidden');
      }

      if (matchesSearch && matchesCategory) {
        visibleCount++;
      }
    });

    // Toggle "No products found" message
    if (noProductsMsg) {
      if (visibleCount === 0) {
        noProductsMsg.classList.remove('d-none');
      } else {
        noProductsMsg.classList.add('d-none');
      }
    }
  }

  // Event Listeners for Search
  if (searchInput) {
    searchInput.addEventListener('input', evaluateVisibility);
    searchInput.addEventListener('keyup', evaluateVisibility);
    searchInput.addEventListener('search', evaluateVisibility);
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', evaluateVisibility);
  }

  categoryRadios.forEach(radio => {
    radio.addEventListener('change', evaluateVisibility);
  });

  // 4. Sort by Price via DOM re-ordering (.appendChild)
  let isAscending = true;

  if (sortBtn && productGridRow) {
    sortBtn.addEventListener('click', () => {
      productCards.sort((cardA, cardB) => {
        const priceA = extractPrice(cardA);
        const priceB = extractPrice(cardB);
        return isAscending ? priceA - priceB : priceB - priceA;
      });

      productCards.forEach(card => {
        productGridRow.appendChild(card);
      });

      sortBtn.innerHTML = isAscending
        ? '<i class="bi bi-sort-numeric-down me-1"></i> Price: Low to High'
        : '<i class="bi bi-sort-numeric-up-alt me-1"></i> Price: High to Low';

      isAscending = !isAscending;
      evaluateVisibility();
    });
  }

  // Run initial visibility evaluation
  evaluateVisibility();
}

// Execute immediately when loaded
runTask3();