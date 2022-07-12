let webstore = new Vue({
    el: '#app',
    data: {
        siteName: 'Vue.js Pet Depot',
        showProduct: true,
        order: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zip: '',
            state: '',
            method: 'Home Address',
            business: 'Business Address',
            home: 'Home Address',
            gift: 'Send As a Gift',
            sendGift: 'Send As Gift',
            dontSendGift: 'Do Not Send As A Gift'

        },
        states: {
            AL: 'Alabama',
            AR: 'Arizona',
            CA: 'California',
            NV: 'Nevada',
        },
        products: [],
        cart: [],
    },
    filters: {
        formatPrice: function (price) {
            if (!parseInt(price)) {
                return "";
            }
            if (price > 99999) {
                let priceString = (price / 100).toFixed(2);
                let priceArray = priceString.split("").reverse();
                let index = 3;
                while (priceArray.length > index + 3) {
                    priceArray.splice(index + 3, 0, ',');
                    index += 4;
                }
                return '$' + priceArray.reverse().join("");
            } else {
                return '$' + (price / 100).toFixed(2);
            }
        }
    },
    methods: {
        addToCart: function (aProduct) {
            this.cart.push(aProduct.id);
        },
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
            console.log(this.showProduct)
        },
        submitForm() {
            alert('submitted')
        },
        checkRating (n, myProduct) {
            return myProduct.rating - n >= 0;
        },
        canAddToCart: function (aProduct) {
            return aProduct.availableInventory > this.cartCount(aProduct.id);
        },
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++){
                if(this.cart[i] === id){
                    count++;
                }
            }
            return count;
        },
    },
    computed: {
        cartItemCount: function () {
            return this.cart.length || '';
        },
    },
    /*sortedProducts() {
        if(this.products.length > 0) {
            let productsArray = this.products.slice(0);
            function compare (a, b) {
                if(a.title.toLowerCase() < b.title.toLowerCase())
                    return -1;
                if(a.title.toLowerCase() > b.title.toLowerCase())
                    return  0;
            }
            return productsArray.sort(compare);
        }
    },*/
    created: function () {
        axios.get('https://my-json-server.typicode.com/seb510/products/db').then(
            (response) => {
                this.products = response.data.products;
                console.log(this.products)
                //this.sortedProducts()
            }
        )
    }
})