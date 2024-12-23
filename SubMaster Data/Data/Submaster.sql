--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-07 21:10:24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 231 (class 1259 OID 25173)
-- Name: CustomerSubscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CustomerSubscriptions" (
    "Subscription_Id" integer NOT NULL,
    "User_Id" integer NOT NULL,
    "Plan_Id" integer NOT NULL,
    "Start_Date" timestamp with time zone NOT NULL,
    "End_Date" timestamp with time zone NOT NULL,
    "Status" text NOT NULL,
    "Payment_Status" text NOT NULL,
    "Payment_Method" text NOT NULL,
    "Discount_Applied" numeric,
    "Created_At" timestamp with time zone NOT NULL,
    "Updated_At" timestamp with time zone NOT NULL
);


ALTER TABLE public."CustomerSubscriptions" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 25172)
-- Name: CustomerSubscriptions_Subscription_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."CustomerSubscriptions" ALTER COLUMN "Subscription_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."CustomerSubscriptions_Subscription_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 25142)
-- Name: Feedbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Feedbacks" (
    "Feedback_Id" integer NOT NULL,
    "User_Id" integer NOT NULL,
    "Vendor_Id" integer NOT NULL,
    "Rating" integer NOT NULL,
    "Comments" text,
    "Submitted_At" timestamp with time zone NOT NULL,
    "Created_At" timestamp with time zone NOT NULL,
    "Updated_At" timestamp with time zone NOT NULL
);


ALTER TABLE public."Feedbacks" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 25141)
-- Name: Feedbacks_Feedback_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Feedbacks" ALTER COLUMN "Feedback_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Feedbacks_Feedback_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 239 (class 1259 OID 25235)
-- Name: Invoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Invoices" (
    "Invoice_Id" integer NOT NULL,
    "Payment_Id" integer NOT NULL,
    "Invoice_Number" character varying(50) NOT NULL,
    "Issue_Date" timestamp with time zone NOT NULL,
    "Due_Date" timestamp with time zone NOT NULL,
    "Created_At" timestamp with time zone NOT NULL,
    "Updated_At" timestamp with time zone NOT NULL,
    "Total_Amount" numeric NOT NULL
);


ALTER TABLE public."Invoices" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 25234)
-- Name: Invoices_Invoice_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Invoices" ALTER COLUMN "Invoice_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Invoices_Invoice_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 25116)
-- Name: Notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notifications" (
    "Notification_Id" integer NOT NULL,
    "User_Id" integer NOT NULL,
    "Notification_Type" text NOT NULL,
    "Message" text NOT NULL,
    "Status" text NOT NULL,
    "Created_At" timestamp with time zone NOT NULL,
    "Sent_At" timestamp with time zone,
    "Subject" character varying(255) NOT NULL,
    "Is_Email" boolean NOT NULL
);


ALTER TABLE public."Notifications" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25115)
-- Name: Notifications_Notification_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Notifications" ALTER COLUMN "Notification_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Notifications_Notification_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 233 (class 1259 OID 25191)
-- Name: Payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payments" (
    "Payment_Id" integer NOT NULL,
    "User_Id" integer NOT NULL,
    "Plan_Id" integer NOT NULL,
    "Amount" numeric NOT NULL,
    "Payment_Date" timestamp with time zone NOT NULL,
    "Payment_Method" text NOT NULL,
    "Transaction_Id" text NOT NULL,
    "Payment_Status" text NOT NULL
);


ALTER TABLE public."Payments" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 25190)
-- Name: Payments_Payment_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Payments" ALTER COLUMN "Payment_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Payments_Payment_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 235 (class 1259 OID 25209)
-- Name: Promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Promotions" (
    "Promotion_Id" integer NOT NULL,
    "Promotion_Code" character varying(50) NOT NULL,
    "Discount_Percentage" numeric NOT NULL,
    "Start_Date" timestamp with time zone NOT NULL,
    "End_Date" timestamp with time zone NOT NULL,
    "Usage_Limit" integer NOT NULL,
    "Created_At" timestamp with time zone NOT NULL,
    "Updated_At" timestamp with time zone NOT NULL,
    "Plan_Id" integer NOT NULL
);


ALTER TABLE public."Promotions" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 25208)
-- Name: Promotions_Promotion_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Promotions" ALTER COLUMN "Promotion_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Promotions_Promotion_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 25097)
-- Name: Roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Roles" (
    "Role_Id" integer NOT NULL,
    "Role_Name" character varying(50) NOT NULL
);


ALTER TABLE public."Roles" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25096)
-- Name: Roles_Role_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Roles" ALTER COLUMN "Role_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Roles_Role_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 237 (class 1259 OID 25222)
-- Name: SubscriptionHistories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SubscriptionHistories" (
    "History_Id" integer NOT NULL,
    "Plan_Id" integer NOT NULL,
    "Change_Type" text NOT NULL,
    "Old_Value" text,
    "New_Value" text,
    "Changed_At" timestamp with time zone NOT NULL,
    "Created_At" timestamp with time zone NOT NULL
);


ALTER TABLE public."SubscriptionHistories" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 25221)
-- Name: SubscriptionHistories_History_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."SubscriptionHistories" ALTER COLUMN "History_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."SubscriptionHistories_History_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 25160)
-- Name: SubscriptionPlans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SubscriptionPlans" (
    "Plan_Id" integer NOT NULL,
    "Vendor_Id" integer NOT NULL,
    "Plan_Name" character varying(255) NOT NULL,
    "Description" text,
    "Price" numeric NOT NULL,
    "Duration_In_Days" integer NOT NULL,
    "Features" text,
    "Is_Active" boolean NOT NULL,
    "Created_At" timestamp with time zone NOT NULL,
    "Updated_At" timestamp with time zone NOT NULL
);


ALTER TABLE public."SubscriptionPlans" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 25159)
-- Name: SubscriptionPlans_Plan_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."SubscriptionPlans" ALTER COLUMN "Plan_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."SubscriptionPlans_Plan_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 25103)
-- Name: UserAccounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserAccounts" (
    "User_Id" integer NOT NULL,
    "FirstName" character varying(100) NOT NULL,
    "LastName" character varying(100) NOT NULL,
    "Email" character varying(100) NOT NULL,
    "Password_Hash" text NOT NULL,
    "Role_Id" integer NOT NULL,
    "Phone_Number" text,
    "Address" text,
    "Profile_Picture_Url" text,
    "Date_Of_Birth" timestamp with time zone,
    "Status" text NOT NULL,
    "Created_At" timestamp with time zone NOT NULL,
    "Updated_At" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserAccounts" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25102)
-- Name: UserAccounts_User_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."UserAccounts" ALTER COLUMN "User_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."UserAccounts_User_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 25129)
-- Name: VendorProfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VendorProfiles" (
    "Vendor_Id" integer NOT NULL,
    "User_Id" integer NOT NULL,
    "Business_Name" character varying(255) NOT NULL,
    "Business_Description" text,
    "Business_Address" text,
    "Phone_Number" text,
    "Tax_Id" text,
    "Website_Url" text,
    "Social_Media_Links" text,
    "Logo_Url" text,
    "Created_At" timestamp with time zone NOT NULL,
    "Updated_At" timestamp with time zone NOT NULL
);


ALTER TABLE public."VendorProfiles" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 25128)
-- Name: VendorProfiles_Vendor_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."VendorProfiles" ALTER COLUMN "Vendor_Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."VendorProfiles_Vendor_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 25091)
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- TOC entry 4904 (class 0 OID 25173)
-- Dependencies: 231
-- Data for Name: CustomerSubscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomerSubscriptions" ("Subscription_Id", "User_Id", "Plan_Id", "Start_Date", "End_Date", "Status", "Payment_Status", "Payment_Method", "Discount_Applied", "Created_At", "Updated_At") FROM stdin;
\.


--
-- TOC entry 4900 (class 0 OID 25142)
-- Dependencies: 227
-- Data for Name: Feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Feedbacks" ("Feedback_Id", "User_Id", "Vendor_Id", "Rating", "Comments", "Submitted_At", "Created_At", "Updated_At") FROM stdin;
\.


--
-- TOC entry 4912 (class 0 OID 25235)
-- Dependencies: 239
-- Data for Name: Invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Invoices" ("Invoice_Id", "Payment_Id", "Invoice_Number", "Issue_Date", "Due_Date", "Created_At", "Updated_At", "Total_Amount") FROM stdin;
\.


--
-- TOC entry 4896 (class 0 OID 25116)
-- Dependencies: 223
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notifications" ("Notification_Id", "User_Id", "Notification_Type", "Message", "Status", "Created_At", "Sent_At", "Subject", "Is_Email") FROM stdin;
\.


--
-- TOC entry 4906 (class 0 OID 25191)
-- Dependencies: 233
-- Data for Name: Payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payments" ("Payment_Id", "User_Id", "Plan_Id", "Amount", "Payment_Date", "Payment_Method", "Transaction_Id", "Payment_Status") FROM stdin;
\.


--
-- TOC entry 4908 (class 0 OID 25209)
-- Dependencies: 235
-- Data for Name: Promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Promotions" ("Promotion_Id", "Promotion_Code", "Discount_Percentage", "Start_Date", "End_Date", "Usage_Limit", "Created_At", "Updated_At", "Plan_Id") FROM stdin;
\.


--
-- TOC entry 4892 (class 0 OID 25097)
-- Dependencies: 219
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Roles" ("Role_Id", "Role_Name") FROM stdin;
1	admin
2	user
\.


--
-- TOC entry 4910 (class 0 OID 25222)
-- Dependencies: 237
-- Data for Name: SubscriptionHistories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SubscriptionHistories" ("History_Id", "Plan_Id", "Change_Type", "Old_Value", "New_Value", "Changed_At", "Created_At") FROM stdin;
\.


--
-- TOC entry 4902 (class 0 OID 25160)
-- Dependencies: 229
-- Data for Name: SubscriptionPlans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SubscriptionPlans" ("Plan_Id", "Vendor_Id", "Plan_Name", "Description", "Price", "Duration_In_Days", "Features", "Is_Active", "Created_At", "Updated_At") FROM stdin;
1	1	Test	Test	999.99	30	Test	t	2024-12-07 19:14:36.181114+05:30	2024-12-07 19:14:36.181114+05:30
2	1	Test 1	Test 1	999.99	30	Test	t	2024-12-07 19:14:57.761502+05:30	2024-12-07 19:14:57.761502+05:30
\.


--
-- TOC entry 4894 (class 0 OID 25103)
-- Dependencies: 221
-- Data for Name: UserAccounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserAccounts" ("User_Id", "FirstName", "LastName", "Email", "Password_Hash", "Role_Id", "Phone_Number", "Address", "Profile_Picture_Url", "Date_Of_Birth", "Status", "Created_At", "Updated_At") FROM stdin;
3	Happy	Patel	happy@gmail.com	$2a$11$eEijx8OiYXdJI4FQIA5W3.JGzxVGWI7Q5hx1BdQtcJ48z/u7ALpIi	2	\N	\N	\N	\N	active	2024-11-08 12:21:43.68124+05:30	2024-11-08 12:21:43.681241+05:30
4	Test	1	test@gmail.com	$2a$11$M9nCo4O4sKsrII9UM.c1jed4qcK6QDng2rxFl0skiAD92hMDMhJ8a	2	\N	\N	\N	\N	active	2024-11-10 12:13:04.040597+05:30	2024-11-10 12:13:04.040597+05:30
5	Dhruvin	jariwala	dj@gmail.com	$2a$11$.LBBTDbEaACZ0L3/8pp1O.6YvVinsLm/Yx3HNRv9mwgPcc5yIu9B.	2	\N	\N	\N	\N	active	2024-11-12 13:38:37.175155+05:30	2024-11-12 13:38:37.175156+05:30
1	Meet	Mistry	mistrymeet6338@gmail.com	$2a$11$bvMzqqnYVrwxQfosWMrEpuedkekZgqNKl3fx8RuIUb.GtIuWimBnu	1	\N	\N	\N	\N	active	2024-11-08 12:08:55.114163+05:30	2024-11-08 12:08:55.114235+05:30
7	Parv	Patel	parv@gmail.com	$2a$11$kncDf4geQroVU3Hd5C8yvecXDLdFuBJ092/2QZ2yLSAvro9xKKjS6	2	\N	\N	\N	\N	active	2024-12-03 11:57:38.495564+05:30	2024-12-03 11:57:38.495564+05:30
2	Gunjan N	Mistry	gunjan@gmail.com	$2a$11$o9Kcx3Y2fL1sBo2Vm/n4ieP5tw3ndtWAGPXyljHWd.2i4Y6mcsH12	2	6353918120	Bilimora	string	2006-06-21 22:31:08.954+05:30	active	2024-12-04 22:31:08.954+05:30	2024-12-04 22:31:08.954+05:30
6	Meet	Mistry	nitin@gmail.com	$2a$11$c9QfkHJidjpf5TfTSm2IIuGR9OYIMNgNbFmwCV6LE8yFsnRy7DD.S	2	6353918121	Surat	\N	\N	active	2024-12-05 00:07:53.950688+05:30	2024-12-05 00:18:32.627464+05:30
\.


--
-- TOC entry 4898 (class 0 OID 25129)
-- Dependencies: 225
-- Data for Name: VendorProfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VendorProfiles" ("Vendor_Id", "User_Id", "Business_Name", "Business_Description", "Business_Address", "Phone_Number", "Tax_Id", "Website_Url", "Social_Media_Links", "Logo_Url", "Created_At", "Updated_At") FROM stdin;
1	6	GYM Business	Test	Surat	6353918120	TAX12345	https://example.com	https://twitter.com/example	https://example.com/logo.png	2024-12-05 02:09:43.82+05:30	2024-12-05 02:09:43.82+05:30
2	2	Test 1	Test	Surat	9925100927	TAX12345	https://example.com	https://twitter.com/example	https://example.com/logo.png	2024-12-05 10:45:08.843+05:30	2024-12-05 10:45:08.843+05:30
3	6	Test 2	test 2	Surat	9925100387	TAX12345	https://example.com	https://twitter.com/example	https://example.com/logo.png	2024-12-06 22:46:42.37+05:30	2024-12-06 22:46:42.37+05:30
5	6	Meet 1	Meet 1	Bilimora	6352415555	TAX12345	https://example.com	https://twitter.com/example	https://example.com/logo.png	2024-12-06 23:34:36.803+05:30	2024-12-06 23:34:36.803+05:30
\.


--
-- TOC entry 4890 (class 0 OID 25091)
-- Dependencies: 217
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20241108063717_SubMigration	8.0.10
\.


--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 230
-- Name: CustomerSubscriptions_Subscription_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CustomerSubscriptions_Subscription_Id_seq"', 1, false);


--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 226
-- Name: Feedbacks_Feedback_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Feedbacks_Feedback_Id_seq"', 1, false);


--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 238
-- Name: Invoices_Invoice_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Invoices_Invoice_Id_seq"', 1, false);


--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 222
-- Name: Notifications_Notification_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notifications_Notification_Id_seq"', 1, false);


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 232
-- Name: Payments_Payment_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Payments_Payment_Id_seq"', 1, false);


--
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 234
-- Name: Promotions_Promotion_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Promotions_Promotion_Id_seq"', 1, false);


--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 218
-- Name: Roles_Role_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Roles_Role_Id_seq"', 2, true);


--
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 236
-- Name: SubscriptionHistories_History_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SubscriptionHistories_History_Id_seq"', 1, false);


--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 228
-- Name: SubscriptionPlans_Plan_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SubscriptionPlans_Plan_Id_seq"', 2, true);


--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 220
-- Name: UserAccounts_User_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserAccounts_User_Id_seq"', 7, true);


--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 224
-- Name: VendorProfiles_Vendor_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VendorProfiles_Vendor_Id_seq"', 5, true);


--
-- TOC entry 4718 (class 2606 OID 25179)
-- Name: CustomerSubscriptions PK_CustomerSubscriptions; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerSubscriptions"
    ADD CONSTRAINT "PK_CustomerSubscriptions" PRIMARY KEY ("Subscription_Id");


--
-- TOC entry 4711 (class 2606 OID 25148)
-- Name: Feedbacks PK_Feedbacks; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedbacks"
    ADD CONSTRAINT "PK_Feedbacks" PRIMARY KEY ("Feedback_Id");


--
-- TOC entry 4731 (class 2606 OID 25241)
-- Name: Invoices PK_Invoices; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "PK_Invoices" PRIMARY KEY ("Invoice_Id");


--
-- TOC entry 4704 (class 2606 OID 25122)
-- Name: Notifications PK_Notifications; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "PK_Notifications" PRIMARY KEY ("Notification_Id");


--
-- TOC entry 4722 (class 2606 OID 25197)
-- Name: Payments PK_Payments; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payments"
    ADD CONSTRAINT "PK_Payments" PRIMARY KEY ("Payment_Id");


--
-- TOC entry 4725 (class 2606 OID 25215)
-- Name: Promotions PK_Promotions; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Promotions"
    ADD CONSTRAINT "PK_Promotions" PRIMARY KEY ("Promotion_Id");


--
-- TOC entry 4698 (class 2606 OID 25101)
-- Name: Roles PK_Roles; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "PK_Roles" PRIMARY KEY ("Role_Id");


--
-- TOC entry 4728 (class 2606 OID 25228)
-- Name: SubscriptionHistories PK_SubscriptionHistories; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SubscriptionHistories"
    ADD CONSTRAINT "PK_SubscriptionHistories" PRIMARY KEY ("History_Id");


--
-- TOC entry 4714 (class 2606 OID 25166)
-- Name: SubscriptionPlans PK_SubscriptionPlans; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SubscriptionPlans"
    ADD CONSTRAINT "PK_SubscriptionPlans" PRIMARY KEY ("Plan_Id");


--
-- TOC entry 4701 (class 2606 OID 25109)
-- Name: UserAccounts PK_UserAccounts; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserAccounts"
    ADD CONSTRAINT "PK_UserAccounts" PRIMARY KEY ("User_Id");


--
-- TOC entry 4707 (class 2606 OID 25135)
-- Name: VendorProfiles PK_VendorProfiles; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendorProfiles"
    ADD CONSTRAINT "PK_VendorProfiles" PRIMARY KEY ("Vendor_Id");


--
-- TOC entry 4696 (class 2606 OID 25095)
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- TOC entry 4715 (class 1259 OID 25247)
-- Name: IX_CustomerSubscriptions_Plan_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerSubscriptions_Plan_Id" ON public."CustomerSubscriptions" USING btree ("Plan_Id");


--
-- TOC entry 4716 (class 1259 OID 25248)
-- Name: IX_CustomerSubscriptions_User_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerSubscriptions_User_Id" ON public."CustomerSubscriptions" USING btree ("User_Id");


--
-- TOC entry 4708 (class 1259 OID 25249)
-- Name: IX_Feedbacks_User_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Feedbacks_User_Id" ON public."Feedbacks" USING btree ("User_Id");


--
-- TOC entry 4709 (class 1259 OID 25250)
-- Name: IX_Feedbacks_Vendor_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Feedbacks_Vendor_Id" ON public."Feedbacks" USING btree ("Vendor_Id");


--
-- TOC entry 4729 (class 1259 OID 25251)
-- Name: IX_Invoices_Payment_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Invoices_Payment_Id" ON public."Invoices" USING btree ("Payment_Id");


--
-- TOC entry 4702 (class 1259 OID 25252)
-- Name: IX_Notifications_User_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Notifications_User_Id" ON public."Notifications" USING btree ("User_Id");


--
-- TOC entry 4719 (class 1259 OID 25253)
-- Name: IX_Payments_Plan_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Payments_Plan_Id" ON public."Payments" USING btree ("Plan_Id");


--
-- TOC entry 4720 (class 1259 OID 25254)
-- Name: IX_Payments_User_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Payments_User_Id" ON public."Payments" USING btree ("User_Id");


--
-- TOC entry 4723 (class 1259 OID 25255)
-- Name: IX_Promotions_Plan_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Promotions_Plan_Id" ON public."Promotions" USING btree ("Plan_Id");


--
-- TOC entry 4726 (class 1259 OID 25256)
-- Name: IX_SubscriptionHistories_Plan_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_SubscriptionHistories_Plan_Id" ON public."SubscriptionHistories" USING btree ("Plan_Id");


--
-- TOC entry 4712 (class 1259 OID 25257)
-- Name: IX_SubscriptionPlans_Vendor_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_SubscriptionPlans_Vendor_Id" ON public."SubscriptionPlans" USING btree ("Vendor_Id");


--
-- TOC entry 4699 (class 1259 OID 25258)
-- Name: IX_UserAccounts_Role_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_UserAccounts_Role_Id" ON public."UserAccounts" USING btree ("Role_Id");


--
-- TOC entry 4705 (class 1259 OID 25259)
-- Name: IX_VendorProfiles_User_Id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_VendorProfiles_User_Id" ON public."VendorProfiles" USING btree ("User_Id");


--
-- TOC entry 4738 (class 2606 OID 25180)
-- Name: CustomerSubscriptions FK_CustomerSubscriptions_SubscriptionPlans_Plan_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerSubscriptions"
    ADD CONSTRAINT "FK_CustomerSubscriptions_SubscriptionPlans_Plan_Id" FOREIGN KEY ("Plan_Id") REFERENCES public."SubscriptionPlans"("Plan_Id") ON DELETE CASCADE;


--
-- TOC entry 4739 (class 2606 OID 25185)
-- Name: CustomerSubscriptions FK_CustomerSubscriptions_UserAccounts_User_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerSubscriptions"
    ADD CONSTRAINT "FK_CustomerSubscriptions_UserAccounts_User_Id" FOREIGN KEY ("User_Id") REFERENCES public."UserAccounts"("User_Id") ON DELETE CASCADE;


--
-- TOC entry 4735 (class 2606 OID 25149)
-- Name: Feedbacks FK_Feedbacks_UserAccounts_User_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedbacks"
    ADD CONSTRAINT "FK_Feedbacks_UserAccounts_User_Id" FOREIGN KEY ("User_Id") REFERENCES public."UserAccounts"("User_Id") ON DELETE CASCADE;


--
-- TOC entry 4736 (class 2606 OID 25154)
-- Name: Feedbacks FK_Feedbacks_VendorProfiles_Vendor_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedbacks"
    ADD CONSTRAINT "FK_Feedbacks_VendorProfiles_Vendor_Id" FOREIGN KEY ("Vendor_Id") REFERENCES public."VendorProfiles"("Vendor_Id") ON DELETE CASCADE;


--
-- TOC entry 4744 (class 2606 OID 25242)
-- Name: Invoices FK_Invoices_Payments_Payment_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "FK_Invoices_Payments_Payment_Id" FOREIGN KEY ("Payment_Id") REFERENCES public."Payments"("Payment_Id") ON DELETE CASCADE;


--
-- TOC entry 4733 (class 2606 OID 25123)
-- Name: Notifications FK_Notifications_UserAccounts_User_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "FK_Notifications_UserAccounts_User_Id" FOREIGN KEY ("User_Id") REFERENCES public."UserAccounts"("User_Id") ON DELETE CASCADE;


--
-- TOC entry 4740 (class 2606 OID 25198)
-- Name: Payments FK_Payments_SubscriptionPlans_Plan_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payments"
    ADD CONSTRAINT "FK_Payments_SubscriptionPlans_Plan_Id" FOREIGN KEY ("Plan_Id") REFERENCES public."SubscriptionPlans"("Plan_Id") ON DELETE CASCADE;


--
-- TOC entry 4741 (class 2606 OID 25203)
-- Name: Payments FK_Payments_UserAccounts_User_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payments"
    ADD CONSTRAINT "FK_Payments_UserAccounts_User_Id" FOREIGN KEY ("User_Id") REFERENCES public."UserAccounts"("User_Id") ON DELETE CASCADE;


--
-- TOC entry 4742 (class 2606 OID 25216)
-- Name: Promotions FK_Promotions_SubscriptionPlans_Plan_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Promotions"
    ADD CONSTRAINT "FK_Promotions_SubscriptionPlans_Plan_Id" FOREIGN KEY ("Plan_Id") REFERENCES public."SubscriptionPlans"("Plan_Id") ON DELETE CASCADE;


--
-- TOC entry 4743 (class 2606 OID 25229)
-- Name: SubscriptionHistories FK_SubscriptionHistories_SubscriptionPlans_Plan_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SubscriptionHistories"
    ADD CONSTRAINT "FK_SubscriptionHistories_SubscriptionPlans_Plan_Id" FOREIGN KEY ("Plan_Id") REFERENCES public."SubscriptionPlans"("Plan_Id") ON DELETE CASCADE;


--
-- TOC entry 4737 (class 2606 OID 25167)
-- Name: SubscriptionPlans FK_SubscriptionPlans_VendorProfiles_Vendor_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SubscriptionPlans"
    ADD CONSTRAINT "FK_SubscriptionPlans_VendorProfiles_Vendor_Id" FOREIGN KEY ("Vendor_Id") REFERENCES public."VendorProfiles"("Vendor_Id") ON DELETE CASCADE;


--
-- TOC entry 4732 (class 2606 OID 25110)
-- Name: UserAccounts FK_UserAccounts_Roles_Role_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserAccounts"
    ADD CONSTRAINT "FK_UserAccounts_Roles_Role_Id" FOREIGN KEY ("Role_Id") REFERENCES public."Roles"("Role_Id") ON DELETE CASCADE;


--
-- TOC entry 4734 (class 2606 OID 25136)
-- Name: VendorProfiles FK_VendorProfiles_UserAccounts_User_Id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendorProfiles"
    ADD CONSTRAINT "FK_VendorProfiles_UserAccounts_User_Id" FOREIGN KEY ("User_Id") REFERENCES public."UserAccounts"("User_Id") ON DELETE CASCADE;


-- Completed on 2024-12-07 21:10:24

--
-- PostgreSQL database dump complete
--

