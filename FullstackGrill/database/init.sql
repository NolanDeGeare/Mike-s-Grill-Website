-- MySQL-compatible seed for Mike's Grill `menu_items` table
-- This file creates the `mikesgrill` database (if missing), the `menu_items` table


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
  `category_id` BIGINT,
  FOREIGN KEY (`category_id`) REFERENCES `menu_categories`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `restaurant_hours` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `day_of_week` VARCHAR(20) NOT NULL,
  `open_time` VARCHAR(20),
  `close_time` VARCHAR(20),
  `closed` TINYINT(1) DEFAULT 0,
  `sort_order` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `hero_image_url` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `menu_categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `sort_order` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: uncomment the next line to truncate the table before inserting
-- TRUNCATE TABLE `menu_items`;

-- Insert menu items (converted from the provided menu text)
INSERT INTO `menu_items` (`name`, `description`, `price`, `image_url`, `category_id`) VALUES
('Two Eggs Breakfast', 'Two fresh country eggs, served any style. Toast, Jelly and coffee.', 4.95, NULL, 1),
('Two Eggs with Bacon', 'Two fresh country eggs served with three slices of bacon, toast, jelly and coffee.', 6.45, NULL, 1),
('Two Eggs with Ham', 'Generous serving of ham with two fresh country eggs, toast, jelly and coffee.', 6.95, NULL, 1),
('Add an Egg', 'Additional egg with breakfast purchase.', 1.25, NULL, 1),
('Order of Toast (2 slices)', 'Two slices of white or wheat with butter and jelly.', 1.50, NULL, 1),
('Shake (Small)', 'Delicious shake, extra rich and thick, any flavor (small).', 2.75, NULL, 2),
('Shake (Medium)', 'Delicious shake, extra rich and thick, any flavor (medium).', 3.25, NULL, 2),
('Shake (Large)', 'Delicious shake, extra rich and thick, any flavor (large).', 3.75, NULL, 2),
('Malt (Small)', 'Extra rich malt (small).', 3.00, NULL, 2),
('Malt (Medium)', 'Extra rich malt (medium).', 3.50, NULL, 2),
('Malt (Large)', 'Extra rich malt (large).', 4.00, NULL, 2),
('Sundae', 'Sundae - pineapple, strawberry, chocolate, butterscotch.', 3.25, NULL, 3),
('Soda', 'Fountain soda (various flavors).', 3.25, NULL, 2),
('Pie (Baked fresh daily)', 'Fresh-baked pie.', 4.95, NULL, 3),
('Pie Ala Mode', 'Pie served ala mode with ice cream.', 5.70, NULL, 3),
('Coffee (Regular/Decaf)', 'Coffee; refill with meal.', 1.95, NULL, 2),
('Hot Chocolate', 'Hot chocolate.', 1.95, NULL, 2),
('Hot Tea', 'Hot tea.', 1.95, NULL, 2),
('Orange Juice (12 oz)', 'Orange juice, 12 oz.', 2.75, NULL, 2),
('Milk (12 oz)', 'Milk, 12 oz.', 2.75, NULL, 2),
('Flavored Syrup (add-on)', 'Add flavored syrup to any drink.', 0.25, NULL, 2),
('Soft Drink 16oz', 'Pepsi, Diet Pepsi, Sierra Mist, Dr. Pepper, Mountain Dew, Root Beer, Iced Tea, Lemonade - 16 oz.', 1.90, NULL, 2),
('Soft Drink 22oz', 'Soft drink - 22 oz.', 2.20, NULL, 2),
('Soft Drink 32oz', 'Soft drink - 32 oz.', 2.60, NULL, 2),
('Hamburger', '1/5 pound fresh ground chuck served on a toasted bun.', 4.10, NULL, 4),
('Double Hamburger', 'Double hamburger', 6.15, NULL, 4),
('Cheeseburger', 'Hamburger with melted American cheese.', 4.50, NULL, 4),
('Double Cheeseburger', 'Double cheeseburger', 6.95, NULL, 4),
('Twinburger', 'A hamburger and a cheeseburger served on a seeded bun.', 6.55, NULL, 4),
('Hot Ham Sandwich', 'Generous portion of ham served on bun or bread.', 3.55, NULL, 4),
('Tenderloin', '1/4 pound breaded pork tenderloin, fried to golden brown, served on a toasted bun.', 3.95, NULL, 4),
('BLT', 'Bacon, lettuce, and tomato on white or wheat toast.', 4.25, NULL, 4),
('Ham and Egg', 'Country fresh egg served with a generous slice of ham on bread or bun.', 4.05, NULL, 4),
('Bacon and Egg', 'Country fresh egg served with three strips of bacon on bread or bun.', 4.05, NULL, 4),
('Grilled Cheese', 'Grilled cheese sandwich.', 2.95, NULL, 4),
('Hot Dog', 'Hot dog.', 2.65, NULL, 4),
('Corn Dog', 'Corn dog.', 3.75, NULL, 4),
('Chili Dog', 'Hot dog with homemade chili sauce.', 3.25, NULL, 4),
('Chicken Sandwich', 'Large breaded chicken patty served on a toasted bun.', 5.75, NULL, 4),
('Ham or Chicken Salad', 'Ham salad or chicken salad (seasonal).', 4.75, NULL, 4),
('Barbeque Sandwich', 'Barbeque sandwich.', 4.75, NULL, 4),
('Add Bacon (to any sandwich)', 'Add bacon to any sandwich (extra).', 1.50, NULL, 5),
('Chili (Cup)', 'Chili made fresh daily (cup).', 3.25, NULL, 6),
('Chili (Bowl)', 'Chili made fresh daily (bowl).', 4.50, NULL, 6),
('Vegetable Soup (Cup)', 'Homemade vegetable soup (seasonal) (cup).', 3.25, NULL, 6),
('Vegetable Soup (Bowl)', 'Homemade vegetable soup (seasonal) (bowl).', 4.50, NULL, 6),
('Onion Rings', 'Onion rings, beer-battered.', 3.50, NULL, 6),
('French Fries (Large)', 'Golden crispy fries, large order.', 2.60, NULL, 6),
('Baked Beans', 'Baked beans.', 2.60, NULL, 6),
('Cheese Fries', 'French fries topped with cheese.', 3.50, NULL, 6),
('Hamburger Steak Dinner', 'Over 1/2 pound fresh ground chuck, french fries and garden salad.', 13.45, NULL, 7),
('Fish Dinner', 'Generous serving of battered cod, french fries & garden salad.', 11.95, NULL, 7),
('Shrimp Dinner', 'Six large shrimp, french fries & garden salad.', 12.45, NULL, 7),
('Chicken Strip Dinner', 'Breaded chicken tenders, french fries & garden salad.', 10.95, NULL, 7),
('Shrimp Basket', 'Six large shrimp, french fries, bread and butter.', 10.45, NULL, 7),
('Chicken Strip Basket', 'Breaded chicken tenders, french fries, bread and butter.', 8.95, NULL, 7),
('Kids Meal', 'Hot dog, grilled cheese, or chicken nuggets. Served with fries or chips & kids drink.', 4.95, NULL, 8),
('Kids Drink', 'Kids drink (soft drink, lemonade, tea 12 oz).', 1.50, NULL, 8),
('Garden Salad', 'Crisp fresh lettuce with tomato, cheese and choice of dressing.', 4.50, NULL, 9),
('Chef Salad (Small)', 'Crisp fresh lettuce served with ham, cheese, egg, olives, and tomato.', 6.45, NULL, 9),
('Chef Salad (Large)', 'Large chef salad.', 7.95, NULL, 9),
('Cottage Cheese', 'Cottage cheese side.', 3.25, NULL, 6),
('Potato Salad', 'Potato salad, made fresh daily.', 3.25, NULL, 6),
('Cole Slaw', 'Cole slaw, made fresh daily.', 3.25, NULL, 6);

INSERT INTO `restaurant_hours` (`day_of_week`, `open_time`, `close_time`, `closed`, `sort_order`) VALUES
('Monday', '11:00 AM', '9:00 PM', 0, 1),
('Tuesday', '11:00 AM', '9:00 PM', 0, 2),
('Wednesday', '11:00 AM', '9:00 PM', 0, 3),
('Thursday', '11:00 AM', '9:00 PM', 0, 4),
('Friday', '11:00 AM', '10:00 PM', 0, 5),
('Saturday', '11:00 AM', '10:00 PM', 0, 6),
('Sunday', '', '', 1, 7);

INSERT INTO `site_settings` (`hero_image_url`) VALUES
(NULL);

INSERT INTO `menu_categories` (`name`, `sort_order`) VALUES
('Breakfast', 1),
('Drinks', 2),
('Desserts', 3),
('Sandwiches', 4),
('Extras', 5),
('Sides', 6),
('Dinner', 7),
('Kids', 8),
('Salads', 9);

-- Insert a default admin user with a placeholder password.
-- IMPORTANT: Replace 'your_secure_password_hash' with a real, securely generated password hash.
INSERT INTO `admin_users` (`username`, `password_hash`) VALUES
('admin', '$2a$10$V.iP6.t/iY9.gZ.w.g.e.O/4.g.e.O/4.g.e.O/4.g.e.O/4.g.e');

SET FOREIGN_KEY_CHECKS=1;
