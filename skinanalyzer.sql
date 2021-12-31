-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 31, 2021 at 04:56 PM
-- Server version: 5.7.34-0ubuntu0.18.04.1
-- PHP Version: 7.2.34-23+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mamaearth`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_skin_result`
--

CREATE TABLE `user_skin_result` (
  `id` bigint(20) NOT NULL,
  `brower_session_id` varchar(255) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `wrinkles` int(11) NOT NULL,
  `dar_circle` int(11) NOT NULL,
  `texture` int(11) NOT NULL,
  `spots` int(11) NOT NULL,
  `alll` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_skin_result`
--

INSERT INTO `user_skin_result` (`id`, `brower_session_id`, `phone`, `email`, `wrinkles`, `dar_circle`, `texture`, `spots`, `alll`, `user_id`, `age`, `created_at`) VALUES
(1, NULL, '9876543210', 'test@test.com', 30, 44, 71, 14, 40, 0, 33, '2021-12-28 07:46:41'),
(2, NULL, '9876543210', 'test@test.com', 39, 61, 58, 26, 46, 0, 32, '2021-12-28 07:50:28'),
(3, NULL, '9876543210', 'test@test.com', 20, 48, 68, 27, 41, 0, 32, '2021-12-28 10:37:14'),
(4, NULL, '9876543210', 'test@test.com', 39, 66, 54, 34, 48, 0, 30, '2021-12-28 10:40:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_skin_result`
--
ALTER TABLE `user_skin_result`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_skin_result`
--
ALTER TABLE `user_skin_result`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
