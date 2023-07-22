CREATE TABLE `orderItems` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`orderId` varchar(255) NOT NULL DEFAULT '',
	`productId` int);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`isPaid` boolean DEFAULT false,
	`phone` varchar(255) DEFAULT '',
	`address` text DEFAULT (''),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`orderId` varchar(255) NOT NULL DEFAULT '');
--> statement-breakpoint
DROP TABLE `carts`;--> statement-breakpoint
DROP TABLE `wishlists`;--> statement-breakpoint
ALTER TABLE `categories` ADD `thumbnail` json DEFAULT ('null');--> statement-breakpoint
ALTER TABLE `categories` ADD `description` text DEFAULT ('Category Description') NOT NULL;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `rating`;