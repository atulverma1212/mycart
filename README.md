# Store

StoreApplication is basically an ecommerce application built for the company MyStore. This application allows the store to provide items for customer to buy. Each item will have a name, description, price and picture. The online store has a **SpringBoot backend** and a **Angular 14 frontend**. It provides the following features. 

1. Display items to be purchased. From here the customer can select how many of the items they wish to purchase. 
2. Description page. When a customer selects an item it will show the items description information.
3. Online cart where items can be added. When an item is added the cart will update the total cart price.
4. Checkout page that accepts the customers name, address and credit card information (16 digit number).


#### There are two layers of the application:

1. The back-end implemented with Spring Boot
2. The front-end implemented with Angular

## The Back-End
The back-end is all about security and connecting the front-end to H2 database data and actions.

1. Managed user access with Spring Security
* Unauthorized users are restricted from accessing pages. In order to do this, we have used SpringSecurityConfig that extends the WebSecurityConfigurerAdapter class from Spring. 
* All requests from the website need to provide Authorization in the header to be allowed access.
2. Controllers bind application data and functionality to the front-end. Product controller provides the product information to the system while an OrderController stores order information when a cart transaction is completed. 
* Controllers are responsible for determining what, if any, error messages the application displays to the user. When a controller processes front-end requests, it should delegate the individual steps and logic of those requests to other services in the application.
3. Making calls to the database with JPA mappers.
* Two model classes: Product and Order are implemented. We have used appropriate JPA annotations on these models
* To connect these model classes with database data, JPA mapper interfaces are implemented for each of the model types. These mappers extend JpaRepository.

## Running the Backend

1. Load the application into InteliJ
2. Right click on StoreApplication and select run or from the cmd line use `mvn spring-boot:run`
3. The application will be running on  `http://localhost:8080/`

## The Frontend

Website
The website contain the following components, cart, confirmation, product-item, product-item-detail and product-list

1. Product list - 
The user is able to view all products that the site sales. It has the name, price, picture and quantity to purchase.

The product service pulls the product list from the backend. 

2. Confirmation - 
The user receives a confirmation dialog when they add an item to the cart. 

3. Product item - 
Provides the information that each product in the list will display to the customer.

4. Product item detail - 
Provides the detail description of the product when a customer selects the product from the product list. 

5. Cart - 
Provides a summary of the items in the cart along with the total price. Additionally, takes the customers, name, address and credit card to complete the order. 

When a customer submits a cart they are provided with the summary of the cart. The submit button will send the order to the backend. 

## Running the frontend 

1. Navigate to /webapp/angular-frontend
2. Install dependencies with `npm install`.
3. Run `ng serve` for a dev server.
4. Navigate to `http://localhost:4200/`.

## Additional functionalities added: 
1. Proper logging has been implemented in backend. A `logback-spring.xml` has also been added in order to format the logs. 
2. Tooltip is added on the main product-list page. 
3. Security authorization token is placed in `environment.ts` file
4. `Lombok` library has been used for byassing the implementation of Getter, Setter, toString and constructors.
5. Proper spring-boot-service ProductService and OrderService classes have been implemented 