// This script enhances product cards in index.html to link to product-details.html?id=<id>
(function(){
    function makeLinks() {
        // find product cards by the class used in index: .fruite-item and .vesitable-item
        var idx = 0;
        var cards = document.querySelectorAll('.fruite-item, .vesitable-item');
        cards.forEach(function(card){
            var titleEl = card.querySelector('h4');
            if(!titleEl) return;
            var name = titleEl.textContent.trim();
            // find product by name (fallback) or assign sequentially
            var product = PRODUCTS.find(function(p){ return p.name.toLowerCase() === name.toLowerCase(); });
            if(!product) {
                // assign from list in order if names don't match
                product = PRODUCTS[idx % PRODUCTS.length];
            }
            idx++;
            // wrap image and title with link to details
            var link = document.createElement('a');
            link.href = 'product-details.html?id=' + encodeURIComponent(product.id);
            link.className = 'stretched-link';
            link.style.zIndex = 2;
            // place link inside card - easiest is to append to card so it covers the card via stretched-link
            var cardBody = card.querySelector('.p-4') || card;
            cardBody.style.position = 'relative';
            cardBody.appendChild(link);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', makeLinks);
    } else {
        makeLinks();
    }
})();
