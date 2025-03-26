-- Custom SQL migration file, put your code below! --
INSERT INTO
	public.users (login, "password", created_at, deleted)
VALUES
	(
		'admin',
		'$2b$10$r1mH/tCcxlz1M5IMLB1G2ON3TRjwMtyR9vKhdwvFoUYUvN2J/TXZe', --password: "qwerty123"
		'2025-03-26 12:42:51.723664',
		FALSE
	);

INSERT INTO
	public.contacts (
		lastname,
		firstname,
		patronymic,
		phone,
		email,
		created_at,
		updated_at,
		deleted
	)
VALUES
	(
		'Petrov',
		'Ivan',
		'Petrovich',
		'+74444447878',
		'petrov@example.com',
		'2025-03-26 12:46:17.144978',
		'2025-03-26 12:46:17.144978',
		FALSE
	),
	(
		'Ivanov',
		'Petr',
		'Ivanovich',
		'+5793939330',
		'ivanov@example.com',
		'2025-03-26 12:46:17.153121',
		'2025-03-26 12:46:17.153121',
		FALSE
	),
	(
		'Smirnova',
		'Maria',
		'Vadimirovna',
		'+7948492704',
		'maria_1997@example.com',
		'2025-03-26 12:46:17.158807',
		'2025-03-26 12:46:17.158807',
		FALSE
	),
	(
		'Family',
		'John',
		'Johnovich',
		'+98973493',
		'john@example.com',
		'2025-03-26 12:46:17.161641',
		'2025-03-26 12:46:17.161641',
		FALSE
	);

INSERT INTO
	public.companies (
		contact_id,
		"name",
		short_name,
		business_entity,
		"type",
		status,
		created_at,
		updated_at,
		address
	)
VALUES
	(
		1,
		'LLC Super Mega Company',
		'SMG',
		'LLC',
		'{''friends'',''partner''}',
		'active'::public."company_status",
		'2025-03-26 12:49:15.112971',
		'2025-03-26 12:49:15.112971',
		'usa'
	),
	(
		2,
		'LLC Super Mega Company Very',
		'SMGV',
		'LLC',
		'{''friends'',''partner''}',
		'active'::public."company_status",
		'2025-03-26 12:49:15.112',
		'2025-03-26 12:49:15.112',
		'australia'
	),
	(
		3,
		'LLC Super Mega Company Very 2',
		'SMGV2',
		'LLC',
		'{''friends'',''partner''}',
		'active'::public."company_status",
		'2025-03-26 12:49:15.112',
		'2025-03-26 12:49:15.112',
		'asia'
	),
	(
		4,
		'LLC Super Mega Company Very 3',
		'SMGV3',
		'LLC',
		'{''friends'',''partner''}',
		'active'::public."company_status",
		'2025-03-26 12:49:15.112',
		'2025-03-26 12:49:15.112',
		'europe'
	);

INSERT INTO
	public.contracts ("no", company_id, issue_date)
VALUES
	('100001', 1, '2026-04-22 21:28:14.931'),
	('100002', 2, '2026-04-22 21:28:14.931'),
	('100003', 3, '2026-04-22 21:28:14.931'),
	('100004', 4, '2026-04-22 21:28:14.931');

INSERT INTO
	public.photos (company_id, "name", filepath, thumbpath)
VALUES
	(
		1,
		'super_puper_photo_2',
		'super_puper_photo_2.jpg',
		'super_puper_photo_170x170_2.jpg'
	),
	(
		2,
		'super_puper_photo_4',
		'super_puper_photo_4.jpg',
		'super_puper_photo_170x170_4.jpg'
	),
	(
		3,
		'super_puper_photo_3',
		'super_puper_photo_3.jpg',
		'super_puper_photo_170x170_3.jpg'
	),
	(
		4,
		'super_puper_photo_1',
		'super_puper_photo_1.jpg',
		'super_puper_photo_170x170_1.jpg'
	);