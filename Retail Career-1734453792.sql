CREATE TABLE IF NOT EXISTS `users` (
	`user_id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(60) NOT NULL,
	`last_login` timestamp NOT NULL,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `stage_1` (
	`eligibility_id` int AUTO_INCREMENT NOT NULL,
	`application_id` int NOT NULL,
	`graduate_passout` boolean NOT NULL,
	`bike` boolean NOT NULL,
	`valid_dl` boolean NOT NULL,
	`below_28` boolean NOT NULL,
	`male` boolean NOT NULL,
	PRIMARY KEY (`eligibility_id`)
);

CREATE TABLE IF NOT EXISTS `stage_2` (
	`competency_id` int AUTO_INCREMENT NOT NULL,
	`communication_sk` int NOT NULL,
	`communication_skills` int NOT NULL,
	`analytical_skills` int NOT NULL,
	`regional_skills` int NOT NULL,
	`team_building` int NOT NULL,
	`application_id` int NOT NULL,
	`self_driven` boolean NOT NULL,
	PRIMARY KEY (`competency_id`)
);

CREATE TABLE IF NOT EXISTS `stage_3` (
	`job_clarity_id` int AUTO_INCREMENT NOT NULL,
	`job_details_read` boolean NOT NULL,
	`field_job_comfort` boolean NOT NULL,
	`monthly_targets` enum NOT NULL,
	`relocation` boolean NOT NULL,
	`application_id` int NOT NULL,
	`salary_comfort` boolean NOT NULL,
	PRIMARY KEY (`job_clarity_id`)
);

CREATE TABLE IF NOT EXISTS `stage_4` (
	`test_score` int NOT NULL,
	`passed` boolean NOT NULL,
	`aptitude_snapshot` text NOT NULL,
	`job_clarity_id` int AUTO_INCREMENT NOT NULL,
	`application_id` int NOT NULL,
	PRIMARY KEY (`job_clarity_id`)
);

CREATE TABLE IF NOT EXISTS `stage_5` (
	`experience_id` int AUTO_INCREMENT NOT NULL,
	`total_experience` int NOT NULL,
	`sales_experience` boolean NOT NULL,
	`evidence_uploaded` boolean NOT NULL,
	`experience_letter` boolean NOT NULL,
	`final_year_certificate` boolean NOT NULL,
	`application_id` int NOT NULL,
	PRIMARY KEY (`experience_id`)
);

CREATE TABLE IF NOT EXISTS `applications` (
	`application_id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`stage` int NOT NULL,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	`status` enum NOT NULL,
	PRIMARY KEY (`application_id`)
);


ALTER TABLE `stage_1` ADD CONSTRAINT `stage_1_fk1` FOREIGN KEY (`application_id`) REFERENCES `application`(`id`);
ALTER TABLE `stage_2` ADD CONSTRAINT `stage_2_fk6` FOREIGN KEY (`application_id`) REFERENCES `application`(`id`);
ALTER TABLE `stage_3` ADD CONSTRAINT `stage_3_fk5` FOREIGN KEY (`application_id`) REFERENCES `application`(`id`);
ALTER TABLE `stage_4` ADD CONSTRAINT `stage_4_fk4` FOREIGN KEY (`application_id`) REFERENCES `application`(`id`);
ALTER TABLE `stage_5` ADD CONSTRAINT `stage_5_fk6` FOREIGN KEY (`application_id`) REFERENCES `application`(`id`);
ALTER TABLE `applications` ADD CONSTRAINT `applications_fk1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);