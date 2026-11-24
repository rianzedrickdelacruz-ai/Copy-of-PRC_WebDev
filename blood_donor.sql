-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2026 at 09:08 AM
-- Server version: 10.11.16-MariaDB
-- PHP Version: 8.3.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blood_donor`
--

-- --------------------------------------------------------

--
-- Table structure for table `blood_unit`
--

CREATE TABLE `blood_unit` (
  `unit_id` varchar(40) NOT NULL,
  `donor_id` bigint(20) UNSIGNED NOT NULL,
  `donor_name` varchar(160) NOT NULL,
  `blood_type` varchar(5) NOT NULL,
  `component` varchar(100) NOT NULL DEFAULT 'Whole Blood (450ml)',
  `collection_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `storage_location` varchar(120) NOT NULL,
  `status` varchar(25) NOT NULL,
  `action` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blood_unit`
--

INSERT INTO `blood_unit` (`unit_id`, `donor_id`, `donor_name`, `blood_type`, `component`, `collection_date`, `expiry_date`, `storage_location`, `status`, `action`) VALUES
('BU-51314', 3, 'Mark Grefal', 'A-', 'Whole Blood (450ml)', '2026-11-12', '2026-12-03', 'Red Cross', 'Processing', 'View');

-- --------------------------------------------------------

--
-- Table structure for table `donor_registry`
--

CREATE TABLE `donor_registry` (
  `donor_id` bigint(20) UNSIGNED NOT NULL,
  `donor_code` varchar(40) NOT NULL,
  `name` varchar(160) NOT NULL,
  `donor_type` varchar(100) NOT NULL DEFAULT 'Walk-in',
  `blood_type` varchar(5) NOT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(25) NOT NULL,
  `actions` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donor_registry`
--

INSERT INTO `donor_registry` (`donor_id`, `donor_code`, `name`, `donor_type`, `blood_type`, `date`, `status`, `actions`) VALUES
(3, 'DN-11705', 'Mark Grefal', 'Walk in', 'A-', '2026-11-01', 'Qualified', 'View'),
(4, 'DN-89400', 'Aldrich Catolico', 'Regular Donor', 'A+', '2026-10-07', 'Qualified', 'View'),
(5, 'DN-53678', 'Lee Cielo Robleado', 'Regular Donor', 'AB+', '2026-05-04', 'Qualified', 'View'),
(6, 'DN-38417', 'Huer Janpaulo Collantes', 'Walk in', 'O+', '2026-05-07', 'Deferred', 'View');

-- --------------------------------------------------------

--
-- Table structure for table `hospital_distribution`
--

CREATE TABLE `hospital_distribution` (
  `request_id` bigint(20) UNSIGNED NOT NULL,
  `requisition_id` varchar(40) NOT NULL,
  `hospital_name` varchar(160) NOT NULL,
  `receiving_doctor/service` varchar(160) NOT NULL,
  `blood_type` varchar(5) NOT NULL,
  `units_ordered` int(11) NOT NULL,
  `components` varchar(100) NOT NULL,
  `urgency/priority` varchar(40) NOT NULL,
  `requested_at` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(25) NOT NULL DEFAULT 'Not Yet Started'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospital_distribution`
--

INSERT INTO `hospital_distribution` (`request_id`, `requisition_id`, `hospital_name`, `receiving_doctor/service`, `blood_type`, `units_ordered`, `components`, `urgency/priority`, `requested_at`, `status`) VALUES
(3, 'REQ-20261118-070107', '', '', '', 0, '', '', '2026-11-18 14:01:07', 'Not Yet Started'),
(4, 'REQ-1794981752', '', '', '', 0, '', '', '2026-11-18 14:02:32', 'Not Yet Started'),
(5, 'REQ-1794982477', '', '', '', 0, '', '', '2026-11-18 14:14:37', 'Not Yet Started'),
(6, 'REQ-1794982479', '', '', '', 0, '', '', '2026-11-18 14:14:39', 'Not Yet Started'),
(7, 'REQ-1794982490', '', '', '', 0, '', '', '2026-11-18 14:14:50', 'Not Yet Started'),
(9, 'REQ-1794982667', '', '', '', 0, '', '', '2026-11-18 14:17:47', 'Not Yet Started'),
(10, 'REQ-1794982669', '', '', '', 0, '', '', '2026-11-18 14:17:49', 'Not Yet Started'),
(11, 'REQ-1794982675', '', '', '', 0, '', '', '2026-11-18 14:17:55', 'Not Yet Started'),
(13, 'REQ-1794982718', '', '', '', 0, '', '', '2026-11-18 14:18:38', 'Not Yet Started'),
(15, 'REQ-3079', 'TEST3', 'Receicing doctor', 'B+', 2, 'PRCB', 'Urgent', '2026-11-18 07:20:45', 'Not Yet Started'),
(16, 'REQ-3179', 'Saint john', 'service', 'B-', 1, 'PCRB', 'STAT Emergency', '2026-11-18 08:59:10', 'Not Yet Started');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `role` varchar(80) NOT NULL DEFAULT 'Blood Bank Officer',
  `username` varchar(60) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `role`, `username`, `password_hash`, `created_at`) VALUES
(1, 'Officer Cruz', 'System Admin', 'juandelacruz7', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2026-11-18 07:00:18'),
(2, 'Ethan Marco Escriba', 'System Admin', 'Than', '$2y$10$5QZ/Jsbzk76zb5oWQroyM.niRnvsE7hLYZAjvTyNGifV0wtx3sxQ6', '2026-11-18 07:41:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blood_unit`
--
ALTER TABLE `blood_unit`
  ADD UNIQUE KEY `uq_blood_unit_unit_id` (`unit_id`),
  ADD KEY `idx_blood_unit_donor_id` (`donor_id`);

--
-- Indexes for table `donor_registry`
--
ALTER TABLE `donor_registry`
  ADD PRIMARY KEY (`donor_id`),
  ADD UNIQUE KEY `uq_donor_registry_code` (`donor_code`);

--
-- Indexes for table `hospital_distribution`
--
ALTER TABLE `hospital_distribution`
  ADD PRIMARY KEY (`request_id`),
  ADD UNIQUE KEY `uq_hospital_distribution_requisition_id` (`requisition_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donor_registry`
--
ALTER TABLE `donor_registry`
  MODIFY `donor_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hospital_distribution`
--
ALTER TABLE `hospital_distribution`
  MODIFY `request_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blood_unit`
--
ALTER TABLE `blood_unit`
  ADD CONSTRAINT `fk_blood_unit_donor` FOREIGN KEY (`donor_id`) REFERENCES `donor_registry` (`donor_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
