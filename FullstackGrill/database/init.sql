-- MySQL-compatible seed for Mike's Grill `menu_items` table
-- This file creates the `mikesgrill` database (if missing), the `menu_items` table
-- and inserts sample data. It's intended to be used with the project's docker-compose (which maps ./init.sql)
-- or with a local MySQL server.

SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE IF NOT EXISTS `mikesgrill` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `mikesgrill`;

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS `menu_items` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` TEXT NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10,2),
  `image_url` TEXT,
  `category` VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: uncomment the next line to truncate the table before inserting
-- TRUNCATE TABLE `menu_items`;

-- Insert menu items (converted from the provided menu text)
INSERT INTO `menu_items` (`name`, `description`, `price`, `image_url`, `category`) VALUES
('Two Eggs Breakfast', 'Two fresh country eggs, served any style. Toast, Jelly and coffee.', 4.95, NULL, 'Breakfast'),
('Two Eggs with Bacon', 'Two fresh country eggs served with three slices of bacon, toast, jelly and coffee.', 6.45, NULL, 'Breakfast'),
('Two Eggs with Ham', 'Generous serving of ham with two fresh country eggs, toast, jelly and coffee.', 6.95, NULL, 'Breakfast'),
('Add an Egg', 'Additional egg with breakfast purchase.', 1.25, NULL, 'Breakfast'),
('Order of Toast (2 slices)', 'Two slices of white or wheat with butter and jelly.', 1.50, NULL, 'Breakfast'),
('Shake (Small)', 'Delicious shake, extra rich and thick, any flavor (small).', 2.75, NULL, 'Drinks'),
('Shake (Medium)', 'Delicious shake, extra rich and thick, any flavor (medium).', 3.25, NULL, 'Drinks'),
('Shake (Large)', 'Delicious shake, extra rich and thick, any flavor (large).', 3.75, NULL, 'Drinks'),
('Malt (Small)', 'Extra rich malt (small).', 3.00, NULL, 'Drinks'),
('Malt (Small)', 'Extra rich malt (medium).', 3.50, NULL, 'Drinks')
('Malt (Large)', 'Extra rich malt (large).', 4.00, NULL, 'Drinks'),
('Sundae', 'Sundae - pineapple, strawberry, chocolate, butterscotch.', 3.25, NULL, 'Desserts'),
('Soda', 'Fountain soda (various flavors).', 3.25, NULL, 'Drinks'),
('Pie (Baked fresh daily)', 'Fresh-baked pie.', 4.95, NULL, 'Desserts'),
('Pie Ala Mode', 'Pie served ala mode with ice cream.', 5.70, NULL, 'Desserts'),
('Coffee (Regular/Decaf)', 'Coffee; refill with meal.', 1.95, NULL, 'Drinks'),
('Hot Chocolate', 'Hot chocolate.', 1.95, NULL, 'Drinks'),
('Hot Tea', 'Hot tea.', 1.95, NULL, 'Drinks'),
('Orange Juice (12 oz)', 'Orange juice, 12 oz.', 2.75, NULL, 'Drinks'),
('Milk (12 oz)', 'Milk, 12 oz.', 2.75, NULL, 'Drinks'),
('Flavored Syrup (add-on)', 'Add flavored syrup to any drink.', 0.25, NULL, 'Drinks'),
('Soft Drink 16oz', 'Pepsi, Diet Pepsi, Sierra Mist, Dr. Pepper, Mountain Dew, Root Beer, Iced Tea, Lemonade - 16 oz.', 1.90, NULL, 'Drinks'),
('Soft Drink 22oz', 'Soft drink - 22 oz.', 2.20, NULL, 'Drinks'),
('Soft Drink 32oz', 'Soft drink - 32 oz.', 2.60, NULL, 'Drinks'),
('Hamburger', '1/5 pound fresh ground chuck served on a toasted bun.', 4.10, NULL, 'Sandwiches'),
('Double Hamburger', 'Double hamburger', 6.15, NULL, 'Sandwiches'),
('Cheeseburger', 'Hamburger with melted American cheese.', 4.50, NULL, 'Sandwiches'),
('Double Cheeseburger', 'Double cheeseburger', 6.95, NULL, 'Sandwiches'),
('Twinburger', 'A hamburger and a cheeseburger served on a seeded bun.', 6.55, NULL, 'Sandwiches'),
('Hot Ham Sandwich', 'Generous portion of ham served on bun or bread.', 3.55, NULL, 'Sandwiches'),
('Tenderloin', '1/4 pound breaded pork tenderloin, fried to golden brown, served on a toasted bun.', 3.95, NULL, 'Sandwiches'),
('BLT', 'Bacon, lettuce, and tomato on white or wheat toast.', 4.25, NULL, 'Sandwiches'),
('Ham and Egg', 'Country fresh egg served with a generous slice of ham on bread or bun.', 4.05, NULL, 'Sandwiches'),
('Bacon and Egg', 'Country fresh egg served with three strips of bacon on bread or bun.', 4.05, NULL, 'Sandwiches'),
('Grilled Cheese', 'Grilled cheese sandwich.', 2.95, NULL, 'Sandwiches'),
('Hot Dog', 'Hot dog.', 2.65, NULL, 'Sandwiches'),
('Corn Dog', 'Corn dog.', 3.75, NULL, 'Sandwiches'),
('Chili Dog', 'Hot dog with homemade chili sauce.', 3.25, NULL, 'Sandwiches'),
('Chicken Sandwich', 'Large breaded chicken patty served on a toasted bun.', 5.75, NULL, 'Sandwiches'),
('Ham or Chicken Salad', 'Ham salad or chicken salad (seasonal).', 4.75, NULL, 'Sandwiches'),
('Barbeque Sandwich', 'Barbeque sandwich.', 4.75, NULL, 'Sandwiches'),
('Add Bacon (to any sandwich)', 'Add bacon to any sandwich (extra).', 1.50, NULL, 'Extras'),
('Chili (Cup)', 'Chili made fresh daily (cup).', 3.25, NULL, 'Sides'),
('Chili (Bowl)', 'Chili made fresh daily (bowl).', 4.50, NULL, 'Sides'),
('Vegetable Soup (Cup)', 'Homemade vegetable soup (seasonal) (cup).', 3.25, NULL, 'Sides'),
('Vegetable Soup (Bowl)', 'Homemade vegetable soup (seasonal) (bowl).', 4.50, NULL, 'Sides'),
('Onion Rings', 'Onion rings, beer-battered.', 3.50, NULL, 'Sides'),
('French Fries (Large)', 'Golden crispy fries, large order.', 2.60, NULL, 'Sides'),
('Baked Beans', 'Baked beans.', 2.60, NULL, 'Sides'),
('Cheese Fries', 'French fries topped with cheese.', 3.50, NULL, 'Sides'),
('Hamburger Steak Dinner', 'Over 1/2 pound fresh ground chuck, french fries and garden salad.', 13.45, NULL, 'Dinner'),
('Fish Dinner', 'Generous serving of battered cod, french fries & garden salad.', 11.95, NULL, 'Dinner'),
('Shrimp Dinner', 'Six large shrimp, french fries & garden salad.', 12.45, NULL, 'Dinner'),
('Chicken Strip Dinner', 'Breaded chicken tenders, french fries & garden salad.', 10.95, NULL, 'Dinner'),
('Shrimp Basket', 'Six large shrimp, french fries, bread and butter.', 10.45, NULL, 'Dinner'),
('Chicken Strip Basket', 'Breaded chicken tenders, french fries, bread and butter.', 8.95, NULL, 'Dinner'),
('Kids Meal', 'Hot dog, grilled cheese, or chicken nuggets. Served with fries or chips & kids drink.', 4.95, NULL, 'Kids'),
('Kids Drink', 'Kids drink (soft drink, lemonade, tea 12 oz).', 1.50, NULL, 'Kids'),
('Garden Salad', 'Crisp fresh lettuce with tomato, cheese and choice of dressing.', 4.50, NULL, 'Salads'),
('Chef Salad (Small)', 'Crisp fresh lettuce served with ham, cheese, egg, olives, and tomato.', 6.45, NULL, 'Salads'),
('Chef Salad (Large)', 'Large chef salad.', 7.95, NULL, 'Salads'),
('Cottage Cheese', 'Cottage cheese side.', 3.25, NULL, 'Sides'),
('Potato Salad', 'Potato salad, made fresh daily.', 3.25, NULL, 'Sides'),
('Cole Slaw', 'Cole slaw, made fresh daily.', 3.25, NULL, 'Sides');

SET FOREIGN_KEY_CHECKS=1;
