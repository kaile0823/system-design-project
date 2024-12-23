export const TaiwanService = {
    getLocationInfo() {
        return {

            counties: {

                // 縣市
                english: [
                    'Taipei City', 'Keelung City', 'New Taipei City', 'Yilan County', 'Taoyuan City', 'Hsinchu City', 'Hsinchu County', 'Miaoli County',
                    'Taichung City', 'Changhua County', 'Nantou County', 'Chiayi City', 'Chiayi County', 'Yunlin County', 'Tainan City', 'Kaohsiung City',
                    'Penghu County', 'Kinmen County', 'Pingtung County', 'Taitung County', 'Hualien County', 'Lienchiang County'
                ],

                mandarin: [
                    '台北市', '基隆市', '新北市', '宜蘭縣', '桃園市', '新竹市', '新竹縣', '苗栗縣',
                    '台中市', '彰化縣', '南投縣', '嘉義市', '嘉義縣', '雲林縣', '台南市', '高雄市',
                    '澎湖縣', '金門縣', '屏東縣', '台東縣', '花蓮縣', '連江縣'
                ],
            },

            districts: {

                // 區域
                english: [
                    // 台北市
                    [
                        ['Zhongzheng District', 'Datong District', 'Zhongshan District', 'Songshan District', 'Da’an District', 'Wanhua District', 'Xinyi District', 'Shilin District', 'Beitou District', 'Neihu District', 'Nangang District', 'Wenshan District'],

                        ['100', '103', '104', '105', '106', '108', '110', '111', '112', '114', '115', '116']
                    ],
                    // 基隆市
                    [
                        ['Ren’ai District', 'Xinyi District', 'Zhongzheng District', 'Zhongshan District', 'Anle District', 'Nuannuan District', 'Qidu District'],

                        ['200', '201', '202', '203', '204', '205', '206']
                    ],
                    // 新北市
                    [
                        ['Wanli District', 'Jinshan District', 'Banqiao District', 'Xizhi District', 'Shenkeng District', 'Shiding District', 'Ruifang District', 'Pingxi District', 'Shuangxi District', 'Gongliao District', 'Xindian District', 'Pinglin District', 'Wulai District', 'Yonghe District', 'Zhonghe District', 'Tucheng District', 'Sanxia District', 'Shulin District', 'Yingge District', 'Sanchong District', 'Xinzhuang District', 'Taishan District', 'Linkou District', 'LuzhouDistrict', 'Wugu District', 'Bali District', 'Tamsui District', 'Sanzhi District', 'Shimen District'],

                        ['207', '208', '220', '221', '222', '223', '224', '226', '227', '228',
                            '231', '232', '233', '234', '235', '236', '237', '238', '239', '241',
                            '242', '243', '244', '247', '248', '249', '251', '252', '253']
                    ],
                    // 宜蘭縣
                    [
                        ['Yilan City', 'Toucheng Township', 'Jiaoxi Township', 'Zhuangwei Township', 'Yuanshan Township', 'Luodong Township', 'Sanxing Township', 'Datong Township', 'Wujie Township', 'Dongshan Township', 'Su’ao Township', 'Nan’ao Township', 'Diauyutai'],

                        ['260', '261', '262', '263', '264', '265', '266', '267', '268', '269',
                            '270', '272', '290']
                    ],
                    // 桃園市
                    [
                        ['Zhongli District', 'Pingzhen District', 'Longtan District', 'Yangmei District', 'Xinwu District', 'Guanyin District', 'Taoyuan District', 'Guishan District', 'Bade District', 'Daxi District', 'Fuxing District', 'Dayuan District', 'Luzhu District'],

                        ['320', '324', '325', '326', '327', '328', '330', '333', '334', '335',
                            '336', '337', '338']
                    ],
                    // 新竹市
                    [
                        ['East District', 'North District', 'Xiangshan District'],

                        ['300', '300', '300']
                    ],
                    // 新竹縣
                    [
                        ['Zhubei City', 'Hukou Township', 'Xinfeng Township', 'Xinpu Township', 'Guanxi Township', 'Qionglin Township', 'Baoshan Township', 'Zhudong Township', 'Wufeng Township', 'Hengshan Township', 'Jianshi Township', 'Beipu Township', 'Emei Township'],

                        ['302', '303', '304', '305', '306', '307', '308', '310', '311',
                            '312', '313', '314', '315']
                    ],
                    // 苗栗縣
                    [
                        ['Zhunan Township', 'Toufen Township', 'Sanwan Township', 'Nanzhuang Township', 'Shitan Township', 'Houlong Township', 'Tongxiao Township', 'Yuanli Township', 'Miaoli City', 'Zaoqiao Township', 'Touwu Township', 'Gongguan Township', 'Dahu Township', 'Tai’an Township', 'Tongluo Township', 'Sanyi Township', 'Xihu Township', 'Zhuolan Township'],

                        ['350', '351', '352', '353', '354', '356', '357', '358', '360', '361',
                            '362', '363', '364', '365', '366', '367', '368', '369']
                    ],
                    // 台中市
                    [
                        ['Central District', 'East District', 'South District', 'West District', 'North District', 'Beitun District', 'Xitun District', 'Nantun District', 'Taiping District', 'Dali District', 'Wufeng District', 'Wuri District', 'Fengyuan District', 'Houli District', 'Shigang District', 'Dongshi District', 'Heping District', 'Xinshe District', 'Tanzi District', 'Daya District', 'Shengang District', 'Dadu District', 'ShaluDistrict', 'Longjing District', 'Wuqi District', 'Qingshui District', 'Dajia District', 'Waipu District', 'Da’an District'],

                        ['400', '401', '402', '403', '404', '406', '407', '408', '411', '412',
                            '413', '414', '420', '421', '422', '423', '424', '426', '427', '428',
                            '429', '432', '433', '434', '435', '436', '437', '438', '439']
                    ],
                    // 彰化縣
                    [
                        ['Changhua City', 'Fenyuan Township', 'Huatan Township', 'Xiushui Township', 'Lukang Township', 'Fuxing Township', 'Xianxi Township', 'Hemei Township', 'Shengang Township', 'Yuanlin Township', 'Shetou Township', 'Yongjing Township', 'Puxin Township', 'Xihu Township', 'Dacun Township', 'Puyan Township', 'Tianzhong Township', 'Beidou Township', 'Tianwei Township', 'Pitou Township', 'Xizhou Township', 'Zhutang Township', 'Erlin Township', 'Dacheng Township', 'Fangyuan Township', 'Ershui Township'],

                        ['500', '502', '503', '504', '505', '506', '507', '508', '509', '510',
                            '511', '512', '513', '514', '515', '516', '520', '521', '522', '523',
                            '524', '525', '526', '527', '528', '530']
                    ],
                    // 南投縣
                    [
                        ['Nantou City', 'Zhongliao Township', 'Caotun Township', 'Guoxing Township', 'Puli Township', 'Ren’ai Township', 'Mingjian Township', 'Jiji Township', 'Shuili Township', 'Yuchi Township', 'Xinyi Township', 'Zhushan Township', 'Lugu Township'],

                        ['540', '541', '542', '544', '545', '546', '551', '552', '553', '555',
                            '556', '557', '558']
                    ],
                    // 嘉義市
                    [
                        ['East District', 'West District'],

                        ['600', '600']
                    ],
                    // 嘉義縣
                    [
                        ['FanluTownship', 'Meishan Township', 'Zhuqi Township', 'Alishan Township', 'Zhongpu Township', 'Dapu Township', 'Shuishang Township', 'Lucao Township', 'Taibao City', 'Puzi City', 'Dongshi Township', 'Liujiao Township', 'Xingang Township', 'Minxiong Township', 'Dalin Township', 'Xikou Township', 'Yizhu Township', 'Budai Township'],

                        ['602', '603', '604', '605', '606', '607', '608', '611', '612',
                            '613', '614', '615', '616', '621', '622', '623', '624', '625']
                    ],
                    // 雲林縣
                    [
                        ['Dounan Township', 'Dapi Township', 'Huwei Township', 'Tuku Township', 'Baozhong Township', 'Dongshi Township', 'Taixi Township', 'Lunbei Township', 'Mailiao Township', 'Douliu City', 'Linnei Township', 'Gukeng Township', 'Citong Township', 'Xiluo Township', 'Erlun Township', 'Beigang Township', 'Shuilin Township', 'Kouhu Township', 'Sihu Township', 'Yuanchang Township'],

                        ['630', '631', '632', '633', '634', '635', '636', '637', '638', '640', '643',
                            '646', '647', '648', '649', '651', '652', '653', '654', '655']
                    ],
                    // 台南市
                    [
                        ['West Central District', 'East District', 'South District', 'North District', 'Anping District', 'Annan District', 'Yongkang District', 'Guiren District', 'Xinhua District', 'Zuozhen District', 'Yujing District', 'Nanxi District', 'Nanhua District', 'Rende District', 'Guanmiao District', 'Longqi District', 'Guantian District', 'Madou District', 'Jiali District', 'Xigang District', 'Qigu District', 'Jiangjun District', 'Xuejia District', 'Beimen District', 'Xinying District', 'Houbi District', 'Baihe District', 'Dongshan District', 'Liujia District', 'Xiaying District', 'Liuying District', 'Yanshui District', 'Shanhua District', 'Danei District', 'Shanshang District', 'Xinshi District', 'Anding District'],

                        ['700', '701', '702', '704', '708', '709', '710', '711', '712', '713', '714',
                            '715', '716', '717', '718', '719', '720', '721', '722', '723', '724', '725',
                            '726', '727', '730', '731', '732', '733', '734', '735', '736', '737', '741',
                            '742', '743', '744', '745']
                    ],
                    // 高雄市
                    [
                        ['Xinxing District', 'Qianjin District', 'Lingya District', 'Yancheng District', 'Gushan District', 'Qijin District', 'Qianzhen District', 'Sanmin District', 'Nanzi District', 'Xiaogang District', 'Zuoying District', 'Renwu District', 'Dashe District', 'Dongsha Islands', 'Nansha Islands', 'Gangshan District', 'Luzhu District', 'Alian District', 'Tianliao District', 'Yanchao District', 'Qiaotou District', 'Ziguan District', 'Mituo District', 'Yong’an District', 'Hunei District', 'Fengshan District', 'Daliao District', 'Linyuan District', 'Niaosong District', 'Dashu District', 'Qishan District', 'Meinong District', 'Liugui District', 'Neimen District', 'Shanlin District', 'Jiaxian District', 'Taoyuan District', 'Namaxia District', 'Maolin District', 'Qieding District'],

                        ['800', '801', '802', '803', '804', '805', '806', '807', '811', '812', '813',
                            '814', '815', '817', '819', '820', '821', '822', '823', '824', '825', '826', '827', '828',
                            '829', '830', '831', '832', '833', '840', '842', '843', '844', '845', '846',
                            '847', '848', '849', '851', '852']
                    ],
                    // 澎湖縣
                    [
                        ['Magong City', 'Xiyu Township', 'Wang’an Township', 'Qimei Township', 'Baisha Township', 'Huxi Township'],

                        ['880', '881', '882', '883', '884', '885']
                    ],
                    // 金門縣
                    [
                        ['Jinsha Township', 'Jinhu Township', 'Jinning Township', 'Jincheng Township', 'Lieyu Township', 'Wuqiu Township'],

                        ['890', '891', '892', '893', '894', '896']
                    ],
                    // 屏東縣
                    [
                        ['Pingtung City', 'Sandimen Township', 'Wutai Township', 'Majia Township', 'Jiuru Township', 'Ligang Township', 'Gaoshu Township', 'Yanpu Township', 'Changzhi Township', 'Linluo Township', 'Zhutian Township', 'Neipu Township', 'Wandan Township', 'Chaozhou Township', 'Taiwu Township', 'Laiyi Township', 'Wanluan Township', 'Kanding Township', 'Xinpi Township', 'Nanzhou Township', 'Linbian Township', 'Donggang Township', 'Liuqiu Township', 'Jiadong Township', 'Xinyuan Township', 'Fangliao Township', 'Fangshan Township', 'Chunri Township', 'Shizi Township', 'Checheng Township', 'Mudan Township', 'Hengchun Township', 'Manzhou Township'],

                        ['900', '901', '902', '903', '904', '905', '906', '907', '908', '909', '911',
                            '912', '913', '920', '921', '922', '923', '924', '925', '926', '927', '928',
                            '929', '931', '932', '940', '941', '942', '943', '944', '945', '946', '947']
                    ],
                    // 台東縣
                    [
                        ['Taitung City', 'Ludao Township', 'Lanyu Township', 'Yanping Township', 'Beinan Township', 'Luye Township', 'Guanshan Township', 'Haiduan Township', 'Chishang Township', 'Donghe Township', 'Chenggong Township', 'Changbin Township', 'Taimali Township', 'Jinfeng Township', 'Dawu Township', 'Daren Township'],

                        ['950', '951', '952', '953', '954', '955', '956', '957', '958', '959', '961',
                            '962', '963', '964', '965', '966']
                    ],
                    // 花蓮縣
                    [
                        ['Hualien City', 'Xincheng Township', 'Xiulin Township', 'Ji’an Township', 'Shoufeng Township', 'Fenglin Township', 'Guangfu Township', 'Fengbin Township', 'Ruisui Township', 'Wanrong Township', 'Yuli Township', 'Zhuoxi Township', 'Fuli Township'],

                        ['970', '971', '972', '973', '974', '975', '976', '977', '978', '979', '981',
                            '982', '983']
                    ],
                    // 連江縣
                    [
                        ['Nangan Township', 'Beigan Township', 'Juguang Township', 'Dongyin Township'],

                        ['209', '210', '211', '212']
                    ]
                ],
                // 區域
                mandarin: [
                    // 台北市
                    [
                        ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區',
                            '士林區', '北投區', '內湖區', '南港區', '文山區'],

                        ['100', '103', '104', '105', '106', '108', '110', '111', '112', '114', '115', '116']
                    ],
                    // 基隆市
                    [
                        ['仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區'],

                        ['200', '201', '202', '203', '204', '205', '206']
                    ],
                    // 新北市
                    [
                        ['萬里區', '金山區', '板橋區', '汐止區', '深坑區', '石碇區', '瑞芳區', '平溪區',
                            '雙溪區', '貢寮區', '新店區', '坪林區', '烏來區', '永和區', '中和區', '土城區',
                            '三峽區', '樹林區', '鶯歌區', '三重區', '新莊區', '泰山區', '林口區', '蘆洲區',
                            '五股區', '八里區', '淡水區', '三芝區', '石門區'],

                        ['207', '208', '220', '221', '222', '223', '224', '226', '227', '228',
                            '231', '232', '233', '234', '235', '236', '237', '238', '239', '241',
                            '242', '243', '244', '247', '248', '249', '251', '252', '253']
                    ],
                    // 宜蘭縣
                    [
                        ['宜蘭市', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '羅東鎮', '三星鄉', '大同鄉',
                            '五結鄉', '冬山鄉', '蘇澳鎮', '南澳鄉', '釣魚台列嶼'],

                        ['260', '261', '262', '263', '264', '265', '266', '267', '268', '269',
                            '270', '272', '290']
                    ],
                    // 桃園市
                    [
                        ['中壢區', '平鎮區', '龍潭區', '楊梅區', '新屋區', '觀音區', '桃園區', '龜山區',
                            '八德區', '大溪區', '復興區', '大園區', '蘆竹區'],

                        ['320', '324', '325', '326', '327', '328', '330', '333', '334', '335',
                            '336', '337', '338']
                    ],
                    // 新竹市
                    [
                        ['東區', '北區', '香山區'],

                        ['300', '300', '300']
                    ],
                    // 新竹縣
                    [
                        ['竹北市', '湖口鄉', '新豐鄉', '新埔鎮', '關西鎮', '芎林鄉', '寶山鄉',
                            '竹東鎮', '五峰鄉', '橫山鄉', '尖石鄉', '北埔鄉', '峨眉鄉'],

                        ['302', '303', '304', '305', '306', '307', '308', '310', '311',
                            '312', '313', '314', '315']
                    ],
                    // 苗栗縣
                    [
                        ['竹南鎮', '頭份市', '三灣鄉', '南庄鄉', '獅潭鄉', '後龍鎮', '通霄鎮', '苑裡鎮',
                            '苗栗市', '造橋鄉', '頭屋鄉', '公館鄉', '大湖鄉', '泰安鄉',
                            '銅鑼鄉', '三義鄉', '西湖鄉', '卓蘭鎮'],

                        ['350', '351', '352', '353', '354', '356', '357', '358', '360', '361',
                            '362', '363', '364', '365', '366', '367', '368', '369']
                    ],
                    // 台中市
                    [
                        ['中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區',
                            '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '石岡區', '東勢區', '和平區',
                            '新社區', '潭子區', '大雅區', '神岡區', '大肚區', '沙鹿區', '龍井區', '梧棲區',
                            '清水區', '大甲區', '外埔區', '大安區'],

                        ['400', '401', '402', '403', '404', '406', '407', '408', '411', '412',
                            '413', '414', '420', '421', '422', '423', '424', '426', '427', '428',
                            '429', '432', '433', '434', '435', '436', '437', '438', '439']
                    ],
                    // 彰化縣
                    [
                        ['彰化市', '芬園鄉', '花壇鄉', '秀水鄉', '鹿港鎮', '福興鄉', '線西鄉', '和美鎮',
                            '伸港鄉', '員林市', '社頭鄉', '永靖鄉', '埔心鄉', '溪湖鎮', '大村鄉', '埔鹽鄉',
                            '田中鎮', '北斗鎮', '田尾鄉', '埤頭鄉', '溪州鄉', '竹塘鄉', '二林鎮', '大城鄉',
                            '芳苑鄉', '二水鄉'],

                        ['500', '502', '503', '504', '505', '506', '507', '508', '509', '510',
                            '511', '512', '513', '514', '515', '516', '520', '521', '522', '523',
                            '524', '525', '526', '527', '528', '530']
                    ],
                    // 南投縣
                    [
                        ['南投市', '中寮鄉', '草屯鎮', '國姓鄉', '埔里鎮', '仁愛鄉', '名間鄉', '集集鎮',
                            '水里鄉', '魚池鄉', '信義鄉', '竹山鎮', '鹿谷鄉'],

                        ['540', '541', '542', '544', '545', '546', '551', '552', '553', '555',
                            '556', '557', '558']
                    ],
                    // 嘉義市
                    [
                        ['東區', '西區'],

                        ['600', '600']
                    ],
                    // 嘉義縣
                    [
                        ['番路鄉', '梅山鄉', '竹崎鄉', '阿里山', '中埔鄉', '大埔鄉', '水上鄉',
                            '鹿草鄉', '太保市', '朴子市', '東石鄉', '六腳鄉', '新港鄉', '民雄鄉', '大林鎮',
                            '溪口鄉', '義竹鄉', '布袋鎮'],

                        ['602', '603', '604', '605', '606', '607', '608', '611', '612',
                            '613', '614', '615', '616', '621', '622', '623', '624', '625']
                    ],
                    // 雲林縣
                    [
                        ['斗南鎮', '大埤鄉', '虎尾鎮', '土庫鎮', '褒忠鄉', '東勢鄉', '台西鄉', '崙背鄉',
                            '麥寮鄉', '斗六市', '林內鄉', '古坑鄉', '莿桐鄉', '西螺鎮', '二崙鄉', '北港鎮',
                            '水林鄉', '口湖鄉', '四湖鄉', '元長鄉'],

                        ['630', '631', '632', '633', '634', '635', '636', '637', '638', '640', '643',
                            '646', '647', '648', '649', '651', '652', '653', '654', '655']
                    ],
                    // 台南市
                    [
                        ['中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區',
                            '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區',
                            '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區',
                            '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區',
                            '大內區', '山上區', '新市區', '安定區'],

                        ['700', '701', '702', '704', '708', '709', '710', '711', '712', '713', '714',
                            '715', '716', '717', '718', '719', '720', '721', '722', '723', '724', '725',
                            '726', '727', '730', '731', '732', '733', '734', '735', '736', '737', '741',
                            '742', '743', '744', '745']
                    ],
                    // 高雄市
                    [
                        ['新興區', '前金區', '苓雅區', '鹽埕區', '鼓山區', '旗津區', '前鎮區', '三民區',
                            '楠梓區', '小港區', '左營區', '仁武區', '大社區', '東沙群島', '南沙群島', '岡山區',
                            '路竹區', '阿蓮區', '田寮區', '燕巢區', '橋頭區', '梓官區', '彌陀區', '永安區',
                            '湖內區', '鳳山區', '大寮區', '林園區', '鳥松區', '大樹區', '旗山區', '美濃區',
                            '六龜區', '內門區', '杉林區', '甲仙區', '桃源區', '那瑪夏區', '茂林區', '茄萣區'],

                        ['800', '801', '802', '803', '804', '805', '806', '807', '811', '812', '813',
                            '814', '815', '817', '819', '820', '821', '822', '823', '824', '825', '826', '827', '828',
                            '829', '830', '831', '832', '833', '840', '842', '843', '844', '845', '846',
                            '847', '848', '849', '851', '852']
                    ],
                    // 澎湖縣
                    [
                        ['馬公市', '西嶼鄉', '望安鄉', '七美鄉', '白沙鄉', '湖西鄉'],

                        ['880', '881', '882', '883', '884', '885']
                    ],
                    // 金門縣
                    [
                        ['金沙鎮', '金湖鎮', '金寧鄉', '金城鎮', '烈嶼鄉', '烏坵鄉'],

                        ['890', '891', '892', '893', '894', '896']
                    ],
                    // 屏東縣
                    [
                        ['屏東市', '三地門鄉', '霧台鄉', '瑪家鄉', '九如鄉', '里港鄉', '高樹鄉', '鹽埔鄉',
                            '長治鄉', '麟洛鄉', '竹田鄉', '內埔鄉', '萬丹鄉', '潮州鎮', '泰武鄉', '來義鄉',
                            '萬巒鄉', '崁頂鄉', '新埤鄉', '南州鄉', '林邊鄉', '東港鎮', '琉球鄉', '佳冬鄉',
                            '新園鄉', '枋寮鄉', '枋山鄉', '春日鄉', '獅子鄉', '車城鄉', '牡丹鄉', '恆春鎮',
                            '滿州鄉'],

                        ['900', '901', '902', '903', '904', '905', '906', '907', '908', '909', '911',
                            '912', '913', '920', '921', '922', '923', '924', '925', '926', '927', '928',
                            '929', '931', '932', '940', '941', '942', '943', '944', '945', '946', '947']
                    ],
                    // 台東縣
                    [
                        ['台東市', '綠島鄉', '蘭嶼鄉', '延平鄉', '卑南鄉', '鹿野鄉', '關山鎮', '海端鄉',
                            '池上鄉', '東河鄉', '成功鎮', '長濱鄉', '太麻里', '金峰鄉', '大武鄉', '達仁鄉'],

                        ['950', '951', '952', '953', '954', '955', '956', '957', '958', '959', '961',
                            '962', '963', '964', '965', '966']
                    ],
                    // 花蓮縣
                    [
                        ['花蓮市', '新城鄉', '秀林鄉', '吉安鄉', '壽豐鄉', '鳳林鎮', '光復鄉', '豐濱鄉',
                            '瑞穗鄉', '萬榮鄉', '玉里鎮', '卓溪鄉', '富里鄉'],

                        ['970', '971', '972', '973', '974', '975', '976', '977', '978', '979', '981',
                            '982', '983']
                    ],
                    // 連江縣
                    [
                        ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'],

                        ['209', '210', '211', '212']
                    ]
                ]
            }
        }
    },
}
