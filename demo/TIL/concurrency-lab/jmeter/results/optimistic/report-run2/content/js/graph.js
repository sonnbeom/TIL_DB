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
        data: {"result": {"minY": 58.0, "minX": 0.0, "maxY": 5961.0, "series": [{"data": [[0.0, 58.0], [0.1, 58.0], [0.2, 58.0], [0.3, 58.0], [0.4, 58.0], [0.5, 165.0], [0.6, 165.0], [0.7, 165.0], [0.8, 165.0], [0.9, 165.0], [1.0, 285.0], [1.1, 285.0], [1.2, 285.0], [1.3, 285.0], [1.4, 285.0], [1.5, 376.0], [1.6, 376.0], [1.7, 376.0], [1.8, 376.0], [1.9, 376.0], [2.0, 502.0], [2.1, 502.0], [2.2, 502.0], [2.3, 502.0], [2.4, 502.0], [2.5, 616.0], [2.6, 616.0], [2.7, 616.0], [2.8, 616.0], [2.9, 616.0], [3.0, 724.0], [3.1, 724.0], [3.2, 724.0], [3.3, 724.0], [3.4, 724.0], [3.5, 852.0], [3.6, 852.0], [3.7, 852.0], [3.8, 852.0], [3.9, 852.0], [4.0, 988.0], [4.1, 988.0], [4.2, 988.0], [4.3, 988.0], [4.4, 988.0], [4.5, 1096.0], [4.6, 1096.0], [4.7, 1096.0], [4.8, 1096.0], [4.9, 1096.0], [5.0, 1226.0], [5.1, 1226.0], [5.2, 1226.0], [5.3, 1226.0], [5.4, 1226.0], [5.5, 1358.0], [5.6, 1358.0], [5.7, 1358.0], [5.8, 1358.0], [5.9, 1358.0], [6.0, 1478.0], [6.1, 1478.0], [6.2, 1478.0], [6.3, 1478.0], [6.4, 1478.0], [6.5, 1593.0], [6.6, 1593.0], [6.7, 1593.0], [6.8, 1593.0], [6.9, 1593.0], [7.0, 1723.0], [7.1, 1723.0], [7.2, 1723.0], [7.3, 1723.0], [7.4, 1723.0], [7.5, 1823.0], [7.6, 1823.0], [7.7, 1823.0], [7.8, 1823.0], [7.9, 1823.0], [8.0, 2067.0], [8.1, 2067.0], [8.2, 2067.0], [8.3, 2067.0], [8.4, 2067.0], [8.5, 2187.0], [8.6, 2187.0], [8.7, 2187.0], [8.8, 2187.0], [8.9, 2187.0], [9.0, 2327.0], [9.1, 2327.0], [9.2, 2327.0], [9.3, 2327.0], [9.4, 2327.0], [9.5, 2443.0], [9.6, 2443.0], [9.7, 2443.0], [9.8, 2443.0], [9.9, 2443.0], [10.0, 2579.0], [10.1, 2579.0], [10.2, 2579.0], [10.3, 2579.0], [10.4, 2579.0], [10.5, 2697.0], [10.6, 2697.0], [10.7, 2697.0], [10.8, 2697.0], [10.9, 2697.0], [11.0, 2805.0], [11.1, 2805.0], [11.2, 2805.0], [11.3, 2805.0], [11.4, 2805.0], [11.5, 2958.0], [11.6, 2958.0], [11.7, 2958.0], [11.8, 2958.0], [11.9, 2958.0], [12.0, 3086.0], [12.1, 3086.0], [12.2, 3086.0], [12.3, 3086.0], [12.4, 3086.0], [12.5, 3204.0], [12.6, 3204.0], [12.7, 3204.0], [12.8, 3204.0], [12.9, 3204.0], [13.0, 3340.0], [13.1, 3340.0], [13.2, 3340.0], [13.3, 3340.0], [13.4, 3340.0], [13.5, 3489.0], [13.6, 3489.0], [13.7, 3489.0], [13.8, 3489.0], [13.9, 3489.0], [14.0, 3603.0], [14.1, 3603.0], [14.2, 3603.0], [14.3, 3603.0], [14.4, 3603.0], [14.5, 3709.0], [14.6, 3709.0], [14.7, 3709.0], [14.8, 3709.0], [14.9, 3709.0], [15.0, 3847.0], [15.1, 3847.0], [15.2, 3847.0], [15.3, 3847.0], [15.4, 3847.0], [15.5, 3952.0], [15.6, 3952.0], [15.7, 3952.0], [15.8, 3952.0], [15.9, 3952.0], [16.0, 4059.0], [16.1, 4059.0], [16.2, 4059.0], [16.3, 4059.0], [16.4, 4059.0], [16.5, 4182.0], [16.6, 4182.0], [16.7, 4182.0], [16.8, 4182.0], [16.9, 4182.0], [17.0, 4292.0], [17.1, 4292.0], [17.2, 4292.0], [17.3, 4292.0], [17.4, 4292.0], [17.5, 4298.0], [17.6, 4298.0], [17.7, 4298.0], [17.8, 4298.0], [17.9, 4298.0], [18.0, 4415.0], [18.1, 4415.0], [18.2, 4415.0], [18.3, 4415.0], [18.4, 4415.0], [18.5, 4538.0], [18.6, 4538.0], [18.7, 4538.0], [18.8, 4538.0], [18.9, 4538.0], [19.0, 4667.0], [19.1, 4667.0], [19.2, 4667.0], [19.3, 4667.0], [19.4, 4667.0], [19.5, 4790.0], [19.6, 4790.0], [19.7, 4790.0], [19.8, 4790.0], [19.9, 4790.0], [20.0, 4941.0], [20.1, 4941.0], [20.2, 4941.0], [20.3, 4941.0], [20.4, 4941.0], [20.5, 5067.0], [20.6, 5067.0], [20.7, 5067.0], [20.8, 5067.0], [20.9, 5067.0], [21.0, 5098.0], [21.1, 5098.0], [21.2, 5098.0], [21.3, 5098.0], [21.4, 5098.0], [21.5, 5106.0], [21.6, 5106.0], [21.7, 5106.0], [21.8, 5106.0], [21.9, 5106.0], [22.0, 5107.0], [22.1, 5107.0], [22.2, 5107.0], [22.3, 5107.0], [22.4, 5107.0], [22.5, 5113.0], [22.6, 5113.0], [22.7, 5113.0], [22.8, 5113.0], [22.9, 5113.0], [23.0, 5116.0], [23.1, 5116.0], [23.2, 5116.0], [23.3, 5116.0], [23.4, 5116.0], [23.5, 5120.0], [23.6, 5120.0], [23.7, 5120.0], [23.8, 5120.0], [23.9, 5120.0], [24.0, 5126.0], [24.1, 5126.0], [24.2, 5126.0], [24.3, 5126.0], [24.4, 5126.0], [24.5, 5132.0], [24.6, 5132.0], [24.7, 5132.0], [24.8, 5132.0], [24.9, 5132.0], [25.0, 5137.0], [25.1, 5137.0], [25.2, 5137.0], [25.3, 5137.0], [25.4, 5137.0], [25.5, 5141.0], [25.6, 5141.0], [25.7, 5141.0], [25.8, 5141.0], [25.9, 5141.0], [26.0, 5149.0], [26.1, 5149.0], [26.2, 5149.0], [26.3, 5149.0], [26.4, 5149.0], [26.5, 5150.0], [26.6, 5150.0], [26.7, 5150.0], [26.8, 5150.0], [26.9, 5150.0], [27.0, 5156.0], [27.1, 5156.0], [27.2, 5156.0], [27.3, 5156.0], [27.4, 5156.0], [27.5, 5162.0], [27.6, 5162.0], [27.7, 5162.0], [27.8, 5162.0], [27.9, 5162.0], [28.0, 5166.0], [28.1, 5166.0], [28.2, 5166.0], [28.3, 5166.0], [28.4, 5166.0], [28.5, 5181.0], [28.6, 5181.0], [28.7, 5181.0], [28.8, 5181.0], [28.9, 5181.0], [29.0, 5186.0], [29.1, 5186.0], [29.2, 5186.0], [29.3, 5186.0], [29.4, 5186.0], [29.5, 5191.0], [29.6, 5191.0], [29.7, 5191.0], [29.8, 5191.0], [29.9, 5191.0], [30.0, 5196.0], [30.1, 5196.0], [30.2, 5196.0], [30.3, 5196.0], [30.4, 5196.0], [30.5, 5198.0], [30.6, 5198.0], [30.7, 5198.0], [30.8, 5198.0], [30.9, 5198.0], [31.0, 5199.0], [31.1, 5199.0], [31.2, 5199.0], [31.3, 5199.0], [31.4, 5199.0], [31.5, 5207.0], [31.6, 5207.0], [31.7, 5207.0], [31.8, 5207.0], [31.9, 5207.0], [32.0, 5213.0], [32.1, 5213.0], [32.2, 5213.0], [32.3, 5213.0], [32.4, 5213.0], [32.5, 5219.0], [32.6, 5219.0], [32.7, 5219.0], [32.8, 5219.0], [32.9, 5219.0], [33.0, 5223.0], [33.1, 5223.0], [33.2, 5223.0], [33.3, 5223.0], [33.4, 5223.0], [33.5, 5223.0], [33.6, 5223.0], [33.7, 5223.0], [33.8, 5223.0], [33.9, 5223.0], [34.0, 5229.0], [34.1, 5229.0], [34.2, 5229.0], [34.3, 5229.0], [34.4, 5229.0], [34.5, 5230.0], [34.6, 5230.0], [34.7, 5230.0], [34.8, 5230.0], [34.9, 5230.0], [35.0, 5239.0], [35.1, 5239.0], [35.2, 5239.0], [35.3, 5239.0], [35.4, 5239.0], [35.5, 5244.0], [35.6, 5244.0], [35.7, 5244.0], [35.8, 5244.0], [35.9, 5244.0], [36.0, 5253.0], [36.1, 5253.0], [36.2, 5253.0], [36.3, 5253.0], [36.4, 5253.0], [36.5, 5258.0], [36.6, 5258.0], [36.7, 5258.0], [36.8, 5258.0], [36.9, 5258.0], [37.0, 5260.0], [37.1, 5260.0], [37.2, 5260.0], [37.3, 5260.0], [37.4, 5260.0], [37.5, 5269.0], [37.6, 5269.0], [37.7, 5269.0], [37.8, 5269.0], [37.9, 5269.0], [38.0, 5270.0], [38.1, 5270.0], [38.2, 5270.0], [38.3, 5270.0], [38.4, 5270.0], [38.5, 5274.0], [38.6, 5274.0], [38.7, 5274.0], [38.8, 5274.0], [38.9, 5274.0], [39.0, 5279.0], [39.1, 5279.0], [39.2, 5279.0], [39.3, 5279.0], [39.4, 5279.0], [39.5, 5287.0], [39.6, 5287.0], [39.7, 5287.0], [39.8, 5287.0], [39.9, 5287.0], [40.0, 5293.0], [40.1, 5293.0], [40.2, 5293.0], [40.3, 5293.0], [40.4, 5293.0], [40.5, 5294.0], [40.6, 5294.0], [40.7, 5294.0], [40.8, 5294.0], [40.9, 5294.0], [41.0, 5295.0], [41.1, 5295.0], [41.2, 5295.0], [41.3, 5295.0], [41.4, 5295.0], [41.5, 5300.0], [41.6, 5300.0], [41.7, 5300.0], [41.8, 5300.0], [41.9, 5300.0], [42.0, 5303.0], [42.1, 5303.0], [42.2, 5303.0], [42.3, 5303.0], [42.4, 5303.0], [42.5, 5310.0], [42.6, 5310.0], [42.7, 5310.0], [42.8, 5310.0], [42.9, 5310.0], [43.0, 5311.0], [43.1, 5311.0], [43.2, 5311.0], [43.3, 5311.0], [43.4, 5311.0], [43.5, 5317.0], [43.6, 5317.0], [43.7, 5317.0], [43.8, 5317.0], [43.9, 5317.0], [44.0, 5326.0], [44.1, 5326.0], [44.2, 5326.0], [44.3, 5326.0], [44.4, 5326.0], [44.5, 5327.0], [44.6, 5327.0], [44.7, 5327.0], [44.8, 5327.0], [44.9, 5327.0], [45.0, 5327.0], [45.1, 5327.0], [45.2, 5327.0], [45.3, 5327.0], [45.4, 5327.0], [45.5, 5337.0], [45.6, 5337.0], [45.7, 5337.0], [45.8, 5337.0], [45.9, 5337.0], [46.0, 5340.0], [46.1, 5340.0], [46.2, 5340.0], [46.3, 5340.0], [46.4, 5340.0], [46.5, 5342.0], [46.6, 5342.0], [46.7, 5342.0], [46.8, 5342.0], [46.9, 5342.0], [47.0, 5354.0], [47.1, 5354.0], [47.2, 5354.0], [47.3, 5354.0], [47.4, 5354.0], [47.5, 5356.0], [47.6, 5356.0], [47.7, 5356.0], [47.8, 5356.0], [47.9, 5356.0], [48.0, 5362.0], [48.1, 5362.0], [48.2, 5362.0], [48.3, 5362.0], [48.4, 5362.0], [48.5, 5365.0], [48.6, 5365.0], [48.7, 5365.0], [48.8, 5365.0], [48.9, 5365.0], [49.0, 5371.0], [49.1, 5371.0], [49.2, 5371.0], [49.3, 5371.0], [49.4, 5371.0], [49.5, 5377.0], [49.6, 5377.0], [49.7, 5377.0], [49.8, 5377.0], [49.9, 5377.0], [50.0, 5380.0], [50.1, 5380.0], [50.2, 5380.0], [50.3, 5380.0], [50.4, 5380.0], [50.5, 5391.0], [50.6, 5391.0], [50.7, 5391.0], [50.8, 5391.0], [50.9, 5391.0], [51.0, 5397.0], [51.1, 5397.0], [51.2, 5397.0], [51.3, 5397.0], [51.4, 5397.0], [51.5, 5399.0], [51.6, 5399.0], [51.7, 5399.0], [51.8, 5399.0], [51.9, 5399.0], [52.0, 5401.0], [52.1, 5401.0], [52.2, 5401.0], [52.3, 5401.0], [52.4, 5401.0], [52.5, 5405.0], [52.6, 5405.0], [52.7, 5405.0], [52.8, 5405.0], [52.9, 5405.0], [53.0, 5414.0], [53.1, 5414.0], [53.2, 5414.0], [53.3, 5414.0], [53.4, 5414.0], [53.5, 5416.0], [53.6, 5416.0], [53.7, 5416.0], [53.8, 5416.0], [53.9, 5416.0], [54.0, 5420.0], [54.1, 5420.0], [54.2, 5420.0], [54.3, 5420.0], [54.4, 5420.0], [54.5, 5421.0], [54.6, 5421.0], [54.7, 5421.0], [54.8, 5421.0], [54.9, 5421.0], [55.0, 5427.0], [55.1, 5427.0], [55.2, 5427.0], [55.3, 5427.0], [55.4, 5427.0], [55.5, 5428.0], [55.6, 5428.0], [55.7, 5428.0], [55.8, 5428.0], [55.9, 5428.0], [56.0, 5434.0], [56.1, 5434.0], [56.2, 5434.0], [56.3, 5434.0], [56.4, 5434.0], [56.5, 5440.0], [56.6, 5440.0], [56.7, 5440.0], [56.8, 5440.0], [56.9, 5440.0], [57.0, 5445.0], [57.1, 5445.0], [57.2, 5445.0], [57.3, 5445.0], [57.4, 5445.0], [57.5, 5450.0], [57.6, 5450.0], [57.7, 5450.0], [57.8, 5450.0], [57.9, 5450.0], [58.0, 5453.0], [58.1, 5453.0], [58.2, 5453.0], [58.3, 5453.0], [58.4, 5453.0], [58.5, 5454.0], [58.6, 5454.0], [58.7, 5454.0], [58.8, 5454.0], [58.9, 5454.0], [59.0, 5456.0], [59.1, 5456.0], [59.2, 5456.0], [59.3, 5456.0], [59.4, 5456.0], [59.5, 5471.0], [59.6, 5471.0], [59.7, 5471.0], [59.8, 5471.0], [59.9, 5471.0], [60.0, 5477.0], [60.1, 5477.0], [60.2, 5477.0], [60.3, 5477.0], [60.4, 5477.0], [60.5, 5478.0], [60.6, 5478.0], [60.7, 5478.0], [60.8, 5478.0], [60.9, 5478.0], [61.0, 5483.0], [61.1, 5483.0], [61.2, 5483.0], [61.3, 5483.0], [61.4, 5483.0], [61.5, 5488.0], [61.6, 5488.0], [61.7, 5488.0], [61.8, 5488.0], [61.9, 5488.0], [62.0, 5495.0], [62.1, 5495.0], [62.2, 5495.0], [62.3, 5495.0], [62.4, 5495.0], [62.5, 5499.0], [62.6, 5499.0], [62.7, 5499.0], [62.8, 5499.0], [62.9, 5499.0], [63.0, 5506.0], [63.1, 5506.0], [63.2, 5506.0], [63.3, 5506.0], [63.4, 5506.0], [63.5, 5507.0], [63.6, 5507.0], [63.7, 5507.0], [63.8, 5507.0], [63.9, 5507.0], [64.0, 5514.0], [64.1, 5514.0], [64.2, 5514.0], [64.3, 5514.0], [64.4, 5514.0], [64.5, 5517.0], [64.6, 5517.0], [64.7, 5517.0], [64.8, 5517.0], [64.9, 5517.0], [65.0, 5522.0], [65.1, 5522.0], [65.2, 5522.0], [65.3, 5522.0], [65.4, 5522.0], [65.5, 5530.0], [65.6, 5530.0], [65.7, 5530.0], [65.8, 5530.0], [65.9, 5530.0], [66.0, 5531.0], [66.1, 5531.0], [66.2, 5531.0], [66.3, 5531.0], [66.4, 5531.0], [66.5, 5537.0], [66.6, 5537.0], [66.7, 5537.0], [66.8, 5537.0], [66.9, 5537.0], [67.0, 5544.0], [67.1, 5544.0], [67.2, 5544.0], [67.3, 5544.0], [67.4, 5544.0], [67.5, 5547.0], [67.6, 5547.0], [67.7, 5547.0], [67.8, 5547.0], [67.9, 5547.0], [68.0, 5548.0], [68.1, 5548.0], [68.2, 5548.0], [68.3, 5548.0], [68.4, 5548.0], [68.5, 5550.0], [68.6, 5550.0], [68.7, 5550.0], [68.8, 5550.0], [68.9, 5550.0], [69.0, 5557.0], [69.1, 5557.0], [69.2, 5557.0], [69.3, 5557.0], [69.4, 5557.0], [69.5, 5564.0], [69.6, 5564.0], [69.7, 5564.0], [69.8, 5564.0], [69.9, 5564.0], [70.0, 5566.0], [70.1, 5566.0], [70.2, 5566.0], [70.3, 5566.0], [70.4, 5566.0], [70.5, 5570.0], [70.6, 5570.0], [70.7, 5570.0], [70.8, 5570.0], [70.9, 5570.0], [71.0, 5571.0], [71.1, 5571.0], [71.2, 5571.0], [71.3, 5571.0], [71.4, 5571.0], [71.5, 5573.0], [71.6, 5573.0], [71.7, 5573.0], [71.8, 5573.0], [71.9, 5573.0], [72.0, 5579.0], [72.1, 5579.0], [72.2, 5579.0], [72.3, 5579.0], [72.4, 5579.0], [72.5, 5581.0], [72.6, 5581.0], [72.7, 5581.0], [72.8, 5581.0], [72.9, 5581.0], [73.0, 5597.0], [73.1, 5597.0], [73.2, 5597.0], [73.3, 5597.0], [73.4, 5597.0], [73.5, 5600.0], [73.6, 5600.0], [73.7, 5600.0], [73.8, 5600.0], [73.9, 5600.0], [74.0, 5604.0], [74.1, 5604.0], [74.2, 5604.0], [74.3, 5604.0], [74.4, 5604.0], [74.5, 5609.0], [74.6, 5609.0], [74.7, 5609.0], [74.8, 5609.0], [74.9, 5609.0], [75.0, 5610.0], [75.1, 5610.0], [75.2, 5610.0], [75.3, 5610.0], [75.4, 5610.0], [75.5, 5618.0], [75.6, 5618.0], [75.7, 5618.0], [75.8, 5618.0], [75.9, 5618.0], [76.0, 5627.0], [76.1, 5627.0], [76.2, 5627.0], [76.3, 5627.0], [76.4, 5627.0], [76.5, 5632.0], [76.6, 5632.0], [76.7, 5632.0], [76.8, 5632.0], [76.9, 5632.0], [77.0, 5635.0], [77.1, 5635.0], [77.2, 5635.0], [77.3, 5635.0], [77.4, 5635.0], [77.5, 5636.0], [77.6, 5636.0], [77.7, 5636.0], [77.8, 5636.0], [77.9, 5636.0], [78.0, 5647.0], [78.1, 5647.0], [78.2, 5647.0], [78.3, 5647.0], [78.4, 5647.0], [78.5, 5647.0], [78.6, 5647.0], [78.7, 5647.0], [78.8, 5647.0], [78.9, 5647.0], [79.0, 5647.0], [79.1, 5647.0], [79.2, 5647.0], [79.3, 5647.0], [79.4, 5647.0], [79.5, 5656.0], [79.6, 5656.0], [79.7, 5656.0], [79.8, 5656.0], [79.9, 5656.0], [80.0, 5658.0], [80.1, 5658.0], [80.2, 5658.0], [80.3, 5658.0], [80.4, 5658.0], [80.5, 5669.0], [80.6, 5669.0], [80.7, 5669.0], [80.8, 5669.0], [80.9, 5669.0], [81.0, 5673.0], [81.1, 5673.0], [81.2, 5673.0], [81.3, 5673.0], [81.4, 5673.0], [81.5, 5676.0], [81.6, 5676.0], [81.7, 5676.0], [81.8, 5676.0], [81.9, 5676.0], [82.0, 5680.0], [82.1, 5680.0], [82.2, 5680.0], [82.3, 5680.0], [82.4, 5680.0], [82.5, 5683.0], [82.6, 5683.0], [82.7, 5683.0], [82.8, 5683.0], [82.9, 5683.0], [83.0, 5685.0], [83.1, 5685.0], [83.2, 5685.0], [83.3, 5685.0], [83.4, 5685.0], [83.5, 5687.0], [83.6, 5687.0], [83.7, 5687.0], [83.8, 5687.0], [83.9, 5687.0], [84.0, 5697.0], [84.1, 5697.0], [84.2, 5697.0], [84.3, 5697.0], [84.4, 5697.0], [84.5, 5702.0], [84.6, 5702.0], [84.7, 5702.0], [84.8, 5702.0], [84.9, 5702.0], [85.0, 5710.0], [85.1, 5710.0], [85.2, 5710.0], [85.3, 5710.0], [85.4, 5710.0], [85.5, 5713.0], [85.6, 5713.0], [85.7, 5713.0], [85.8, 5713.0], [85.9, 5713.0], [86.0, 5714.0], [86.1, 5714.0], [86.2, 5714.0], [86.3, 5714.0], [86.4, 5714.0], [86.5, 5715.0], [86.6, 5715.0], [86.7, 5715.0], [86.8, 5715.0], [86.9, 5715.0], [87.0, 5723.0], [87.1, 5723.0], [87.2, 5723.0], [87.3, 5723.0], [87.4, 5723.0], [87.5, 5731.0], [87.6, 5731.0], [87.7, 5731.0], [87.8, 5731.0], [87.9, 5731.0], [88.0, 5738.0], [88.1, 5738.0], [88.2, 5738.0], [88.3, 5738.0], [88.4, 5738.0], [88.5, 5740.0], [88.6, 5740.0], [88.7, 5740.0], [88.8, 5740.0], [88.9, 5740.0], [89.0, 5741.0], [89.1, 5741.0], [89.2, 5741.0], [89.3, 5741.0], [89.4, 5741.0], [89.5, 5746.0], [89.6, 5746.0], [89.7, 5746.0], [89.8, 5746.0], [89.9, 5746.0], [90.0, 5755.0], [90.1, 5755.0], [90.2, 5755.0], [90.3, 5755.0], [90.4, 5755.0], [90.5, 5757.0], [90.6, 5757.0], [90.7, 5757.0], [90.8, 5757.0], [90.9, 5757.0], [91.0, 5767.0], [91.1, 5767.0], [91.2, 5767.0], [91.3, 5767.0], [91.4, 5767.0], [91.5, 5770.0], [91.6, 5770.0], [91.7, 5770.0], [91.8, 5770.0], [91.9, 5770.0], [92.0, 5778.0], [92.1, 5778.0], [92.2, 5778.0], [92.3, 5778.0], [92.4, 5778.0], [92.5, 5779.0], [92.6, 5779.0], [92.7, 5779.0], [92.8, 5779.0], [92.9, 5779.0], [93.0, 5781.0], [93.1, 5781.0], [93.2, 5781.0], [93.3, 5781.0], [93.4, 5781.0], [93.5, 5790.0], [93.6, 5790.0], [93.7, 5790.0], [93.8, 5790.0], [93.9, 5790.0], [94.0, 5793.0], [94.1, 5793.0], [94.2, 5793.0], [94.3, 5793.0], [94.4, 5793.0], [94.5, 5796.0], [94.6, 5796.0], [94.7, 5796.0], [94.8, 5796.0], [94.9, 5796.0], [95.0, 5804.0], [95.1, 5804.0], [95.2, 5804.0], [95.3, 5804.0], [95.4, 5804.0], [95.5, 5808.0], [95.6, 5808.0], [95.7, 5808.0], [95.8, 5808.0], [95.9, 5808.0], [96.0, 5814.0], [96.1, 5814.0], [96.2, 5814.0], [96.3, 5814.0], [96.4, 5814.0], [96.5, 5816.0], [96.6, 5816.0], [96.7, 5816.0], [96.8, 5816.0], [96.9, 5816.0], [97.0, 5823.0], [97.1, 5823.0], [97.2, 5823.0], [97.3, 5823.0], [97.4, 5823.0], [97.5, 5827.0], [97.6, 5827.0], [97.7, 5827.0], [97.8, 5827.0], [97.9, 5827.0], [98.0, 5830.0], [98.1, 5830.0], [98.2, 5830.0], [98.3, 5830.0], [98.4, 5830.0], [98.5, 5832.0], [98.6, 5832.0], [98.7, 5832.0], [98.8, 5832.0], [98.9, 5832.0], [99.0, 5834.0], [99.1, 5834.0], [99.2, 5834.0], [99.3, 5834.0], [99.4, 5834.0], [99.5, 5961.0], [99.6, 5961.0], [99.7, 5961.0], [99.8, 5961.0], [99.9, 5961.0]], "isOverall": false, "label": "POST /api/enroll", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 22.0, "series": [{"data": [[0.0, 1.0], [600.0, 1.0], [700.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [2000.0, 1.0], [2100.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3600.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [3900.0, 1.0], [4000.0, 1.0], [4100.0, 1.0], [4200.0, 2.0], [4400.0, 1.0], [4500.0, 1.0], [4600.0, 1.0], [4700.0, 1.0], [4900.0, 1.0], [5000.0, 2.0], [5100.0, 20.0], [5300.0, 21.0], [5200.0, 20.0], [5400.0, 22.0], [5500.0, 21.0], [5600.0, 22.0], [5800.0, 9.0], [5700.0, 21.0], [5900.0, 1.0], [100.0, 1.0], [200.0, 1.0], [300.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "POST /api/enroll", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 198.0, "series": [{"data": [[0.0, 1.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 1.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 198.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 102.60000000000001, "minX": 1.78539768E12, "maxY": 102.60000000000001, "series": [{"data": [[1.78539768E12, 102.60000000000001]], "isOverall": false, "label": "200 Concurrent Students", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78539768E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 165.0, "minX": 1.0, "maxY": 5961.0, "series": [{"data": [[15.0, 5406.857142857143], [23.0, 5293.0], [24.0, 5571.0], [27.0, 5358.0], [37.0, 2812.0], [39.0, 5433.90909090909], [57.0, 5513.0], [56.0, 5356.0], [58.0, 165.0], [59.0, 5499.0], [60.0, 5286.5], [62.0, 5196.0], [65.0, 5551.5], [71.0, 5266.0], [70.0, 5401.0], [72.0, 5337.0], [79.0, 5481.0], [77.0, 5373.571428571428], [82.0, 285.0], [87.0, 5560.461538461538], [86.0, 5604.0], [85.0, 5702.0], [96.0, 5545.0], [103.0, 376.0], [100.0, 5611.4], [107.0, 5755.0], [106.0, 5740.0], [104.0, 5685.0], [110.0, 5657.142857142857], [116.0, 5566.833333333334], [123.0, 502.0], [121.0, 5781.0], [125.0, 5581.0], [124.0, 5665.5], [135.0, 5574.25], [134.0, 5746.0], [133.0, 5530.0], [132.0, 5581.0], [131.0, 5590.0], [130.0, 5647.0], [143.0, 5150.0], [142.0, 5136.5], [141.0, 5523.0], [138.0, 5498.714285714286], [146.0, 3628.3333333333335], [149.0, 5116.0], [147.0, 5166.0], [159.0, 5067.0], [158.0, 5186.0], [157.0, 5300.0], [156.0, 5428.0], [155.0, 5544.0], [154.0, 5680.0], [153.0, 5834.0], [152.0, 5117.6], [167.0, 2453.0], [166.0, 4292.0], [165.0, 4298.0], [164.0, 4415.0], [163.0, 4538.0], [162.0, 4667.0], [161.0, 4790.0], [160.0, 4941.0], [175.0, 3204.0], [174.0, 3340.0], [173.0, 3489.0], [172.0, 3603.0], [171.0, 3709.0], [170.0, 3847.0], [169.0, 3952.0], [168.0, 4059.0], [183.0, 2187.0], [182.0, 2327.0], [181.0, 2443.0], [180.0, 2579.0], [179.0, 2697.0], [178.0, 2805.0], [177.0, 2958.0], [176.0, 3086.0], [191.0, 1096.0], [190.0, 1226.0], [189.0, 1358.0], [188.0, 1478.0], [187.0, 1593.0], [186.0, 1723.0], [185.0, 1823.0], [184.0, 2067.0], [193.0, 852.0], [192.0, 988.0], [1.0, 5961.0]], "isOverall": false, "label": "POST /api/enroll", "isController": false}, {"data": [[102.59000000000005, 4868.08]], "isOverall": false, "label": "POST /api/enroll-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 193.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 708.2, "minX": 1.78539768E12, "maxY": 1868.2, "series": [{"data": [[1.78539768E12, 1868.2]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.78539768E12, 708.2]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78539768E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 4868.08, "minX": 1.78539768E12, "maxY": 4868.08, "series": [{"data": [[1.78539768E12, 4868.08]], "isOverall": false, "label": "POST /api/enroll", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78539768E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 4868.0250000000015, "minX": 1.78539768E12, "maxY": 4868.0250000000015, "series": [{"data": [[1.78539768E12, 4868.0250000000015]], "isOverall": false, "label": "POST /api/enroll", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78539768E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 3.895000000000001, "minX": 1.78539768E12, "maxY": 3.895000000000001, "series": [{"data": [[1.78539768E12, 3.895000000000001]], "isOverall": false, "label": "POST /api/enroll", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78539768E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 58.0, "minX": 1.78539768E12, "maxY": 4298.0, "series": [{"data": [[1.78539768E12, 4298.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.78539768E12, 4298.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.78539768E12, 4298.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.78539768E12, 4298.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.78539768E12, 58.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.78539768E12, 2178.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78539768E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 58.0, "minX": 7.0, "maxY": 5478.0, "series": [{"data": [[9.0, 4298.0], [7.0, 58.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 2385.0], [9.0, 4237.0], [153.0, 5478.0], [7.0, 2958.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 153.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 58.0, "minX": 7.0, "maxY": 5477.0, "series": [{"data": [[9.0, 4298.0], [7.0, 58.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 2385.0], [9.0, 4237.0], [153.0, 5477.0], [7.0, 2958.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 153.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.78539768E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.78539768E12, 3.3333333333333335]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78539768E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.78539768E12, "maxY": 3.3, "series": [{"data": [[1.78539768E12, 0.03333333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.78539768E12, 3.3]], "isOverall": false, "label": "409", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78539768E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.78539768E12, "maxY": 3.3, "series": [{"data": [[1.78539768E12, 0.03333333333333333]], "isOverall": false, "label": "POST /api/enroll-success", "isController": false}, {"data": [[1.78539768E12, 3.3]], "isOverall": false, "label": "POST /api/enroll-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78539768E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.78539768E12, "maxY": 3.3, "series": [{"data": [[1.78539768E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.78539768E12, 3.3]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78539768E12, "title": "Total Transactions Per Second"}},
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

