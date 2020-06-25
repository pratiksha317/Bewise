-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2020 at 11:58 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `a_bwise`
--

-- --------------------------------------------------------

--
-- Table structure for table `bw_board_edu`
--

CREATE TABLE `bw_board_edu` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_board_edu`
--

INSERT INTO `bw_board_edu` (`id`, `name`, `status`, `created_date`) VALUES
(1, 'State Board', 1, '2020-06-22 19:01:07'),
(2, 'Matriculation', 1, '2020-06-22 19:01:07'),
(3, 'ISCE', 1, '2020-06-22 19:01:07'),
(4, 'CBSE', 1, '2020-06-22 19:01:07');

-- --------------------------------------------------------

--
-- Table structure for table `bw_category`
--

CREATE TABLE `bw_category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(200) NOT NULL,
  `is_parent` tinyint(4) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_category`
--

INSERT INTO `bw_category` (`category_id`, `category_name`, `is_parent`, `status`, `parent_id`, `created_date`, `updated_date`) VALUES
(1, 'Schools', 1, 1, 0, '2020-06-22 16:19:52', '2020-06-22 16:19:52'),
(2, 'Pre-Schools', 1, 1, 0, '2020-06-22 16:19:52', '2020-06-22 16:19:52'),
(3, 'Play Areas', 1, 1, 0, '2020-06-22 16:55:00', '2020-06-22 16:55:00'),
(4, 'Hobbies & Interests', 1, 1, 0, '2020-06-22 16:55:00', '2020-06-22 16:55:00'),
(5, 'Play Areas', 1, 1, 0, '2020-06-22 16:55:00', '2020-06-22 16:55:00'),
(6, 'Tutions', 1, 1, 0, '2020-06-22 16:55:00', '2020-06-22 16:55:00'),
(7, 'Events & Celebrations', 1, 1, 0, '2020-06-22 16:55:00', '2020-06-22 16:55:00'),
(8, 'Seasonal Camps', 1, 1, 0, '2020-06-22 16:55:00', '2020-06-22 16:55:00'),
(9, 'Boarding', 0, 1, 1, '2020-06-22 20:51:48', '2020-06-22 20:51:48'),
(10, 'Home Schools', 0, 1, 1, '2020-06-22 20:51:48', '2020-06-22 20:51:48'),
(11, 'IB', 0, 1, 1, '2020-06-22 20:54:16', '2020-06-22 20:54:16'),
(12, 'Public Schools', 0, 1, 1, '2020-06-22 20:54:16', '2020-06-22 20:54:16'),
(13, 'IGCSE', 0, 1, 1, '2020-06-22 20:55:22', '2020-06-22 20:55:22'),
(14, 'CBSE', 0, 1, 1, '2020-06-22 20:55:22', '2020-06-22 20:55:22'),
(15, 'Special Needs', 0, 1, 1, '2020-06-22 20:55:22', '2020-06-22 20:55:22'),
(16, 'Kindergarten', 0, 1, 2, '2020-06-22 20:55:53', '2020-06-22 20:55:53'),
(17, 'Montessori', 0, 1, 2, '2020-06-22 20:55:53', '2020-06-22 20:55:53'),
(18, 'Play Group', 0, 1, 2, '2020-06-22 20:56:57', '2020-06-22 20:56:57'),
(19, 'Day Care', 0, 1, 2, '2020-06-22 20:56:57', '2020-06-22 20:56:57'),
(20, 'Special Needs', 0, 1, 2, '2020-06-22 20:56:57', '2020-06-22 20:56:57'),
(21, 'Home Schools', 0, 1, 2, '2020-06-22 20:56:57', '2020-06-22 20:56:57'),
(22, '0 - 3 Years', 0, 1, 3, '2020-06-22 20:57:42', '2020-06-22 20:57:42'),
(23, '4 - 8  Years', 0, 1, 3, '2020-06-22 20:57:42', '2020-06-22 20:57:42'),
(24, '9 - 12 Years', 0, 1, 3, '2020-06-22 20:58:22', '2020-06-22 20:58:22'),
(25, '13 - 15 Years', 0, 1, 3, '2020-06-22 20:58:22', '2020-06-22 20:58:22'),
(26, 'Sports', 1, 1, 4, '2020-06-22 21:00:23', '2020-06-22 21:00:23'),
(27, 'Music', 1, 1, 4, '2020-06-22 21:00:23', '2020-06-22 21:00:23'),
(28, 'Dance', 1, 1, 4, '2020-06-22 21:03:01', '2020-06-22 21:03:01'),
(29, 'Art & Drawing', 0, 1, 4, '2020-06-22 21:03:01', '2020-06-22 21:03:01'),
(30, 'Yoga', 0, 1, 4, '2020-06-22 21:03:01', '2020-06-22 21:03:01'),
(31, 'Metal Math', 1, 1, 4, '2020-06-22 21:03:01', '2020-06-22 21:03:01'),
(32, 'Cultural Learning', 1, 1, 4, '2020-06-22 21:03:01', '2020-06-22 21:03:01'),
(33, 'Football', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(34, 'Tennis', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(35, 'Cricket', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(36, 'Swmming', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(37, 'Hockey', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(38, 'Batminton', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(39, 'Gymnastics', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(40, 'Athletics & Running', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(41, 'Boxing & Wresting', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(42, 'Marshall Arts', 1, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(43, 'Treking & Rock Climbing', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(44, 'Billards & Snooker', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(45, 'Chess', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(46, 'Basket Ball', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(47, 'Golf', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(48, 'Archery', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(49, 'Go Karting', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(50, 'Skating', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(51, 'Table Tennis', 0, 1, 26, '2020-06-22 21:17:59', '2020-06-22 21:17:59'),
(52, 'Karate', 0, 1, 42, '2020-06-22 21:20:23', '2020-06-22 21:20:23'),
(53, 'Judo', 0, 1, 42, '2020-06-22 21:20:23', '2020-06-22 21:20:23'),
(54, 'Taekwando', 0, 1, 42, '2020-06-22 21:20:23', '2020-06-22 21:20:23'),
(55, 'Mixed Marshall Arts', 0, 1, 42, '2020-06-22 21:20:23', '2020-06-22 21:20:23'),
(56, 'Others', 0, 1, 42, '2020-06-22 21:20:23', '2020-06-22 21:20:23'),
(57, 'Vocal', 1, 1, 27, '2020-06-22 21:23:18', '2020-06-22 21:23:18'),
(58, 'Instrumental', 1, 1, 27, '2020-06-22 21:23:18', '2020-06-22 21:23:18'),
(59, 'Classical', 1, 1, 57, '2020-06-22 21:25:14', '2020-06-22 21:25:14'),
(60, 'Hindustani', 0, 1, 59, '2020-06-22 21:25:14', '2020-06-22 21:25:14'),
(61, 'Folk', 0, 1, 59, '2020-06-22 21:25:14', '2020-06-22 21:25:14'),
(62, 'Western', 0, 1, 59, '2020-06-22 21:25:14', '2020-06-22 21:25:14'),
(63, 'Others', 0, 1, 59, '2020-06-22 21:25:14', '2020-06-22 21:25:14'),
(64, 'Guitar', 1, 1, 58, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(65, 'Violin', 1, 1, 58, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(66, 'Veena', 0, 1, 58, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(67, 'Mrudangam', 0, 1, 58, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(68, 'Drums & Percussion', 0, 1, 58, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(69, 'Flute/ Recorder', 0, 1, 58, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(70, 'Saxephone', 0, 1, 58, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(71, 'Piano', 0, 1, 58, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(72, 'Key Board', 0, 1, 58, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(73, 'Others', 0, 1, 58, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(74, 'Indian / Western', 0, 1, 64, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(75, 'Indian / Western', 0, 1, 65, '2020-06-22 21:31:15', '2020-06-22 21:31:15'),
(76, 'Indian Style', 1, 1, 28, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(77, 'Western Style', 1, 1, 28, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(78, 'Bharat Natyam', 0, 1, 76, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(79, 'Kuchupudi', 0, 1, 76, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(80, 'Oddisi', 0, 1, 76, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(81, 'Kathak', 0, 1, 76, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(82, 'Bollywood', 0, 1, 76, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(83, 'Others', 0, 1, 76, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(84, 'Ballet', 0, 1, 77, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(85, 'Hollywood', 0, 1, 77, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(86, 'Others', 0, 1, 77, '2020-06-22 21:35:04', '2020-06-22 21:35:04'),
(87, 'Abbacus', 0, 1, 31, '2020-06-22 21:37:37', '2020-06-22 21:37:37'),
(88, 'Kumon', 0, 1, 31, '2020-06-22 21:37:37', '2020-06-22 21:37:37'),
(89, 'Vedic Math', 0, 1, 31, '2020-06-22 21:37:37', '2020-06-22 21:37:37'),
(90, 'Others', 0, 1, 31, '2020-06-22 21:37:37', '2020-06-22 21:37:37'),
(91, 'Balvhar', 0, 1, 32, '2020-06-22 21:37:37', '2020-06-22 21:37:37'),
(92, 'Shloka Classes', 0, 1, 32, '2020-06-22 21:37:37', '2020-06-22 21:37:37'),
(93, 'Others', 0, 1, 32, '2020-06-22 21:37:37', '2020-06-22 21:37:37'),
(94, 'Maths', 0, 1, 6, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(95, 'Biology', 0, 1, 6, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(96, 'Physics', 0, 1, 6, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(97, 'Chemistry', 0, 1, 6, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(98, 'Economics', 0, 1, 6, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(99, 'Business Studies', 0, 1, 6, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(100, 'Others', 0, 1, 6, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(101, 'Languages', 1, 1, 6, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(102, 'French', 0, 1, 101, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(103, 'Spanish', 0, 1, 101, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(104, 'Mandarin', 0, 1, 101, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(105, 'Telugu', 0, 1, 101, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(106, 'Kannada', 0, 1, 101, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(107, 'Sanskrit', 0, 1, 101, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(108, 'Marati', 0, 1, 101, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(109, 'Hindi', 0, 1, 101, '2020-06-22 21:43:44', '2020-06-22 21:43:44'),
(110, 'Venue', 1, 1, 7, '2020-06-22 21:47:05', '2020-06-22 21:47:05'),
(111, 'Cakes', 0, 1, 7, '2020-06-22 21:47:05', '2020-06-22 21:47:05'),
(112, 'Entertainers', 0, 1, 7, '2020-06-22 21:47:05', '2020-06-22 21:47:05'),
(113, 'Party Need Suppliers', 0, 1, 7, '2020-06-22 21:47:05', '2020-06-22 21:47:05'),
(114, '0 - 25 Invitees', 0, 1, 110, '2020-06-22 21:47:05', '2020-06-22 21:47:05'),
(115, '50 - 100 Invitees', 0, 1, 110, '2020-06-22 21:47:05', '2020-06-22 21:47:05'),
(116, '100+ Invitees', 0, 1, 110, '2020-06-22 21:47:05', '2020-06-22 21:47:05'),
(117, '0 - 3 Years', 0, 1, 8, '2020-06-22 21:48:27', '2020-06-22 21:48:27'),
(118, '4- 8 Years', 0, 1, 8, '2020-06-22 21:48:27', '2020-06-22 21:48:27'),
(119, '9 - 12 Years', 0, 1, 8, '2020-06-22 21:48:27', '2020-06-22 21:48:27'),
(120, '13 - 15 Years', 0, 1, 8, '2020-06-22 21:48:27', '2020-06-22 21:48:27'),
(121, 'Advice &  Community help', 1, 1, 0, '2020-06-22 16:55:00', '2020-06-22 16:55:00'),
(122, 'Counselor', 0, 1, 121, '2020-06-22 21:56:19', '2020-06-22 21:56:19'),
(123, 'Nannies', 1, 1, 121, '2020-06-22 21:56:19', '2020-06-22 21:56:19'),
(124, 'Expert Opinon & Blogs', 0, 1, 121, '2020-06-22 21:56:19', '2020-06-22 21:56:19'),
(125, 'Post your Querry', 0, 1, 121, '2020-06-22 21:56:19', '2020-06-22 21:56:19'),
(126, '0 - 3 Y', 1, 1, 123, '2020-06-22 21:56:19', '2020-06-22 21:56:19'),
(127, '4 - 8  Y', 0, 1, 121, '2020-06-22 21:56:19', '2020-06-22 21:56:19'),
(128, 'Part Time', 0, 1, 126, '2020-06-22 21:56:19', '2020-06-22 21:56:19'),
(129, 'Full time', 0, 1, 126, '2020-06-22 21:56:19', '2020-06-22 21:56:19'),
(130, 'Part Time', 0, 1, 127, '2020-06-22 21:56:19', '2020-06-22 21:56:19'),
(131, 'Full time', 0, 1, 127, '2020-06-22 21:56:19', '2020-06-22 21:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `bw_class_freq`
--

CREATE TABLE `bw_class_freq` (
  `id` int(11) NOT NULL,
  `freq_name` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_class_freq`
--

INSERT INTO `bw_class_freq` (`id`, `freq_name`, `status`, `created_date`) VALUES
(1, 'Daily', 1, '2020-06-22 18:50:24'),
(2, 'Weekly', 1, '2020-06-22 18:50:24'),
(3, 'Monthly', 1, '2020-06-22 18:50:24');

-- --------------------------------------------------------

--
-- Table structure for table `bw_docs`
--

CREATE TABLE `bw_docs` (
  `id` int(11) NOT NULL,
  `document_name` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bw_docs`
--

INSERT INTO `bw_docs` (`id`, `document_name`, `status`, `created_date`) VALUES
(1, 'Birth Certificate', 1, '2020-06-22 20:37:48'),
(2, 'Residential Proof', 1, '2020-06-22 20:37:48');

-- --------------------------------------------------------

--
-- Table structure for table `bw_edu_sys`
--

CREATE TABLE `bw_edu_sys` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_edu_sys`
--

INSERT INTO `bw_edu_sys` (`id`, `name`, `status`, `created_date`) VALUES
(1, 'Co-Ed', 1, '2020-06-22 19:04:49'),
(2, 'Boys', 1, '2020-06-22 19:04:49'),
(3, 'Girls', 1, '2020-06-22 19:04:49');

-- --------------------------------------------------------

--
-- Table structure for table `bw_events`
--

CREATE TABLE `bw_events` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `registration_no` varchar(100) NOT NULL,
  `venue_name` varchar(100) NOT NULL,
  `contact_person` varchar(100) NOT NULL,
  `sub_categories` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `fax_number` varchar(20) NOT NULL,
  `state` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `about` text NOT NULL,
  `google_location` text NOT NULL,
  `food` varchar(100) NOT NULL,
  `hall_type` int(11) NOT NULL,
  `hall_capcity` varchar(100) NOT NULL,
  `dinning_capacity` varchar(100) NOT NULL,
  `car_parking_slot` int(11) NOT NULL,
  `two_parking_slot` int(11) NOT NULL,
  `event_fee` float NOT NULL,
  `facebook` varchar(100) NOT NULL,
  `twitter` varchar(100) NOT NULL,
  `est_year` varchar(50) NOT NULL,
  `prod_service` text NOT NULL,
  `mod_payment` int(11) NOT NULL,
  `po_flov` varchar(100) NOT NULL,
  `flov` varchar(100) NOT NULL,
  `price_range` varchar(100) NOT NULL,
  `images` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_events`
--

INSERT INTO `bw_events` (`id`, `vendor_id`, `registration_no`, `venue_name`, `contact_person`, `sub_categories`, `email_id`, `phone_number`, `fax_number`, `state`, `location`, `address`, `country`, `pincode`, `about`, `google_location`, `food`, `hall_type`, `hall_capcity`, `dinning_capacity`, `car_parking_slot`, `two_parking_slot`, `event_fee`, `facebook`, `twitter`, `est_year`, `prod_service`, `mod_payment`, `po_flov`, `flov`, `price_range`, `images`, `status`, `created_date`, `updated_date`) VALUES
(1, 0, '123467', 'XYZ', 'Jhon', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 'veg', 2, '200', '150', 100, 150, 1000, 'www.facebook.com', 'www.twitter.com', '1990', 'yes', 2, 'yes', 'yes', '200', 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 0, '123467', 'XYZ', 'Jhon', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 'veg', 2, '200', '150', 100, 150, 1000, 'www.facebook.com', 'www.twitter.com', '1990', 'yes', 2, 'yes', 'yes', '200', 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 0, '123467', 'XYZ', 'Jhon', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 'veg', 2, '200', '150', 100, 150, 1000, 'www.facebook.com', 'www.twitter.com', '1990', 'yes', 2, 'yes', 'yes', '200', 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bw_facilities`
--

CREATE TABLE `bw_facilities` (
  `id` int(11) NOT NULL,
  `facility` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_facilities`
--

INSERT INTO `bw_facilities` (`id`, `facility`, `status`, `created_date`) VALUES
(1, 'CCTV', 1, '2020-06-22 18:58:20'),
(2, 'AC Classes', 1, '2020-06-22 18:58:20'),
(3, 'Transportation', 1, '2020-06-22 18:58:20'),
(4, 'Food and Snacks', 1, '2020-06-22 18:58:20'),
(5, 'Outdoor Playarea', 1, '2020-06-22 18:58:20');

-- --------------------------------------------------------

--
-- Table structure for table `bw_gallery`
--

CREATE TABLE `bw_gallery` (
  `gallery_id` int(11) NOT NULL,
  `image_org` varchar(100) NOT NULL,
  `image_thumb` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `ref_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bw_hobby_interest`
--

CREATE TABLE `bw_hobby_interest` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `registration_no` varchar(100) NOT NULL,
  `academy_name` varchar(100) NOT NULL,
  `sub_categories` varchar(100) NOT NULL,
  `sub_types` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `fax_number` varchar(20) NOT NULL,
  `state` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `about` text NOT NULL,
  `google_location` text NOT NULL,
  `clss_freq` int(11) NOT NULL,
  `opening_time` int(11) NOT NULL,
  `mode_of_payment` int(11) NOT NULL,
  `no_teacher` int(11) NOT NULL,
  `est_year` varchar(50) NOT NULL,
  `avg_fee` float NOT NULL,
  `admit_fee` float NOT NULL,
  `admit_link` text NOT NULL,
  `images` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_hobby_interest`
--

INSERT INTO `bw_hobby_interest` (`id`, `vendor_id`, `registration_no`, `academy_name`, `sub_categories`, `sub_types`, `email_id`, `phone_number`, `fax_number`, `state`, `location`, `address`, `country`, `pincode`, `about`, `google_location`, `clss_freq`, `opening_time`, `mode_of_payment`, `no_teacher`, `est_year`, `avg_fee`, `admit_fee`, `admit_link`, `images`, `status`, `created_date`, `updated_date`) VALUES
(1, 0, '123467', 'XYZ', '2', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 3, 2, 2, 3, '1990', 1000, 1000, 'info@admission.co', 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 0, '123467', 'XYZ', '2', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 3, 2, 2, 3, '1990', 1000, 1000, 'info@admission.co', 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 0, '123467', 'XYZ', '2', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 3, 2, 2, 3, '1990', 1000, 1000, 'info@admission.co', 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bw_payment_type`
--

CREATE TABLE `bw_payment_type` (
  `id` int(11) NOT NULL,
  `payment_name` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_payment_type`
--

INSERT INTO `bw_payment_type` (`id`, `payment_name`, `status`, `created_date`) VALUES
(1, 'Cash', 1, '2020-06-22 18:48:26'),
(2, 'Card', 1, '2020-06-22 18:48:26'),
(3, 'Cheque', 1, '2020-06-22 18:48:26'),
(4, 'Online Payments', 1, '2020-06-22 18:48:26');

-- --------------------------------------------------------

--
-- Table structure for table `bw_play_area`
--

CREATE TABLE `bw_play_area` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `registration_no` varchar(100) NOT NULL,
  `owner_name` varchar(100) NOT NULL,
  `organisation_name` varchar(100) NOT NULL,
  `sub_categories` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `land_line` varchar(20) NOT NULL,
  `fax_number` varchar(20) NOT NULL,
  `state` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `area` text NOT NULL,
  `address` text NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `about` text NOT NULL,
  `google_location` text NOT NULL,
  `facilites` varchar(100) NOT NULL,
  `opening_time` int(11) NOT NULL,
  `mode_of_payment` int(11) NOT NULL,
  `no_teacher` int(11) NOT NULL,
  `est_year` varchar(50) NOT NULL,
  `entry_fee` float NOT NULL,
  `images` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` date NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_play_area`
--

INSERT INTO `bw_play_area` (`id`, `vendor_id`, `registration_no`, `owner_name`, `organisation_name`, `sub_categories`, `email_id`, `phone_number`, `land_line`, `fax_number`, `state`, `location`, `area`, `address`, `country`, `pincode`, `about`, `google_location`, `facilites`, `opening_time`, `mode_of_payment`, `no_teacher`, `est_year`, `entry_fee`, `images`, `status`, `created_date`, `updated_date`) VALUES
(1, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '080-35129', '345678', 'karnataka', 'bangalore', 'H.S.R layout', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', '2,1', 2, 2, 3, '1990', 1000, 'sample.jpg', 0, '0000-00-00', '0000-00-00 00:00:00'),
(2, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '080-35129', '345678', 'karnataka', 'bangalore', 'H.S.R layout', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', '2,1', 2, 2, 3, '1990', 1000, 'sample.jpg', 0, '0000-00-00', '0000-00-00 00:00:00'),
(3, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '080-35129', '345678', 'karnataka', 'bangalore', 'H.S.R layout', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', '2,1', 2, 2, 3, '1990', 1000, 'sample.jpg', 0, '0000-00-00', '0000-00-00 00:00:00'),
(4, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '080-35129', '345678', 'karnataka', 'bangalore', 'H.S.R layout', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', '2,1', 2, 2, 3, '1990', 1000, 'sample.jpg', 0, '0000-00-00', '0000-00-00 00:00:00'),
(5, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '080-35129', '345678', 'karnataka', 'bangalore', 'H.S.R layout', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', '2,1', 2, 2, 3, '1990', 1000, 'sample.jpg', 0, '0000-00-00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bw_pre_schools`
--

CREATE TABLE `bw_pre_schools` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `registration_no` varchar(100) NOT NULL,
  `owner_name` varchar(100) NOT NULL,
  `organisation_name` varchar(100) NOT NULL,
  `sub_categories` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `fax_number` varchar(20) NOT NULL,
  `state` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `about` text NOT NULL,
  `google_location` text NOT NULL,
  `school_type` int(11) NOT NULL,
  `edu_type` int(11) NOT NULL,
  `grade_from` int(11) NOT NULL,
  `grade_to` int(11) NOT NULL,
  `timing` int(11) NOT NULL,
  `paymnet` varchar(100) NOT NULL,
  `min_age` varchar(10) NOT NULL,
  `language` varchar(100) NOT NULL,
  `est_year` varchar(50) NOT NULL,
  `amenities` varchar(100) NOT NULL,
  `avg_fee` float NOT NULL,
  `other_fee` float NOT NULL,
  `admit_fee` float NOT NULL,
  `is_refund` tinyint(4) NOT NULL DEFAULT 0,
  `images` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_pre_schools`
--

INSERT INTO `bw_pre_schools` (`id`, `vendor_id`, `registration_no`, `owner_name`, `organisation_name`, `sub_categories`, `email_id`, `phone_number`, `fax_number`, `state`, `location`, `address`, `country`, `pincode`, `about`, `google_location`, `school_type`, `edu_type`, `grade_from`, `grade_to`, `timing`, `paymnet`, `min_age`, `language`, `est_year`, `amenities`, `avg_fee`, `other_fee`, `admit_fee`, `is_refund`, `images`, `status`, `created_date`, `updated_date`) VALUES
(1, 1, '73BDF', 'Jhon', 'ABC Preschool', '11,10', 'jhon@gmail.com', '7019079175', '789456', 'Karnataka', 'Bangalore', 'H.S.R layout', 'India', '52700', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used before final copy is available, but it may also be used to temporarily replace copy in a process called greeking, which allows designers to consider form without the meaning of the text influencing the design.\r\n\r\n', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.235377912713!2d76.69632141480628!3d11.390443091906663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe4b76896a9ff16eb!2sSterling%20Ooty%20Fern%20Hill%20-%20Resorts%20and%20Hotels!5e0!3m2!1sen!2sin!4v1592883187821!5m2!1sen!2sin', 1, 2, 1, 10, 2, '1', '12', 'English', '1990', '1,2,3', 20000, 3000, 2000, 0, 'sample.jpg', 1, '2020-06-01 15:30:02', '2020-06-02 15:30:02'),
(2, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 2, 4, 2, 12, 2, '2', '3', 'English', '1990', '1,2,3', 20000, 3000, 200, 0, 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 2, 4, 2, 12, 2, '2', '3', 'English', '1990', '1,2,3', 20000, 3000, 200, 0, 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 2, 4, 2, 12, 2, '2', '3', 'English', '1990', '1,2,3', 20000, 3000, 200, 0, 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 2, 4, 2, 12, 2, '2', '3', 'English', '1990', '1,2,3', 20000, 3000, 200, 0, 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 2, 4, 2, 12, 2, '2', '3', 'English', '1990', '1,2,3', 20000, 3000, 200, 0, 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 2, 4, 2, 12, 2, '2', '3', 'English', '1990', '1,2,3', 20000, 3000, 200, 0, 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 0, '123467', 'Peeter', 'XYZ', '2', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 2, 4, 2, 12, 2, '2', '3', 'English', '1990', '1,2,3', 20000, 3000, 200, 0, 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bw_schools`
--

CREATE TABLE `bw_schools` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `registration_no` varchar(100) NOT NULL,
  `owner_name` varchar(100) NOT NULL,
  `organisation_name` varchar(100) NOT NULL,
  `sub_categories` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `landline_no` varchar(20) NOT NULL,
  `fax_number` varchar(20) NOT NULL,
  `state` varchar(100) NOT NULL,
  `website` varchar(60) NOT NULL,
  `location` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `about` text NOT NULL,
  `google_location` text NOT NULL,
  `school_type` varchar(10) NOT NULL,
  `classification` varchar(10) NOT NULL,
  `grade` varchar(120) NOT NULL,
  `mop` varchar(10) NOT NULL,
  `min_age` varchar(10) NOT NULL,
  `inst_lang` varchar(20) NOT NULL,
  `facilites` varchar(100) NOT NULL,
  `bof` int(11) NOT NULL,
  `timing` int(11) NOT NULL,
  `no_teacher` int(11) DEFAULT NULL,
  `est_year` varchar(50) NOT NULL,
  `avg_fee` float NOT NULL,
  `other_fee` float NOT NULL,
  `admit_fee` float NOT NULL,
  `is_refund` tinyint(4) NOT NULL DEFAULT 0,
  `admit_link` text NOT NULL,
  `process_fee` float NOT NULL,
  `documents` varchar(100) NOT NULL,
  `admit_process` mediumtext NOT NULL,
  `images` varchar(100) NOT NULL,
  `photos` varchar(655) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_schools`
--

INSERT INTO `bw_schools` (`id`, `vendor_id`, `registration_no`, `owner_name`, `organisation_name`, `sub_categories`, `email_id`, `phone_number`, `landline_no`, `fax_number`, `state`, `website`, `location`, `address`, `country`, `pincode`, `about`, `google_location`, `school_type`, `classification`, `grade`, `mop`, `min_age`, `inst_lang`, `facilites`, `bof`, `timing`, `no_teacher`, `est_year`, `avg_fee`, `other_fee`, `admit_fee`, `is_refund`, `admit_link`, `process_fee`, `documents`, `admit_process`, `images`, `photos`, `status`, `created_date`, `updated_date`) VALUES
(1, 1, '72ADF', 'Alex', 'ABC Institutions', '9,10,11,14', 'md@abcinstitution.in', '78945612', '', '789456', 'Karnataka', '', 'Bangalore', 'Kormangala 3rd block, Bangalore', 'India', '641019', 'Lorem ipsum dolor sit amet, alia movet sed an. Eu eam duis graeci eirmod, cu malis nullam possit sea, pro decore expetenda cotidieque at. Ut ipsum choro dolorem sea, vel veniam deserunt tractatos eu. Usu noluisse suscipit officiis ei, ne altera ancillae eos, vix ei nullam fierent. Ea usu consul noster persequeris, vis ex ullum ancillae aliquando, id mea facer tritani labitur. Vidit suavitate nam te, at labores mandamus vel. Ut perfecto vituperatoribus duo, quo ex dolorum reprimique.', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.235377912713!2d76.69632141480628!3d11.390443091906663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe4b76896a9ff16eb!2sSterling%20Ooty%20Fern%20Hill%20-%20Resorts%20and%20Hotels!5e0!3m2!1sen!2sin!4v1592883187821!5m2!1sen!2sin', '', '', '', '', '', '', '1,2,3', 0, 1, 10, '2002', 5000, 500, 8000, 1, '', 100, '1', 'Lorem ipsum dolor sit amet, alia movet sed an. Eu eam duis graeci eirmod, cu malis nullam possit sea, pro decore expetenda cotidieque at. Ut ipsum choro dolorem sea, vel veniam deserunt tractatos eu. Usu noluisse suscipit officiis ei, ne altera ancillae eos, vix ei nullam fierent. Ea usu consul noster persequeris, vis ex ullum ancillae aliquando, id mea facer tritani labitur. Vidit suavitate nam te, at labores mandamus vel. Ut perfecto vituperatoribus duo, quo ex dolorum reprimique.', 'sample.jpg', '', 1, '2020-06-23 00:00:00', '2020-06-23 00:00:00'),
(11, 1, ' dfdd', ' dfdf', ' John Tech', ' 2', ' john@john.tech.in', ' 09876543210', ' India', ' undefined', ' TN', ' fddff', ' fggff', ' gfcgff', ' gffgfg', ' 544', ' sfxsdfsd', ' fgfgf', ' private', ' boys', ' Class 2 to Class 7', ' Online Pa', ' 4', ' hindi', ' transportation', 2, 10, NULL, ' 4545', 4545, 76667, 5656, 1, ' fddffd', 6556, ' Residential Proof,Immunization Certficate', ' fgfggff', ' (binary)', ' [object FileList]', 1, '2020-06-23 06:05:21', '0000-00-00 00:00:00'),
(12, 1, ' dfdd', ' dfdf', ' John Tech', ' 2', ' john@john.tech.in', ' 09876543210', ' India', ' undefined', ' TN', ' fddff', ' fggff', ' gfcgff', ' gffgfg', ' 544', ' sfxsdfsd', ' fgfgf', ' private', ' boys', ' Class 2 to Class 7', ' Online Pa', ' 4', ' hindi', ' transportation', 2, 10, NULL, ' 4545', 4545, 76667, 5656, 1, ' fddffd', 6556, ' Residential Proof,Immunization Certficate', ' fgfggff', ' (binary)', ' [object FileList]', 1, '2020-06-23 09:10:52', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bw_school_type`
--

CREATE TABLE `bw_school_type` (
  `id` int(11) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_school_type`
--

INSERT INTO `bw_school_type` (`id`, `type_name`, `status`, `created_date`) VALUES
(1, 'Government', 1, '2020-06-22 19:03:03'),
(2, 'Private', 1, '2020-06-22 19:03:03');

-- --------------------------------------------------------

--
-- Table structure for table `bw_sesonal_camp`
--

CREATE TABLE `bw_sesonal_camp` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `registration_no` varchar(100) NOT NULL,
  `camp_name` varchar(100) NOT NULL,
  `contact_person` varchar(100) NOT NULL,
  `sub_categories` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `fax_number` varchar(20) NOT NULL,
  `state` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `about` text NOT NULL,
  `google_location` text NOT NULL,
  `when_event` varchar(100) NOT NULL,
  `where_event` varchar(100) NOT NULL,
  `register_info` longtext NOT NULL,
  `event_fee` float NOT NULL,
  `facebook` varchar(100) NOT NULL,
  `twitter` varchar(100) NOT NULL,
  `images` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_sesonal_camp`
--

INSERT INTO `bw_sesonal_camp` (`id`, `vendor_id`, `registration_no`, `camp_name`, `contact_person`, `sub_categories`, `email_id`, `phone_number`, `fax_number`, `state`, `location`, `address`, `country`, `pincode`, `about`, `google_location`, `when_event`, `where_event`, `register_info`, `event_fee`, `facebook`, `twitter`, `images`, `status`, `created_date`, `updated_date`) VALUES
(1, 0, '123467', 'XYZ', 'Jhon', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 'monday', 'Anepalya', 'online', 1000, 'www.facebook.com', 'www.twitter.com', 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 0, '123467', 'XYZ', 'Jhon', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 'monday', 'Anepalya', 'online', 1000, 'www.facebook.com', 'www.twitter.com', 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 0, '123467', 'XYZ', 'Jhon', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 'monday', 'Anepalya', 'online', 1000, 'www.facebook.com', 'www.twitter.com', 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bw_timings`
--

CREATE TABLE `bw_timings` (
  `id` int(11) NOT NULL,
  `timing` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_timings`
--

INSERT INTO `bw_timings` (`id`, `timing`, `status`, `created_date`) VALUES
(1, '09:00 - 16:30', 1, '2020-06-22 18:55:46'),
(2, '10:00 - 17:00', 1, '2020-06-22 18:55:46');

-- --------------------------------------------------------

--
-- Table structure for table `bw_tutions`
--

CREATE TABLE `bw_tutions` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `registration_no` varchar(100) NOT NULL,
  `owner_name` varchar(100) NOT NULL,
  `tution_name` varchar(100) NOT NULL,
  `incharge_name` varchar(100) NOT NULL,
  `sub_categories` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `fax_number` varchar(20) NOT NULL,
  `state` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `about` text NOT NULL,
  `google_location` text NOT NULL,
  `tution_type` int(11) NOT NULL,
  `bof` int(11) NOT NULL,
  `class_range` int(11) NOT NULL,
  `languages` varchar(100) NOT NULL,
  `class_freq` int(11) NOT NULL,
  `est_year` varchar(50) NOT NULL,
  `opening_time` int(11) NOT NULL,
  `no_teacher` int(11) NOT NULL,
  `avg_fee` float NOT NULL,
  `admit_fee` float NOT NULL,
  `images` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bw_tutions`
--

INSERT INTO `bw_tutions` (`id`, `vendor_id`, `registration_no`, `owner_name`, `tution_name`, `incharge_name`, `sub_categories`, `email_id`, `phone_number`, `fax_number`, `state`, `location`, `address`, `country`, `pincode`, `about`, `google_location`, `tution_type`, `bof`, `class_range`, `languages`, `class_freq`, `est_year`, `opening_time`, `no_teacher`, `avg_fee`, `admit_fee`, `images`, `status`, `created_date`, `updated_date`) VALUES
(1, 0, '123467', 'Jhon', 'xyz', 'Alex', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 2, 2, 200, 'English', 2, '1990', 2, 20, 1000, 1000, 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 0, '123467', 'Jhon', 'xyz', 'Alex', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 2, 2, 200, 'English', 2, '1990', 2, 20, 1000, 1000, 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 0, '123467', 'Jhon', 'xyz', 'Alex', '1', 'jhon@gmail.com', '7865489432', '345678', 'karnataka', 'bangalore', 'kormangala', 'India', '786954', 'jqjbdjqwbd', 'www.googlemap.com', 2, 2, 200, 'English', 2, '1990', 2, 20, 1000, 1000, 'sample.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bw_board_edu`
--
ALTER TABLE `bw_board_edu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_category`
--
ALTER TABLE `bw_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `bw_class_freq`
--
ALTER TABLE `bw_class_freq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_docs`
--
ALTER TABLE `bw_docs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_edu_sys`
--
ALTER TABLE `bw_edu_sys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_events`
--
ALTER TABLE `bw_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_facilities`
--
ALTER TABLE `bw_facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_gallery`
--
ALTER TABLE `bw_gallery`
  ADD PRIMARY KEY (`gallery_id`);

--
-- Indexes for table `bw_hobby_interest`
--
ALTER TABLE `bw_hobby_interest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_payment_type`
--
ALTER TABLE `bw_payment_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_play_area`
--
ALTER TABLE `bw_play_area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_pre_schools`
--
ALTER TABLE `bw_pre_schools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_schools`
--
ALTER TABLE `bw_schools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_school_type`
--
ALTER TABLE `bw_school_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_sesonal_camp`
--
ALTER TABLE `bw_sesonal_camp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_timings`
--
ALTER TABLE `bw_timings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bw_tutions`
--
ALTER TABLE `bw_tutions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bw_board_edu`
--
ALTER TABLE `bw_board_edu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bw_category`
--
ALTER TABLE `bw_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `bw_class_freq`
--
ALTER TABLE `bw_class_freq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bw_docs`
--
ALTER TABLE `bw_docs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bw_edu_sys`
--
ALTER TABLE `bw_edu_sys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bw_events`
--
ALTER TABLE `bw_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bw_facilities`
--
ALTER TABLE `bw_facilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bw_gallery`
--
ALTER TABLE `bw_gallery`
  MODIFY `gallery_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bw_hobby_interest`
--
ALTER TABLE `bw_hobby_interest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bw_payment_type`
--
ALTER TABLE `bw_payment_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bw_play_area`
--
ALTER TABLE `bw_play_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bw_pre_schools`
--
ALTER TABLE `bw_pre_schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `bw_schools`
--
ALTER TABLE `bw_schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `bw_school_type`
--
ALTER TABLE `bw_school_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bw_sesonal_camp`
--
ALTER TABLE `bw_sesonal_camp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bw_timings`
--
ALTER TABLE `bw_timings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bw_tutions`
--
ALTER TABLE `bw_tutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
