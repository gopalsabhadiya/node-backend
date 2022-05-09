
CREATE TABLE `user` (
                        `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                        `type` varchar(255) DEFAULT NULL,
                        `contact_no` varchar(255) DEFAULT NULL,
                        `full_name` varchar(255) DEFAULT NULL,
                        `user_name` varchar(255) DEFAULT NULL,
                        `email_id` varchar(255) DEFAULT NULL,
                        `nick_name` varchar(255) DEFAULT NULL,
                        `longitude` decimal(9,6) DEFAULT NULL,
                        `latitude` decimal(9,6) DEFAULT NULL,
                        `has_image` tinyint(1) DEFAULT '1',
                        `active` tinyint(1) DEFAULT '1',
                        `created_at` datetime DEFAULT NULL,
                        `updated_at` datetime DEFAULT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `contact_no` (`contact_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `business` (
                            `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                            `name` varchar(255) NOT NULL DEFAULT '0',
                            `category` varchar(255) NOT NULL DEFAULT '0',
                            `sub_category` varchar(255) NOT NULL DEFAULT '0',
                            `description` varchar(255) NOT NULL DEFAULT '0',
                            `longitude` decimal(9,6) DEFAULT NULL,
                            `latitude` decimal(9,6) DEFAULT NULL,
                            `active` tinyint(1) NOT NULL DEFAULT '1',
                            `created_at` datetime DEFAULT NULL,
                            `updated_at` datetime DEFAULT NULL,
                            `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            KEY `user_id` (`user_id`),
                            CONSTRAINT `business_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product` (
                           `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                           `name` varchar(255) DEFAULT NULL,
                           `price` decimal(10,0) DEFAULT NULL,
                           `description` varchar(255) DEFAULT NULL,
                           `offer` varchar(255) DEFAULT NULL,
                           `item_code` varchar(255) DEFAULT NULL,
                           `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                           `business_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                           `active` tinyint(1) NOT NULL DEFAULT '1',
                           `created_at` datetime DEFAULT NULL,
                           `updated_at` datetime DEFAULT NULL,
                           `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                           PRIMARY KEY (`id`),
                           KEY `user_id` (`user_id`),
                           KEY `business_id` (`business_id`),
                           KEY `product_id` (`product_id`),
                           CONSTRAINT `product_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
                           CONSTRAINT `product_ibfk_2` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
                           CONSTRAINT `product_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `business` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subscription_plan` (
                                     `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                                     `type` varchar(255) NOT NULL,
                                     `description` varchar(255) NOT NULL,
                                     `created_at` datetime DEFAULT NULL,
                                     `updated_at` datetime DEFAULT NULL,
                                     PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `terms_and_condition` (
                                       `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                                       `type` varchar(255) NOT NULL,
                                       `sub_type` varchar(255) DEFAULT NULL,
                                       `description` varchar(255) DEFAULT NULL,
                                       `order` int DEFAULT '0',
                                       `created_at` datetime DEFAULT NULL,
                                       `updated_at` datetime DEFAULT NULL,
                                       PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO subscription_plan (`id`, `type`, `description`, `created_at`, `updated_at`) VALUES ("abf01972-42a0-42bd-9b55-666838dae4b7", "Basic", "This is basic plan", SYSDATE(), SYSDATE());
INSERT INTO subscription_plan (`id`, `type`, `description`, `created_at`, `updated_at`) VALUES ("183b9d65-a7a9-41dd-b8ac-467ff5e1ed26", "Standard", "This is standard plan", SYSDATE(), SYSDATE());
INSERT INTO subscription_plan (`id`, `type`, `description`, `created_at`, `updated_at`) VALUES ("2ab707c2-2adf-4eb9-ae6a-a65639a8f5f9", "Premium", "This is premium plan", SYSDATE(), SYSDATE());

INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("cb1728d7-a694-4838-a83a-f75d464d2176", "Subscription", "Basic", "T And C One - Basic", 0, SYSDATE(), SYSDATE());
INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("aeeddc73-3831-4c36-88e6-fe7f9db6d9a9", "Subscription", "Basic", "T And C Two - Basic", 1, SYSDATE(), SYSDATE());
INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("6d2312b0-58c5-4cec-a0f2-506e30d99026", "Subscription", "Basic", "T And C Three - Basic", 2, SYSDATE(), SYSDATE());
INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("31447b66-983d-48ce-8efb-895c626fe399", "Subscription", "Basic", "T And C Four - Basic", 3, SYSDATE(), SYSDATE());

INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("8e499361-3f45-4999-a41d-7f4d5166b900", "Subscription", "Standard", "T And C One - Standard", 0, SYSDATE(), SYSDATE());
INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("052df53d-ae77-4a1a-9c96-cb7a2ae2d8d6", "Subscription", "Standard", "T And C Two - Standard", 1, SYSDATE(), SYSDATE());
INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("f7129d95-ecf5-4568-a299-3816de32d7e9", "Subscription", "Standard", "T And C Three - Standard", 2, SYSDATE(), SYSDATE());
INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("718e2f4f-ef09-4fab-a780-68781a31cbe3", "Subscription", "Standard", "T And C Four - Standard", 3, SYSDATE(), SYSDATE());

INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("de117302-fe21-4319-a770-d5cccfd3817b", "Subscription", "Premium", "T And C One - Premium", 0, SYSDATE(), SYSDATE());
INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("21257385-222e-4674-b23e-b735214e4a9e", "Subscription", "Premium", "T And C Two - Premium", 1, SYSDATE(), SYSDATE());
INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("5ba1bbdd-24bd-4ac1-8288-fdd8a75ada6f", "Subscription", "Premium", "T And C Three - Premium", 2, SYSDATE(), SYSDATE());
INSERT INTO terms_and_condition (`id`, `type`, `sub_type`, `description`, `order`, `created_at`, `updated_at`) VALUES ("cc073490-1b9c-4a15-91cb-b17b60434be7", "Subscription", "Premium", "T And C Four - Premium", 3, SYSDATE(), SYSDATE());



