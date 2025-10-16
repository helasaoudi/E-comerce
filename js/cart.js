// Cart manager using sessionStorage
(function(window){
    var CART_KEY = 'fruitables_cart_v1';

    function getCart(){
        try{
            var raw = sessionStorage.getItem(CART_KEY);
            if(!raw) return [];
            return JSON.parse(raw) || [];
        }catch(e){
            return [];
        }
    }
    function saveCart(cart){
        sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
    function addToCart(productId, qty){
        qty = parseInt(qty,10) || 1;
        var cart = getCart();
        var item = cart.find(function(i){ return i.id === productId; });
        if(item){
            item.qty = item.qty + qty;
        } else {
            cart.push({ id: productId, qty: qty });
        }
        saveCart(cart);
    }
    function updateQty(productId, qty){
        qty = parseInt(qty,10) || 0;
        var cart = getCart();
        var idx = cart.findIndex(function(i){ return i.id === productId; });
        if(idx === -1) return;
        if(qty <= 0){
            cart.splice(idx,1);
        } else {
            cart[idx].qty = qty;
        }
        saveCart(cart);
    }
    function removeItem(productId){
        var cart = getCart();
        cart = cart.filter(function(i){ return i.id !== productId; });
        saveCart(cart);
    }
    function clearCart(){
        saveCart([]);
    }
    // mark all items as paid (set paid flag on each item)
    function markAllPaid(){
        var cart = getCart();
        cart = cart.map(function(i){ return { id: i.id, qty: i.qty, paid: true }; });
        saveCart(cart);
    }
    function isPaid(productId){
        var cart = getCart();
        var item = cart.find(function(i){ return i.id === productId; });
        return item && item.paid;
    }
    function countItems(){
        var cart = getCart();
        return cart.reduce(function(acc,i){ return acc + (i.qty || 0); }, 0);
    }

    window.Cart = {
        getCart: getCart,
        saveCart: saveCart,
        addToCart: addToCart,
        updateQty: updateQty,
        removeItem: removeItem,
        clearCart: clearCart,
        markAllPaid: markAllPaid,
        isPaid: isPaid,
        countItems: countItems
    };
})(window);
