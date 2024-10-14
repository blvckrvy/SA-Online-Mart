// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Description modal
$(function () {
    $('.product-image i').click(function () {
        $('#myModal').fadeIn();
    })

    $('.close').click(function () {
        $('#myModal').fadeOut();
    })
})

//cart item modal
$(function () {
    $('.add-to-cart').click(function () {
        $('#btnModal').fadeIn();
        $('#btnModal').css('display', 'flex');
    })

    $('.close').click(function () {
        $('#btnModal').fadeOut();
    })
})

//cart modal
$(function () {
    $('#cart').click(function () {
        $('#cartModal').css({
            display: 'block',
            left: '-100%'
        }).animate({ left: '0%' }, 500);
    });

    $('.close').click(function () {
        $('#cartModal').animate({ left: '-100%' }, 500, function () {
            $(this).css('display', 'none');
        });
    });
});

//checkout modal
$(function () {
    $('#checkoutButton').click(function () {
        $('#cartModal').animate({ left: '-100%' }, 500, function () {
            $(this).css('display', 'none');
        });

        $('#checkoutModal').css({
            display: 'block',
            left: '100%'
        }).animate({ left: '0%' }, 500);
    });

    $('.close').click(function () {
        $('#checkoutModal').animate({ left: '-100%' }, 500, function () {
            $(this).css('display', 'none');
        });
    });
})

//summary modal
$(function () {
    $('#BTN').click(function () {
        $('#checkoutModal').animate({ left: '-100%' }, 500, function () {
            $(this).css('display', 'none');
        });

        $('#checkoutModal2').css({
            display: 'block',
            left: '100%'
        }).animate({ left: '0%' }, 500);
    });

    $('.close').click(function () {
        $('#checkoutModal2').animate({ left: '-100%' }, 500, function () {
            $(this).css('display', 'none');
        });
    });
})

//summary back to checkout modal
$(function () {
    $('#back').click(function () {
        $('#checkoutModal2').animate({ left: '100%' }, 500, function () {
            $(this).css('display', 'none');
        });

        $('#checkoutModal').css({
            display: 'block',
            left: '-100%'
        }).animate({ left: '0%' }, 500);
    });
})

// Update cart information
function addItemToCart(product, price) {
    const cartItems = document.getElementById('cartItems');
    const rows = cartItems.getElementsByTagName('tr');
    let existingRow = null;

    // Check if product already in cart
    for (let row of rows) {
        const productName = row.getElementsByTagName('td')[0].textContent;
        if (productName === product) {
            existingRow = row;
            break;
        }
    }

    // Update quantity if product exists
    if (existingRow) {
        const qtyCell = existingRow.getElementsByTagName('td')[1];
        let qty = parseInt(qtyCell.textContent);
        qty++;
        qtyCell.textContent = qty;

        // Update total price
        const priceCell = existingRow.getElementsByTagName('td')[2];
        priceCell.textContent = 'R ' + (qty * price).toFixed(2);
    } else {
        // New row for product
        const row = document.createElement('tr');

        const productCell = document.createElement('td');
        productCell.textContent = product;
        row.appendChild(productCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = 1;
        row.appendChild(quantityCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = 'R ' + price.toFixed(2);
        row.appendChild(priceCell);

        const actionsCell = document.createElement('td');

        const addButton = document.createElement('button');
        addButton.textContent = "+";
        addButton.onclick = function () {
            let qty = parseInt(quantityCell.textContent);
            qty++;
            quantityCell.textContent = qty;

            // Update total price
            priceCell.textContent = 'R ' + (qty * price).toFixed(2);
            updateCartTotal(); // Recalculate total after quantity change
        };
        actionsCell.appendChild(addButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.onclick = function () {
            let qty = parseInt(quantityCell.textContent);
            if (qty > 1) {
                qty--;
                quantityCell.textContent = qty;

                // Update total price
                priceCell.textContent = 'R ' + (qty * price).toFixed(2);
            } else {
                cartItems.removeChild(row);
            }
            updateCartTotal(); // Recalculate total after quantity change or item removal
        };
        actionsCell.appendChild(removeButton);

        row.appendChild(actionsCell);
        cartItems.appendChild(row);
    }

    updateCartTotal();
}

// Update cart total
function updateCartTotal() {
    let total = 0;
    const rows = document.querySelectorAll('#cartItems tr');
    rows.forEach(row => {
        const priceCell = row.querySelector('td:nth-child(3)');
        total += parseFloat(priceCell.textContent.replace('R ', ''));
    });
    document.getElementById('cartTotal').textContent = 'R ' + total.toFixed(2);
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-info h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.product-info h4').textContent.replace('R ', ''));
        addItemToCart(productName, productPrice);
    });
});