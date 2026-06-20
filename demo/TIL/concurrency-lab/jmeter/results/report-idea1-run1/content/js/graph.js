/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 478.0, "minX": 0.0, "maxY": 1463.0, "series": [{"data": [[0.0, 478.0], [0.1, 478.0], [0.2, 478.0], [0.3, 478.0], [0.4, 478.0], [0.5, 478.0], [0.6, 510.0], [0.7, 510.0], [0.8, 510.0], [0.9, 510.0], [1.0, 510.0], [1.1, 513.0], [1.2, 513.0], [1.3, 513.0], [1.4, 513.0], [1.5, 513.0], [1.6, 515.0], [1.7, 515.0], [1.8, 515.0], [1.9, 515.0], [2.0, 515.0], [2.1, 517.0], [2.2, 517.0], [2.3, 517.0], [2.4, 517.0], [2.5, 517.0], [2.6, 518.0], [2.7, 518.0], [2.8, 518.0], [2.9, 518.0], [3.0, 518.0], [3.1, 525.0], [3.2, 525.0], [3.3, 525.0], [3.4, 525.0], [3.5, 525.0], [3.6, 538.0], [3.7, 538.0], [3.8, 538.0], [3.9, 538.0], [4.0, 538.0], [4.1, 538.0], [4.2, 538.0], [4.3, 538.0], [4.4, 538.0], [4.5, 538.0], [4.6, 556.0], [4.7, 556.0], [4.8, 556.0], [4.9, 556.0], [5.0, 556.0], [5.1, 557.0], [5.2, 557.0], [5.3, 557.0], [5.4, 557.0], [5.5, 557.0], [5.6, 557.0], [5.7, 557.0], [5.8, 557.0], [5.9, 557.0], [6.0, 557.0], [6.1, 558.0], [6.2, 558.0], [6.3, 558.0], [6.4, 558.0], [6.5, 558.0], [6.6, 562.0], [6.7, 562.0], [6.8, 562.0], [6.9, 562.0], [7.0, 562.0], [7.1, 563.0], [7.2, 563.0], [7.3, 563.0], [7.4, 563.0], [7.5, 563.0], [7.6, 564.0], [7.7, 564.0], [7.8, 564.0], [7.9, 564.0], [8.0, 564.0], [8.1, 579.0], [8.2, 579.0], [8.3, 579.0], [8.4, 579.0], [8.5, 579.0], [8.6, 601.0], [8.7, 601.0], [8.8, 601.0], [8.9, 601.0], [9.0, 601.0], [9.1, 601.0], [9.2, 601.0], [9.3, 601.0], [9.4, 601.0], [9.5, 601.0], [9.6, 605.0], [9.7, 605.0], [9.8, 605.0], [9.9, 605.0], [10.0, 605.0], [10.1, 608.0], [10.2, 608.0], [10.3, 608.0], [10.4, 608.0], [10.5, 608.0], [10.6, 609.0], [10.7, 609.0], [10.8, 609.0], [10.9, 609.0], [11.0, 609.0], [11.1, 627.0], [11.2, 627.0], [11.3, 627.0], [11.4, 627.0], [11.5, 627.0], [11.6, 628.0], [11.7, 628.0], [11.8, 628.0], [11.9, 628.0], [12.0, 628.0], [12.1, 630.0], [12.2, 630.0], [12.3, 630.0], [12.4, 630.0], [12.5, 630.0], [12.6, 633.0], [12.7, 633.0], [12.8, 633.0], [12.9, 633.0], [13.0, 633.0], [13.1, 637.0], [13.2, 637.0], [13.3, 637.0], [13.4, 637.0], [13.5, 637.0], [13.6, 639.0], [13.7, 639.0], [13.8, 639.0], [13.9, 639.0], [14.0, 639.0], [14.1, 639.0], [14.2, 639.0], [14.3, 639.0], [14.4, 639.0], [14.5, 639.0], [14.6, 641.0], [14.7, 641.0], [14.8, 641.0], [14.9, 641.0], [15.0, 641.0], [15.1, 644.0], [15.2, 644.0], [15.3, 644.0], [15.4, 644.0], [15.5, 644.0], [15.6, 648.0], [15.7, 648.0], [15.8, 648.0], [15.9, 648.0], [16.0, 648.0], [16.1, 650.0], [16.2, 650.0], [16.3, 650.0], [16.4, 650.0], [16.5, 650.0], [16.6, 665.0], [16.7, 665.0], [16.8, 665.0], [16.9, 665.0], [17.0, 665.0], [17.1, 667.0], [17.2, 667.0], [17.3, 667.0], [17.4, 667.0], [17.5, 667.0], [17.6, 669.0], [17.7, 669.0], [17.8, 669.0], [17.9, 669.0], [18.0, 669.0], [18.1, 682.0], [18.2, 682.0], [18.3, 682.0], [18.4, 682.0], [18.5, 682.0], [18.6, 685.0], [18.7, 685.0], [18.8, 685.0], [18.9, 685.0], [19.0, 685.0], [19.1, 696.0], [19.2, 696.0], [19.3, 696.0], [19.4, 696.0], [19.5, 696.0], [19.6, 701.0], [19.7, 701.0], [19.8, 701.0], [19.9, 701.0], [20.0, 701.0], [20.1, 701.0], [20.2, 711.0], [20.3, 711.0], [20.4, 711.0], [20.5, 711.0], [20.6, 711.0], [20.7, 715.0], [20.8, 715.0], [20.9, 715.0], [21.0, 715.0], [21.1, 715.0], [21.2, 723.0], [21.3, 723.0], [21.4, 723.0], [21.5, 723.0], [21.6, 723.0], [21.7, 732.0], [21.8, 732.0], [21.9, 732.0], [22.0, 732.0], [22.1, 732.0], [22.2, 738.0], [22.3, 738.0], [22.4, 738.0], [22.5, 738.0], [22.6, 738.0], [22.7, 743.0], [22.8, 743.0], [22.9, 743.0], [23.0, 743.0], [23.1, 743.0], [23.2, 745.0], [23.3, 745.0], [23.4, 745.0], [23.5, 745.0], [23.6, 745.0], [23.7, 747.0], [23.8, 747.0], [23.9, 747.0], [24.0, 747.0], [24.1, 747.0], [24.2, 750.0], [24.3, 750.0], [24.4, 750.0], [24.5, 750.0], [24.6, 750.0], [24.7, 752.0], [24.8, 752.0], [24.9, 752.0], [25.0, 752.0], [25.1, 752.0], [25.2, 756.0], [25.3, 756.0], [25.4, 756.0], [25.5, 756.0], [25.6, 756.0], [25.7, 758.0], [25.8, 758.0], [25.9, 758.0], [26.0, 758.0], [26.1, 758.0], [26.2, 760.0], [26.3, 760.0], [26.4, 760.0], [26.5, 760.0], [26.6, 760.0], [26.7, 762.0], [26.8, 762.0], [26.9, 762.0], [27.0, 762.0], [27.1, 762.0], [27.2, 763.0], [27.3, 763.0], [27.4, 763.0], [27.5, 763.0], [27.6, 763.0], [27.7, 766.0], [27.8, 766.0], [27.9, 766.0], [28.0, 766.0], [28.1, 766.0], [28.2, 768.0], [28.3, 768.0], [28.4, 768.0], [28.5, 768.0], [28.6, 768.0], [28.7, 775.0], [28.8, 775.0], [28.9, 775.0], [29.0, 775.0], [29.1, 775.0], [29.2, 781.0], [29.3, 781.0], [29.4, 781.0], [29.5, 781.0], [29.6, 781.0], [29.7, 800.0], [29.8, 800.0], [29.9, 800.0], [30.0, 800.0], [30.1, 800.0], [30.2, 800.0], [30.3, 800.0], [30.4, 800.0], [30.5, 800.0], [30.6, 800.0], [30.7, 803.0], [30.8, 803.0], [30.9, 803.0], [31.0, 803.0], [31.1, 803.0], [31.2, 813.0], [31.3, 813.0], [31.4, 813.0], [31.5, 813.0], [31.6, 813.0], [31.7, 819.0], [31.8, 819.0], [31.9, 819.0], [32.0, 819.0], [32.1, 819.0], [32.2, 821.0], [32.3, 821.0], [32.4, 821.0], [32.5, 821.0], [32.6, 821.0], [32.7, 829.0], [32.8, 829.0], [32.9, 829.0], [33.0, 829.0], [33.1, 829.0], [33.2, 830.0], [33.3, 830.0], [33.4, 830.0], [33.5, 830.0], [33.6, 830.0], [33.7, 831.0], [33.8, 831.0], [33.9, 831.0], [34.0, 831.0], [34.1, 831.0], [34.2, 850.0], [34.3, 850.0], [34.4, 850.0], [34.5, 850.0], [34.6, 850.0], [34.7, 856.0], [34.8, 856.0], [34.9, 856.0], [35.0, 856.0], [35.1, 856.0], [35.2, 860.0], [35.3, 860.0], [35.4, 860.0], [35.5, 860.0], [35.6, 860.0], [35.7, 865.0], [35.8, 865.0], [35.9, 865.0], [36.0, 865.0], [36.1, 865.0], [36.2, 871.0], [36.3, 871.0], [36.4, 871.0], [36.5, 871.0], [36.6, 871.0], [36.7, 880.0], [36.8, 880.0], [36.9, 880.0], [37.0, 880.0], [37.1, 880.0], [37.2, 881.0], [37.3, 881.0], [37.4, 881.0], [37.5, 881.0], [37.6, 881.0], [37.7, 883.0], [37.8, 883.0], [37.9, 883.0], [38.0, 883.0], [38.1, 883.0], [38.2, 885.0], [38.3, 885.0], [38.4, 885.0], [38.5, 885.0], [38.6, 885.0], [38.7, 892.0], [38.8, 892.0], [38.9, 892.0], [39.0, 892.0], [39.1, 892.0], [39.2, 894.0], [39.3, 894.0], [39.4, 894.0], [39.5, 894.0], [39.6, 894.0], [39.7, 901.0], [39.8, 901.0], [39.9, 901.0], [40.0, 901.0], [40.1, 901.0], [40.2, 901.0], [40.3, 901.0], [40.4, 901.0], [40.5, 901.0], [40.6, 901.0], [40.7, 901.0], [40.8, 905.0], [40.9, 905.0], [41.0, 905.0], [41.1, 905.0], [41.2, 905.0], [41.3, 907.0], [41.4, 907.0], [41.5, 907.0], [41.6, 907.0], [41.7, 907.0], [41.8, 909.0], [41.9, 909.0], [42.0, 909.0], [42.1, 909.0], [42.2, 909.0], [42.3, 917.0], [42.4, 917.0], [42.5, 917.0], [42.6, 917.0], [42.7, 917.0], [42.8, 923.0], [42.9, 923.0], [43.0, 923.0], [43.1, 923.0], [43.2, 923.0], [43.3, 927.0], [43.4, 927.0], [43.5, 927.0], [43.6, 927.0], [43.7, 927.0], [43.8, 929.0], [43.9, 929.0], [44.0, 929.0], [44.1, 929.0], [44.2, 929.0], [44.3, 931.0], [44.4, 931.0], [44.5, 931.0], [44.6, 931.0], [44.7, 931.0], [44.8, 933.0], [44.9, 933.0], [45.0, 933.0], [45.1, 933.0], [45.2, 933.0], [45.3, 945.0], [45.4, 945.0], [45.5, 945.0], [45.6, 945.0], [45.7, 945.0], [45.8, 954.0], [45.9, 954.0], [46.0, 954.0], [46.1, 954.0], [46.2, 954.0], [46.3, 958.0], [46.4, 958.0], [46.5, 958.0], [46.6, 958.0], [46.7, 958.0], [46.8, 966.0], [46.9, 966.0], [47.0, 966.0], [47.1, 966.0], [47.2, 966.0], [47.3, 968.0], [47.4, 968.0], [47.5, 968.0], [47.6, 968.0], [47.7, 968.0], [47.8, 969.0], [47.9, 969.0], [48.0, 969.0], [48.1, 969.0], [48.2, 969.0], [48.3, 979.0], [48.4, 979.0], [48.5, 979.0], [48.6, 979.0], [48.7, 979.0], [48.8, 983.0], [48.9, 983.0], [49.0, 983.0], [49.1, 983.0], [49.2, 983.0], [49.3, 989.0], [49.4, 989.0], [49.5, 989.0], [49.6, 989.0], [49.7, 989.0], [49.8, 990.0], [49.9, 990.0], [50.0, 990.0], [50.1, 990.0], [50.2, 990.0], [50.3, 991.0], [50.4, 991.0], [50.5, 991.0], [50.6, 991.0], [50.7, 991.0], [50.8, 993.0], [50.9, 993.0], [51.0, 993.0], [51.1, 993.0], [51.2, 993.0], [51.3, 1000.0], [51.4, 1000.0], [51.5, 1000.0], [51.6, 1000.0], [51.7, 1000.0], [51.8, 1005.0], [51.9, 1005.0], [52.0, 1005.0], [52.1, 1005.0], [52.2, 1005.0], [52.3, 1009.0], [52.4, 1009.0], [52.5, 1009.0], [52.6, 1009.0], [52.7, 1009.0], [52.8, 1010.0], [52.9, 1010.0], [53.0, 1010.0], [53.1, 1010.0], [53.2, 1010.0], [53.3, 1015.0], [53.4, 1015.0], [53.5, 1015.0], [53.6, 1015.0], [53.7, 1015.0], [53.8, 1019.0], [53.9, 1019.0], [54.0, 1019.0], [54.1, 1019.0], [54.2, 1019.0], [54.3, 1020.0], [54.4, 1020.0], [54.5, 1020.0], [54.6, 1020.0], [54.7, 1020.0], [54.8, 1027.0], [54.9, 1027.0], [55.0, 1027.0], [55.1, 1027.0], [55.2, 1027.0], [55.3, 1032.0], [55.4, 1032.0], [55.5, 1032.0], [55.6, 1032.0], [55.7, 1032.0], [55.8, 1060.0], [55.9, 1060.0], [56.0, 1060.0], [56.1, 1060.0], [56.2, 1060.0], [56.3, 1066.0], [56.4, 1066.0], [56.5, 1066.0], [56.6, 1066.0], [56.7, 1066.0], [56.8, 1073.0], [56.9, 1073.0], [57.0, 1073.0], [57.1, 1073.0], [57.2, 1073.0], [57.3, 1074.0], [57.4, 1074.0], [57.5, 1074.0], [57.6, 1074.0], [57.7, 1074.0], [57.8, 1075.0], [57.9, 1075.0], [58.0, 1075.0], [58.1, 1075.0], [58.2, 1075.0], [58.3, 1077.0], [58.4, 1077.0], [58.5, 1077.0], [58.6, 1077.0], [58.7, 1077.0], [58.8, 1086.0], [58.9, 1086.0], [59.0, 1086.0], [59.1, 1086.0], [59.2, 1086.0], [59.3, 1088.0], [59.4, 1088.0], [59.5, 1088.0], [59.6, 1088.0], [59.7, 1088.0], [59.8, 1089.0], [59.9, 1089.0], [60.0, 1089.0], [60.1, 1089.0], [60.2, 1089.0], [60.3, 1089.0], [60.4, 1102.0], [60.5, 1102.0], [60.6, 1102.0], [60.7, 1102.0], [60.8, 1102.0], [60.9, 1104.0], [61.0, 1104.0], [61.1, 1104.0], [61.2, 1104.0], [61.3, 1104.0], [61.4, 1104.0], [61.5, 1104.0], [61.6, 1104.0], [61.7, 1104.0], [61.8, 1104.0], [61.9, 1117.0], [62.0, 1117.0], [62.1, 1117.0], [62.2, 1117.0], [62.3, 1117.0], [62.4, 1120.0], [62.5, 1120.0], [62.6, 1120.0], [62.7, 1120.0], [62.8, 1120.0], [62.9, 1120.0], [63.0, 1120.0], [63.1, 1120.0], [63.2, 1120.0], [63.3, 1120.0], [63.4, 1127.0], [63.5, 1127.0], [63.6, 1127.0], [63.7, 1127.0], [63.8, 1127.0], [63.9, 1128.0], [64.0, 1128.0], [64.1, 1128.0], [64.2, 1128.0], [64.3, 1128.0], [64.4, 1128.0], [64.5, 1128.0], [64.6, 1128.0], [64.7, 1128.0], [64.8, 1128.0], [64.9, 1130.0], [65.0, 1130.0], [65.1, 1130.0], [65.2, 1130.0], [65.3, 1130.0], [65.4, 1136.0], [65.5, 1136.0], [65.6, 1136.0], [65.7, 1136.0], [65.8, 1136.0], [65.9, 1137.0], [66.0, 1137.0], [66.1, 1137.0], [66.2, 1137.0], [66.3, 1137.0], [66.4, 1137.0], [66.5, 1137.0], [66.6, 1137.0], [66.7, 1137.0], [66.8, 1137.0], [66.9, 1139.0], [67.0, 1139.0], [67.1, 1139.0], [67.2, 1139.0], [67.3, 1139.0], [67.4, 1146.0], [67.5, 1146.0], [67.6, 1146.0], [67.7, 1146.0], [67.8, 1146.0], [67.9, 1164.0], [68.0, 1164.0], [68.1, 1164.0], [68.2, 1164.0], [68.3, 1164.0], [68.4, 1170.0], [68.5, 1170.0], [68.6, 1170.0], [68.7, 1170.0], [68.8, 1170.0], [68.9, 1179.0], [69.0, 1179.0], [69.1, 1179.0], [69.2, 1179.0], [69.3, 1179.0], [69.4, 1182.0], [69.5, 1182.0], [69.6, 1182.0], [69.7, 1182.0], [69.8, 1182.0], [69.9, 1187.0], [70.0, 1187.0], [70.1, 1187.0], [70.2, 1187.0], [70.3, 1187.0], [70.4, 1200.0], [70.5, 1200.0], [70.6, 1200.0], [70.7, 1200.0], [70.8, 1200.0], [70.9, 1203.0], [71.0, 1203.0], [71.1, 1203.0], [71.2, 1203.0], [71.3, 1203.0], [71.4, 1217.0], [71.5, 1217.0], [71.6, 1217.0], [71.7, 1217.0], [71.8, 1217.0], [71.9, 1229.0], [72.0, 1229.0], [72.1, 1229.0], [72.2, 1229.0], [72.3, 1229.0], [72.4, 1232.0], [72.5, 1232.0], [72.6, 1232.0], [72.7, 1232.0], [72.8, 1232.0], [72.9, 1239.0], [73.0, 1239.0], [73.1, 1239.0], [73.2, 1239.0], [73.3, 1239.0], [73.4, 1265.0], [73.5, 1265.0], [73.6, 1265.0], [73.7, 1265.0], [73.8, 1265.0], [73.9, 1285.0], [74.0, 1285.0], [74.1, 1285.0], [74.2, 1285.0], [74.3, 1285.0], [74.4, 1296.0], [74.5, 1296.0], [74.6, 1296.0], [74.7, 1296.0], [74.8, 1296.0], [74.9, 1301.0], [75.0, 1301.0], [75.1, 1301.0], [75.2, 1301.0], [75.3, 1301.0], [75.4, 1306.0], [75.5, 1306.0], [75.6, 1306.0], [75.7, 1306.0], [75.8, 1306.0], [75.9, 1310.0], [76.0, 1310.0], [76.1, 1310.0], [76.2, 1310.0], [76.3, 1310.0], [76.4, 1314.0], [76.5, 1314.0], [76.6, 1314.0], [76.7, 1314.0], [76.8, 1314.0], [76.9, 1329.0], [77.0, 1329.0], [77.1, 1329.0], [77.2, 1329.0], [77.3, 1329.0], [77.4, 1330.0], [77.5, 1330.0], [77.6, 1330.0], [77.7, 1330.0], [77.8, 1330.0], [77.9, 1337.0], [78.0, 1337.0], [78.1, 1337.0], [78.2, 1337.0], [78.3, 1337.0], [78.4, 1337.0], [78.5, 1337.0], [78.6, 1337.0], [78.7, 1337.0], [78.8, 1337.0], [78.9, 1339.0], [79.0, 1339.0], [79.1, 1339.0], [79.2, 1339.0], [79.3, 1339.0], [79.4, 1343.0], [79.5, 1343.0], [79.6, 1343.0], [79.7, 1343.0], [79.8, 1343.0], [79.9, 1345.0], [80.0, 1345.0], [80.1, 1345.0], [80.2, 1345.0], [80.3, 1345.0], [80.4, 1345.0], [80.5, 1365.0], [80.6, 1365.0], [80.7, 1365.0], [80.8, 1365.0], [80.9, 1365.0], [81.0, 1369.0], [81.1, 1369.0], [81.2, 1369.0], [81.3, 1369.0], [81.4, 1369.0], [81.5, 1377.0], [81.6, 1377.0], [81.7, 1377.0], [81.8, 1377.0], [81.9, 1377.0], [82.0, 1382.0], [82.1, 1382.0], [82.2, 1382.0], [82.3, 1382.0], [82.4, 1382.0], [82.5, 1384.0], [82.6, 1384.0], [82.7, 1384.0], [82.8, 1384.0], [82.9, 1384.0], [83.0, 1385.0], [83.1, 1385.0], [83.2, 1385.0], [83.3, 1385.0], [83.4, 1385.0], [83.5, 1386.0], [83.6, 1386.0], [83.7, 1386.0], [83.8, 1386.0], [83.9, 1386.0], [84.0, 1387.0], [84.1, 1387.0], [84.2, 1387.0], [84.3, 1387.0], [84.4, 1387.0], [84.5, 1387.0], [84.6, 1387.0], [84.7, 1387.0], [84.8, 1387.0], [84.9, 1387.0], [85.0, 1398.0], [85.1, 1398.0], [85.2, 1398.0], [85.3, 1398.0], [85.4, 1398.0], [85.5, 1403.0], [85.6, 1403.0], [85.7, 1403.0], [85.8, 1403.0], [85.9, 1403.0], [86.0, 1404.0], [86.1, 1404.0], [86.2, 1404.0], [86.3, 1404.0], [86.4, 1404.0], [86.5, 1405.0], [86.6, 1405.0], [86.7, 1405.0], [86.8, 1405.0], [86.9, 1405.0], [87.0, 1405.0], [87.1, 1405.0], [87.2, 1405.0], [87.3, 1405.0], [87.4, 1405.0], [87.5, 1408.0], [87.6, 1408.0], [87.7, 1408.0], [87.8, 1408.0], [87.9, 1408.0], [88.0, 1411.0], [88.1, 1411.0], [88.2, 1411.0], [88.3, 1411.0], [88.4, 1411.0], [88.5, 1424.0], [88.6, 1424.0], [88.7, 1424.0], [88.8, 1424.0], [88.9, 1424.0], [89.0, 1428.0], [89.1, 1428.0], [89.2, 1428.0], [89.3, 1428.0], [89.4, 1428.0], [89.5, 1428.0], [89.6, 1428.0], [89.7, 1428.0], [89.8, 1428.0], [89.9, 1428.0], [90.0, 1433.0], [90.1, 1433.0], [90.2, 1433.0], [90.3, 1433.0], [90.4, 1433.0], [90.5, 1435.0], [90.6, 1435.0], [90.7, 1435.0], [90.8, 1435.0], [90.9, 1435.0], [91.0, 1437.0], [91.1, 1437.0], [91.2, 1437.0], [91.3, 1437.0], [91.4, 1437.0], [91.5, 1438.0], [91.6, 1438.0], [91.7, 1438.0], [91.8, 1438.0], [91.9, 1438.0], [92.0, 1439.0], [92.1, 1439.0], [92.2, 1439.0], [92.3, 1439.0], [92.4, 1439.0], [92.5, 1444.0], [92.6, 1444.0], [92.7, 1444.0], [92.8, 1444.0], [92.9, 1444.0], [93.0, 1447.0], [93.1, 1447.0], [93.2, 1447.0], [93.3, 1447.0], [93.4, 1447.0], [93.5, 1447.0], [93.6, 1447.0], [93.7, 1447.0], [93.8, 1447.0], [93.9, 1447.0], [94.0, 1448.0], [94.1, 1448.0], [94.2, 1448.0], [94.3, 1448.0], [94.4, 1448.0], [94.5, 1450.0], [94.6, 1450.0], [94.7, 1450.0], [94.8, 1450.0], [94.9, 1450.0], [95.0, 1452.0], [95.1, 1452.0], [95.2, 1452.0], [95.3, 1452.0], [95.4, 1452.0], [95.5, 1455.0], [95.6, 1455.0], [95.7, 1455.0], [95.8, 1455.0], [95.9, 1455.0], [96.0, 1456.0], [96.1, 1456.0], [96.2, 1456.0], [96.3, 1456.0], [96.4, 1456.0], [96.5, 1456.0], [96.6, 1456.0], [96.7, 1456.0], [96.8, 1456.0], [96.9, 1456.0], [97.0, 1457.0], [97.1, 1457.0], [97.2, 1457.0], [97.3, 1457.0], [97.4, 1457.0], [97.5, 1459.0], [97.6, 1459.0], [97.7, 1459.0], [97.8, 1459.0], [97.9, 1459.0], [98.0, 1460.0], [98.1, 1460.0], [98.2, 1460.0], [98.3, 1460.0], [98.4, 1460.0], [98.5, 1461.0], [98.6, 1461.0], [98.7, 1461.0], [98.8, 1461.0], [98.9, 1461.0], [99.0, 1463.0], [99.1, 1463.0], [99.2, 1463.0], [99.3, 1463.0], [99.4, 1463.0], [99.5, 1463.0], [99.6, 1463.0], [99.7, 1463.0], [99.8, 1463.0], [99.9, 1463.0], [100.0, 1463.0]], "isOverall": false, "label": "POST /api/enroll", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 400.0, "maxY": 29.0, "series": [{"data": [[1100.0, 20.0], [600.0, 22.0], [1200.0, 9.0], [1300.0, 21.0], [700.0, 20.0], [1400.0, 29.0], [800.0, 20.0], [400.0, 1.0], [900.0, 23.0], [500.0, 16.0], [1000.0, 18.0]], "isOverall": false, "label": "POST /api/enroll", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 1.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 197.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 2.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 197.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 100.02010050251255, "minX": 1.78530948E12, "maxY": 100.02010050251255, "series": [{"data": [[1.78530948E12, 100.02010050251255]], "isOverall": false, "label": "200 Concurrent Students", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78530948E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 478.0, "minX": 1.0, "maxY": 1463.0, "series": [{"data": [[2.0, 1377.0], [3.0, 1463.0], [4.0, 1384.0], [5.0, 1461.0], [6.0, 1448.0], [7.0, 1460.0], [8.0, 1329.0], [9.0, 1459.0], [10.0, 1457.0], [11.0, 1456.0], [12.0, 1456.0], [13.0, 1343.0], [14.0, 1455.0], [15.0, 1365.0], [16.0, 1382.0], [17.0, 1387.0], [18.0, 1452.0], [19.0, 1450.0], [20.0, 1330.0], [21.0, 1444.0], [22.0, 1310.0], [23.0, 1447.0], [24.0, 1386.0], [25.0, 1447.0], [26.0, 1404.0], [27.0, 1428.0], [28.0, 1345.0], [29.0, 1337.0], [30.0, 1306.0], [31.0, 1405.0], [33.0, 1439.0], [32.0, 1385.0], [35.0, 1405.0], [34.0, 1337.0], [37.0, 1314.0], [36.0, 1438.0], [39.0, 1435.0], [38.0, 1437.0], [41.0, 1433.0], [40.0, 1339.0], [43.0, 1408.0], [42.0, 1387.0], [45.0, 1411.0], [44.0, 1403.0], [47.0, 1127.0], [46.0, 1285.0], [49.0, 1428.0], [48.0, 633.0], [51.0, 756.0], [50.0, 856.0], [53.0, 667.0], [52.0, 800.0], [55.0, 880.0], [54.0, 1424.0], [57.0, 829.0], [56.0, 1296.0], [59.0, 738.0], [58.0, 1229.0], [61.0, 860.0], [60.0, 1104.0], [63.0, 1265.0], [62.0, 1369.0], [67.0, 1239.0], [66.0, 1009.0], [65.0, 637.0], [64.0, 557.0], [70.0, 723.0], [69.0, 1019.0], [68.0, 601.0], [75.0, 639.0], [74.0, 743.0], [73.0, 989.0], [72.0, 667.5], [79.0, 1136.0], [78.0, 669.0], [77.0, 894.0], [76.0, 1182.0], [83.0, 951.5], [81.0, 556.0], [80.0, 929.0], [87.0, 1120.0], [86.0, 1075.0], [85.0, 750.0], [84.0, 1074.0], [91.0, 968.0], [90.0, 821.0], [89.0, 1398.0], [88.0, 1146.0], [95.0, 1232.0], [94.0, 923.0], [93.0, 758.0], [92.0, 557.0], [99.0, 901.0], [98.0, 954.0], [97.0, 1203.0], [96.0, 901.0], [103.0, 885.0], [102.0, 800.0], [101.0, 881.0], [100.0, 892.0], [107.0, 1015.0], [106.0, 1120.0], [105.0, 1128.0], [104.0, 969.0], [111.0, 628.0], [110.0, 564.0], [109.0, 752.0], [108.0, 1088.0], [115.0, 1102.0], [114.0, 803.0], [113.0, 927.0], [112.0, 1032.0], [119.0, 905.0], [118.0, 1086.0], [117.0, 1301.0], [116.0, 701.0], [123.0, 766.0], [122.0, 715.0], [121.0, 909.0], [120.0, 630.0], [127.0, 1130.0], [126.0, 1217.0], [125.0, 993.0], [124.0, 732.0], [135.0, 747.0], [134.0, 768.0], [133.0, 510.0], [132.0, 538.0], [131.0, 525.0], [130.0, 641.0], [129.0, 1060.0], [128.0, 760.0], [143.0, 1128.0], [142.0, 917.0], [141.0, 831.0], [140.0, 1164.0], [139.0, 563.0], [138.0, 1200.0], [137.0, 579.0], [136.0, 933.0], [151.0, 1170.0], [150.0, 538.0], [149.0, 819.0], [148.0, 650.0], [147.0, 648.0], [146.0, 1187.0], [145.0, 1000.0], [144.0, 1179.0], [159.0, 945.0], [158.0, 745.0], [157.0, 665.0], [156.0, 1137.0], [155.0, 515.0], [154.0, 1066.0], [153.0, 830.0], [152.0, 609.0], [167.0, 513.0], [166.0, 1137.0], [165.0, 644.0], [164.0, 562.0], [163.0, 991.0], [162.0, 958.0], [161.0, 762.0], [160.0, 983.0], [175.0, 865.0], [174.0, 605.0], [173.0, 682.0], [172.0, 1005.0], [171.0, 813.0], [170.0, 966.0], [169.0, 478.0], [168.0, 1139.0], [183.0, 990.0], [182.0, 1010.0], [181.0, 608.0], [180.0, 685.0], [179.0, 711.0], [178.0, 850.0], [177.0, 1073.0], [176.0, 1117.0], [191.0, 775.0], [190.0, 1089.0], [189.0, 1104.0], [188.0, 518.0], [187.0, 763.0], [186.0, 1027.0], [185.0, 979.0], [184.0, 931.0], [198.0, 907.0], [197.0, 736.0], [195.0, 781.0], [194.0, 558.0], [193.0, 1077.0], [192.0, 627.0], [200.0, 517.0], [1.0, 1463.0]], "isOverall": false, "label": "POST /api/enroll", "isController": false}, {"data": [[100.02010050251255, 1004.040201005025]], "isOverall": false, "label": "POST /api/enroll-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 704.65, "minX": 1.78530948E12, "maxY": 855.1, "series": [{"data": [[1.78530948E12, 855.1]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.78530948E12, 704.65]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78530948E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 1004.040201005025, "minX": 1.78530948E12, "maxY": 1004.040201005025, "series": [{"data": [[1.78530948E12, 1004.040201005025]], "isOverall": false, "label": "POST /api/enroll", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78530948E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 1003.9748743718595, "minX": 1.78530948E12, "maxY": 1003.9748743718595, "series": [{"data": [[1.78530948E12, 1003.9748743718595]], "isOverall": false, "label": "POST /api/enroll", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78530948E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 2.884422110552764, "minX": 1.78530948E12, "maxY": 2.884422110552764, "series": [{"data": [[1.78530948E12, 2.884422110552764]], "isOverall": false, "label": "POST /api/enroll", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78530948E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 517.0, "minX": 1.78530948E12, "maxY": 907.0, "series": [{"data": [[1.78530948E12, 907.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.78530948E12, 907.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.78530948E12, 907.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.78530948E12, 907.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.78530948E12, 517.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.78530948E12, 712.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78530948E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 712.0, "minX": 199.0, "maxY": 991.0, "series": [{"data": [[199.0, 712.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[199.0, 991.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 199.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 712.0, "minX": 199.0, "maxY": 991.0, "series": [{"data": [[199.0, 712.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[199.0, 991.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 199.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 3.316666666666667, "minX": 1.78530948E12, "maxY": 3.316666666666667, "series": [{"data": [[1.78530948E12, 3.316666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78530948E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.78530948E12, "maxY": 3.283333333333333, "series": [{"data": [[1.78530948E12, 0.03333333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.78530948E12, 3.283333333333333]], "isOverall": false, "label": "409", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78530948E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.78530948E12, "maxY": 3.283333333333333, "series": [{"data": [[1.78530948E12, 0.03333333333333333]], "isOverall": false, "label": "POST /api/enroll-success", "isController": false}, {"data": [[1.78530948E12, 3.283333333333333]], "isOverall": false, "label": "POST /api/enroll-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78530948E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.78530948E12, "maxY": 3.283333333333333, "series": [{"data": [[1.78530948E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.78530948E12, 3.283333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78530948E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

