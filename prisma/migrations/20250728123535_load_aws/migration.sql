-- CreateTable
CREATE TABLE `tuwiter_user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tuwiter_user_username_key`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tuwiter_tweet` (
    `tweet_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `tweet_title` VARCHAR(191) NOT NULL,
    `tweet_content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`tweet_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tuwiter_like` (
    `like_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `tweet_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`like_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tuwiter_tweet` ADD CONSTRAINT `tuwiter_tweet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tuwiter_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tuwiter_like` ADD CONSTRAINT `tuwiter_like_tweet_id_fkey` FOREIGN KEY (`tweet_id`) REFERENCES `tuwiter_tweet`(`tweet_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tuwiter_like` ADD CONSTRAINT `tuwiter_like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tuwiter_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
