window.addEventListener('DOMContentLoaded', function(){
    // Получаем элементы для работы
    let products = document.querySelectorAll('.product'),
        buttons = document.getElementsByTagName('button'),
        open = document.getElementsByClassName('open')[0];//Кнопка "Открыть корзину"

    //console.log(products);
    // Функция для содания корзины
    function createCart(){
        // Создание элементов корзины
        let cart = document.createElement('div'),
            field = document.createElement('div'),
            heading = document.createElement('h2'),
            close = document.createElement('button');

        // Добавление класса элементам
        cart.classList.add('cart');
        field.classList.add('cart-field');
        close.classList.add('close');

        // Добавление текста к элементам
        close.textContent = 'Закрыть';
        heading.textContent = 'Корзина';

        document.body.appendChild(cart);// вставка в элемент
        cart.appendChild(heading);
        cart.appendChild(field);
        cart.appendChild(close);

    }

    createCart();

    let field = document.querySelector('.cart-field'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.close');
    //let removeBtn = document.querySelector('.remove');

    function moveToCart() {
        for ( let i = 0; i < buttons.length-1; i++ ){
            //перебор кнопок. Вешаем обработчик .click на каждую из кнопок
            buttons[i].addEventListener('click', function () {
                //создание копии товара
                let item = products[i].cloneNode(true), // Глубокое клонирование
                    btn = item.querySelector('button');
                btn.remove();// Удаляем кнопку Купить.

                // Зачем вообще удалять?

                let btnRemove = document.createElement('div');//инициализируем wrapper кнопки
                //Поместим кнопку во wrapper и оформим ее
                btnRemove.innerHTML = '<a id='+ [i] +' href="#" class="remove" title="Удалить товар из корзины">Удалить</a>';
                item.appendChild(btnRemove);//Добавим кнопки к товарам в корзине

                item.className +=" in-cart";
                //console.log( item );
                field.appendChild(item);
                products[i].remove();

                /** Вызываем функцию удаления из корзины, только после того как объекты в ней созданы.
                 Если я правильно понял, поскольку изначально элемнтов на странцие не было, обратится к ним через document
                 нельзя? Поэтому просто передаем их в нашу функцию, после создания
                 */

                removeInCart( item, btnRemove, [i] );

            });
        }//End for
    }

    moveToCart();
    function openCart() {
        cart.style.display = 'block';
    }
    function closeCart() {
        cart.style.display = 'none';
    }
    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);

    function removeInCart( item, btnRemove, i ){
        console.log(item);
        console.log(btnRemove);
        btnRemove.addEventListener('click', function () { //ловим клик
            if (confirm("Удалить продукт №"+ i +" из козины?")) {
                alert('Товар удален из корзины!');
            }
            item.remove();// Удаляем товар
            /**
             * Можно доделать, что бы товар вернулся обратно в каталог,
             * но и так пол дня потратил что бы разобраться что к чему, нужно другие дела делать :)
             *  Спасибо за интенсив :)
             */
        });
    }

});