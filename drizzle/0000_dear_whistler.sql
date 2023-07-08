CREATE TABLE `carts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(191),
	`paymentIntentId` varchar(191),
	`clientSecret` varchar(191),
	`items` json DEFAULT ('null'),
	`createdAt` timestamp DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`images` json DEFAULT ('null'),
	`category` enum('glasses','suits','shirts','shoes') NOT NULL DEFAULT 'glasses',
	`subcategory` varchar(191),
	`price` decimal(10,2) NOT NULL DEFAULT '0',
	`inventory` int NOT NULL DEFAULT 0,
	`rating` int NOT NULL DEFAULT 0,
	`details` json DEFAULT ('null'),
	`tags` json DEFAULT ('null'),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3));
--> statement-breakpoint
CREATE TABLE `wishlists` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(191),
	`items` json DEFAULT ('null'),
	`createdAt` timestamp DEFAULT (now()));
