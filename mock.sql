/*
 Navicat Premium Data Transfer

 Source Server         : water
 Source Server Type    : MySQL
 Source Server Version : 50505
 Source Host           : localhost
 Source Database       : water

 Target Server Type    : MySQL
 Target Server Version : 50505
 File Encoding         : utf-8

 Date: 07/24/2019 11:49:22 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `water_camera`
-- ----------------------------
DROP TABLE IF EXISTS `water_camera`;
CREATE TABLE `water_camera` (
  `camera_id` int(11) NOT NULL AUTO_INCREMENT,
  `station_id` int(11) DEFAULT NULL COMMENT '一个测站有多个机位',
  `camera_num` int(11) DEFAULT NULL COMMENT '摄像头编号（1-5）',
  `camera_status` int(11) DEFAULT NULL COMMENT '摄像头及连线状态（1在线 2离线 ）',
  `camera_use` int(11) DEFAULT NULL COMMENT '摄像头功能(1 水尺 2 全景 3上游 4下游 5 站门)',
  PRIMARY KEY (`camera_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `water_camera`
-- ----------------------------
BEGIN;
INSERT INTO `water_camera` VALUES ('1', '1', null, null, '1'), ('2', '1', null, null, '2'), ('3', '2', null, null, '1'), ('4', '3', null, null, '1'), ('5', '3', null, null, '2'), ('6', '4', null, null, '1'), ('7', '4', null, null, '3'), ('8', '5', null, null, '1'), ('9', '6', null, null, '1');
COMMIT;

-- ----------------------------
--  Table structure for `water_group`
-- ----------------------------
DROP TABLE IF EXISTS `water_group`;
CREATE TABLE `water_group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '勘测队ID',
  `group_name` varchar(255) DEFAULT NULL COMMENT '勘测队名称',
  `group_admin_name` varchar(255) DEFAULT NULL COMMENT '勘测队负责人姓名',
  `group_admin_tel` varchar(255) DEFAULT NULL COMMENT '负责人电话',
  `region_id` int(11) DEFAULT NULL COMMENT '归属于哪个局ID',
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `water_group`
-- ----------------------------
BEGIN;
INSERT INTO `water_group` VALUES ('1', '雷霆勘测队', null, null, '1'), ('2', '虎豹勘测队', null, null, '1'), ('4', '天天勘测队', null, null, '2'), ('5', '韵达勘测队', null, null, '2');
COMMIT;

-- ----------------------------
--  Table structure for `water_photo`
-- ----------------------------
DROP TABLE IF EXISTS `water_photo`;
CREATE TABLE `water_photo` (
  `photo_id` int(11) NOT NULL AUTO_INCREMENT,
  `camera_id` int(11) DEFAULT NULL COMMENT '一个摄像头下多个图片',
  `photo_allview` varchar(255) DEFAULT NULL COMMENT '全景图片存储路径',
  `photo_upstream` varchar(255) DEFAULT NULL COMMENT '上游图片存储路径',
  `photo_downstram` varchar(255) DEFAULT NULL COMMENT '下游图片存储路径',
  `photo_staff_gauge` varchar(255) DEFAULT NULL COMMENT '水尺图片存储地址',
  `staffgauge_id` int(11) DEFAULT NULL COMMENT '一个水尺多个图片',
  `photo_gaocheng` int(11) DEFAULT NULL COMMENT '水尺零点高程数值',
  `photo_dushu` int(11) DEFAULT NULL COMMENT '水尺读数',
  `photo_status` varchar(255) DEFAULT NULL COMMENT '水尺状态（正常、倾斜、遮挡）',
  `photo_hezhun` varchar(255) DEFAULT NULL COMMENT '核准水位',
  `photo_yaoce` int(11) DEFAULT NULL COMMENT '遥测水位',
  `photo_day` date DEFAULT NULL COMMENT '拍摄日期',
  `photo_time` time DEFAULT NULL COMMENT '拍摄时间',
  `photo_jiaohe` varchar(255) DEFAULT NULL COMMENT '校核状态',
  `photo_wucha` int(11) DEFAULT NULL COMMENT '误差',
  PRIMARY KEY (`photo_id`),
  KEY `photo_allview` (`photo_allview`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `water_photo`
-- ----------------------------
BEGIN;
INSERT INTO `water_photo` VALUES ('1', '1', null, null, null, null, null, '12', '15', null, null, null, '2019-07-24', '08:00:00', null, null), ('3', '1', null, null, null, '/img/haha.ad112c4e.jpg', null, '14', '17', null, null, null, '2019-07-23', '08:00:00', null, null), ('4', '1', null, null, null, null, null, '13', '14', null, null, null, '2019-07-21', '08:00:00', null, null), ('6', '1', null, null, null, null, null, '12', '13', null, null, null, '2019-07-20', '08:00:00', null, null), ('7', '1', null, null, null, null, null, '14', '15', null, null, null, '2019-07-19', '08:00:00', null, null), ('8', '1', null, null, null, null, null, '16', '10', null, null, null, '2019-07-18', '08:00:00', null, null), ('9', '1', null, null, null, null, null, '19', '12', null, null, null, '2019-07-17', '08:00:00', null, null), ('10', '1', null, null, null, null, null, '10', '13', null, null, null, '2019-07-16', '08:00:00', null, null), ('11', '1', null, null, null, null, null, '13', '15', null, null, null, '2019-07-15', '08:00:00', null, null), ('12', '1', null, null, null, null, null, '15', '12', null, null, null, '2019-07-14', '08:00:00', null, null), ('13', '1', null, null, null, null, null, '19', '13', null, null, null, '2019-07-22', '08:00:00', null, null), ('14', '3', null, null, null, null, null, '16', '19', null, null, null, '2019-07-24', '08:00:00', null, null), ('15', '4', null, null, null, null, null, '12', '17', null, null, null, '2019-07-24', '08:00:00', null, null), ('16', '6', null, null, null, null, null, '18', '14', null, null, null, '2019-07-24', '08:00:00', null, null), ('17', '3', null, null, null, null, null, '12', '14', null, null, null, '2019-07-23', '08:00:00', null, null), ('18', '3', null, null, null, null, null, '15', '16', null, null, null, '2019-07-22', '11:27:17', null, null), ('19', '3', null, null, null, null, null, '19', '26', null, null, null, '2019-07-21', '11:28:01', null, null), ('20', '3', null, null, null, null, null, '17', '11', null, null, null, '2019-07-20', '11:28:35', null, null), ('21', '3', null, null, null, null, null, '23', '12', null, null, null, '2019-07-19', '11:29:15', null, null), ('22', '3', null, null, null, null, null, '12', '13', null, null, null, '2019-07-18', '11:29:45', null, null), ('23', '4', null, null, null, null, null, '14', '16', null, null, null, '2019-07-23', '11:31:37', null, null), ('24', '4', null, null, null, null, null, '13', '15', null, null, null, '2019-07-22', '11:32:24', null, null), ('25', '4', null, null, null, null, null, '12', '16', null, null, null, '2019-07-21', '11:32:28', null, null), ('26', '4', null, null, null, null, null, '12', '17', null, null, null, '2019-07-20', '11:32:32', null, null), ('27', '4', null, null, null, null, null, '13', '14', null, null, null, '2019-07-19', '11:32:36', null, null), ('28', '4', null, null, null, null, null, '17', '12', null, null, null, '2019-07-18', '11:32:40', null, null), ('29', '6', null, null, null, null, null, '13', '15', null, null, null, '2019-07-18', '11:34:10', null, null), ('30', '6', null, null, null, null, null, '12', '16', null, null, null, '2019-07-19', '11:34:47', null, null), ('31', '6', null, null, null, null, null, '12', '17', null, null, null, '2019-07-20', '11:34:52', null, null), ('32', '6', null, null, null, null, null, '14', '14', null, null, null, '2019-07-21', '11:34:57', null, null), ('33', '6', null, null, null, null, null, '17', '4', null, null, null, '2019-07-22', '11:35:02', null, null), ('34', '6', null, null, null, null, null, '12', '23', null, null, null, '2019-07-23', '11:35:06', null, null), ('35', '8', null, null, null, null, null, '13', '12', null, null, null, '2019-07-24', '11:37:24', null, null), ('36', '8', null, null, null, null, null, '14', '14', null, null, null, '2019-07-23', '11:37:29', null, null), ('37', '8', null, null, null, null, null, '13', '16', null, null, null, '2019-07-22', '11:37:33', null, null), ('38', '8', null, null, null, null, null, '15', '18', null, null, null, '2019-07-21', '11:37:38', null, null), ('39', '8', null, null, null, null, null, '16', '20', null, null, null, '2019-07-20', '11:37:42', null, null), ('40', '8', null, null, null, null, null, '13', '11', null, null, null, '2019-07-19', '11:37:47', null, null), ('41', '8', null, null, null, null, null, '17', '12', null, null, null, '2019-07-18', '11:37:51', null, null);
COMMIT;

-- ----------------------------
--  Table structure for `water_region`
-- ----------------------------
DROP TABLE IF EXISTS `water_region`;
CREATE TABLE `water_region` (
  `region_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '区域ID',
  `region_name` varchar(255) DEFAULT NULL COMMENT '区域名字',
  `province_id` int(11) DEFAULT NULL COMMENT '区域归属省ID',
  `station_basin` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`region_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `water_region`
-- ----------------------------
BEGIN;
INSERT INTO `water_region` VALUES ('1', 'b', null, '1'), ('2', 'a', null, null);
COMMIT;

-- ----------------------------
--  Table structure for `water_staffgauge`
-- ----------------------------
DROP TABLE IF EXISTS `water_staffgauge`;
CREATE TABLE `water_staffgauge` (
  `staffgauge_id` int(11) NOT NULL AUTO_INCREMENT,
  `camera_id` int(11) DEFAULT NULL,
  `staffgauge_code` varchar(255) DEFAULT NULL COMMENT '水尺编号',
  `staffgauge_jimian` varchar(255) DEFAULT NULL COMMENT '海拔基面',
  `staffgauge_status` int(11) DEFAULT NULL COMMENT '水尺识别状态(1 识别 2未识别)',
  PRIMARY KEY (`staffgauge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `water_staffgauge`
-- ----------------------------
BEGIN;
INSERT INTO `water_staffgauge` VALUES ('1', '1', '66', null, null), ('2', '3', '77', null, null), ('3', '4', '11', null, null), ('4', '6', '88', null, null), ('5', '8', '23', null, null);
COMMIT;

-- ----------------------------
--  Table structure for `water_station`
-- ----------------------------
DROP TABLE IF EXISTS `water_station`;
CREATE TABLE `water_station` (
  `station_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '测站ID',
  `station_name` varchar(255) DEFAULT NULL COMMENT '测站名字',
  `group_id` int(11) DEFAULT NULL COMMENT '测站属于哪个工作队ID',
  `station_river_name` varchar(255) DEFAULT NULL COMMENT '测站归属河流名称',
  `station_kind` varchar(255) DEFAULT NULL COMMENT '测站岸别（左或右）',
  `station_code` varchar(255) DEFAULT NULL COMMENT '测站代码',
  `station_condition_id` int(11) DEFAULT NULL,
  `station_longitude` varchar(255) DEFAULT NULL COMMENT '测站经度',
  `station_latitude` varchar(255) DEFAULT NULL COMMENT '测站纬度',
  `station_address` varchar(255) DEFAULT NULL COMMENT '测站地址',
  `station_jingjie_value` int(11) DEFAULT NULL COMMENT '当前测站水位警戒值',
  `station_baozheng_value` int(11) DEFAULT NULL COMMENT '当前测站保证值',
  `station_history_high_value` int(11) DEFAULT NULL COMMENT '当前测站历史最高值',
  `station_status` int(11) DEFAULT NULL COMMENT '测站状态（1在线 2离线）',
  `station_up_id` int(11) DEFAULT NULL COMMENT '上游测站ID',
  `station_down_id` int(11) DEFAULT NULL COMMENT '下游测站ID',
  `station_basin` varchar(255) DEFAULT NULL COMMENT '当前测站所在流域',
  `last_look_time` datetime DEFAULT NULL,
  PRIMARY KEY (`station_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `water_station`
-- ----------------------------
BEGIN;
INSERT INTO `water_station` VALUES ('1', '一站', '1', null, null, '哈哈', null, '123.816447', '47.363896', null, '12', '15', '2', '1', null, null, '1', '2019-07-24 11:41:17'), ('2', '二战', '1', null, null, '呵呵', null, '124.029166', '47.306442', null, '15', '17', '12', '2', null, null, '1', '2019-07-24 11:40:59'), ('3', '三站', '2', null, null, '太高了', null, '123.813572', '47.230522', null, '17', '19', '14', '1', null, null, '1', '2019-07-24 11:40:00'), ('4', '四站', '2', null, null, '还行', null, '123.925681', '47.411141', null, '14', '16', '24', '2', null, null, '1', '2019-07-24 11:41:03'), ('5', '五站', '4', null, null, null, null, null, null, null, '16', '12', '17', '1', null, null, '1', null), ('6', '六站', '5', null, null, null, null, null, null, null, '13', '15', '18', '1', null, null, '1', null);
COMMIT;

-- ----------------------------
--  Table structure for `water_station_condition`
-- ----------------------------
DROP TABLE IF EXISTS `water_station_condition`;
CREATE TABLE `water_station_condition` (
  `condition_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '测站工况表ID',
  `station_id` int(11) DEFAULT NULL COMMENT '工况条目属于哪个测站',
  `condition_time` date DEFAULT NULL COMMENT '工况8点拍摄时间',
  `condition_upload_time` date DEFAULT NULL COMMENT '处理结果上传时间',
  `photo_num` int(11) DEFAULT NULL COMMENT '视频分帧出来的图片数量',
  `condition_volt` float DEFAULT NULL COMMENT '下位机电压',
  `condition_press` int(11) DEFAULT NULL COMMENT 'sim卡信号强度',
  `condition_rooms` int(11) DEFAULT NULL COMMENT '下位机剩余空间有多少M',
  `condition_admin_name` varchar(255) DEFAULT NULL COMMENT '站长名字',
  PRIMARY KEY (`condition_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `water_user`
-- ----------------------------
DROP TABLE IF EXISTS `water_user`;
CREATE TABLE `water_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '登录用户ID',
  `username` varchar(255) DEFAULT NULL COMMENT '登录用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '登录用户密码',
  `region_id` int(11) DEFAULT NULL COMMENT '所属区域ID（包括市区和测站）',
  `province_id` int(11) DEFAULT NULL COMMENT '省ID标识（0为无权 1为有权）',
  `status` int(11) DEFAULT NULL COMMENT '权限设定键名',
  `admin` int(11) DEFAULT NULL COMMENT '管理员权限设定（1：管理员 2：其他用户）',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `water_user`
-- ----------------------------
BEGIN;
INSERT INTO `water_user` VALUES ('1', 'humingxu', '123456', '1', '1', '3', '1'), ('2', 'hehe', '1234567', '1', '1', '3', '1'), ('3', 'yeah', '123', '2', '1', '3', '1'), ('4', 'yu', '456', '2', '1', '3', '1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
