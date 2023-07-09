CREATE TABLE `categories` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3));
--> statement-breakpoint
ALTER TABLE `products` ADD `categoryId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `category`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `subcategory`;