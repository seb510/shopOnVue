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
        product: {
            id: 1002,
            title: 'Cat Food, 215b bag',
            description: "A 25 pound ba of <em>irresistible</em>," + " organic goodness for your cat",
            price: 2000,
            image: 'assets/images/product.png',
            availableInventory: 5,
        },
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
        addToCart: function () {
            this.cart.push(this.product.id);
        },
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
            console.log(this.showProduct)
        },
        submitForm() {
            alert('submitted')
        }
    },
    computed: {
        cartItemCount: function () {
            return this.cart.length || '';
        },
        canAddToCart: function () {
            return this.product.availableInventory > this.cartItemCount;
        }
    }
})